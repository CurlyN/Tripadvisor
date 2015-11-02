(ns server.routes
  (:require [compojure.core :as cc]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [server.processing :as sp]
            [ring.util.response :as r]
            [cheshire.core :refer [generate-string]]
            [clojure.java.io :as io]
            [ring.middleware.json :refer [wrap-json-params]]))

(defn json-response [data & [status]]
  {:status (or status 200)
   :headers {"Content-Type" "application/json"
             "Access-Control-Allow-Origin" "*"
             "Access-Control-Allow-Headers" "Origin, X-Requested-With, Content-Type, Accept"}
   :body (generate-string data)})

(cc/defroutes app-routes

  (cc/GET "/" [] 
          {:status 200
           :headers {}
           :body (io/file "resources/public/index.html")})
  
  (cc/GET "/mainroom/history/:start/:end/:step" [start end step]
          (json-response (sp/get-mainroom-history start end step)))

  (cc/GET "/mainroom/occupancy-and-temperature" []
          (json-response (sp/get-mainroom-occupancy-and-temperature)))
  
  (route/resources "/"))

(def app
  (handler/site (wrap-json-params app-routes)))
