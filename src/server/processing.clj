(ns server.processing
  (:require [clj-http.client :as http]
            [clojure.string :as s]
            [clj-time.core :as t]
            [clj-time.coerce :as c]
            [clj-time.format :as f]
            [cheshire.core :refer [parse-string]]))

(def ^:private formatter (f/formatter "yyyy-MM-dd'T'HH:mm:ssZ"))
(def ^:private formatter-sss (f/formatter "yyyy-MM-dd'T'HH:mm:ss.SSSZ"))

(defn- transform-mainroom-data
  "Get rid of extra keys"
  [d]
  (filter #(not (= nil (:id %))) 
          (for [i d]
            (let [text (parse-string (-> i :payload :text) (fn [k] (keyword k)))
                  date (f/parse formatter-sss (:date i))]
              {;; Parsed date
               :d date
               ;; Ticks since epoch
               :tse (c/to-long date)
               ;; Device ID
               :id (:id text)
               ;; Temperature
               :t (:t text)}))))

(defn- fetch-mainroom
  "Recursive fetch of full history for passed date range"
  [url data start end step]
  (let [{:keys [status body]} (http/get url {:headers {:authorization "api-key c2dffcde-5e55-413a-aff4-b5daaf58bd02"}})
        rj (parse-string body (fn [k] (keyword k)))
        next (:next rj)
        messages (transform-mainroom-data (:messages rj))]
    (if next
      (fetch-mainroom
       (str "https://api.opensensors.io" (s/replace next #":topic" "%2Forgs%2Fresourceatwork%2Ftripadvisor%2Fdesksensors")) 
       (into data messages)
       start
       end
       step)
      (into data messages))))


(defn- group-mainroom-data
  "Get grouped data"
  [d s e st]
  (let [start-date (f/parse formatter s)
        end-date (f/parse formatter e)
        step (read-string st)
        ;; Range of intermediary date-time borders
        range (take-while 
               #(<= (c/to-long %) (c/to-long end-date)) 
               (iterate (fn [x] (t/plus x (t/seconds step))) start-date))]
    (for [current-date range]
      (let [current-ticks (c/to-long current-date)
            next-ticks (c/to-long (t/plus current-date (t/seconds step)))]
        {;; Keep date (d) and time (t) detached to make it more easy to use on the client side.
         :d (format "%04d-%02d-%02d" (t/year current-date) (t/month current-date) (t/day current-date))
         :t (format "%02d:%02d:%02d" (t/hour current-date) (t/minute current-date) (t/second current-date))
         ;; Filter by date-time, group by device ID, get count.
         :count (count (group-by :id (filter #(and (<= current-ticks (:tse %)) (<= (:tse %) next-ticks)) d)))}))))


(defn- prepare-mainroom-occupancy-and-temperature
  "Get current occupancy and average temperature"
  [d]
  (let [numbers (for [i d] (read-string (:t i)))]
    {:t (format "%.2f" (if (= 0 (count numbers))
                         0
                         (/ (apply + numbers) (count numbers))))     
     :o (count (group-by :id d))}))


(defn get-mainroom-history 
  "Get occupancy for passed date ranges"
  [start end step]
  (let [url (str "https://api.opensensors.io/v1/messages/topic/%2Forgs%2Fresourceatwork%2Ftripadvisor%2Fdesksensors?start-date=" start "&end-date=" end)]
    (group-mainroom-data 
     (fetch-mainroom url [] start end step)
     start
     end
     step)))


(defn get-mainroom-occupancy-and-temperature
  "Get current room occupancy and average temperature"
  []
  (let [start (t/minus (t/now) (t/seconds 60))
        url (format "%s%04d-%02d-%02dT%02d:%02d:%02dZ" 
                    "https://api.opensensors.io/v1/messages/topic/%2Forgs%2Fresourceatwork%2Ftripadvisor%2Fdesksensors?start-date="
                    (t/year start)
                    (t/month start)
                    (t/day start)
                    (t/hour start)
                    (t/minute start)
                    (t/second start))
        {:keys [status body]} (http/get url {:headers {:authorization "api-key c2dffcde-5e55-413a-aff4-b5daaf58bd02"}})
        rj (parse-string body (fn [k] (keyword k)))]
    (prepare-mainroom-occupancy-and-temperature 
     (transform-mainroom-data (:messages rj)))))
