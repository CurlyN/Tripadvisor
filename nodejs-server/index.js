var request = require('request');
var express = require("express");
var processor = require("./processing");
var tools = require("./tools");

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/mainroom/history/start=:start&end=:end&step=:step', function(req, res) {
    var start = req.params.start;
    var end = req.params.end;
    var step= req.params.step;

    request({url: "https://opensensors.io/api/1.0/users/gizmo/messages-by-topic?topic=/orgs/resourceatwork/tripadvisor/desksensors&start-date=" + start + "&end-date=" + end,
             headers: {"Authorization": "api-key c2dffcde-5e55-413a-aff4-b5daaf58bd02"}}, function (error, response, body) {
        res.json(processor.getGroupedData(start, end, step, JSON.parse(body)));
    });
});

app.get('/mainroom/occupancy-and-temperature', function(req, res) {
    var utc2 = tools.getCurrentUTC();
    var temp = new Date(utc2);
    var utc1 = tools.addSeconds(temp, -60);
    var parameters = "&start-date=" + utc1.getFullYear() + "-" + 
                                      tools.pad(utc1.getMonth() + 1) + "-" + 
                                      tools.pad(utc1.getDate()) + "T" + 
                                      tools.pad(utc1.getHours()) + ":" + 
                                      tools.pad(utc1.getMinutes()) + ":" + 
                                      tools.pad(utc1.getSeconds()) + "Z" +
                     "&end-date=" +   utc2.getFullYear() + "-" + 
                                      tools.pad(utc2.getMonth() + 1) + "-" + 
                                      tools.pad(utc2.getDate()) + "T" + 
                                      tools.pad(utc2.getHours()) + ":" + 
                                      tools.pad(utc2.getMinutes()) + ":" + 
                                      tools.pad(utc2.getSeconds()) + "Z";

    request({url: "https://opensensors.io/api/1.0/users/gizmo/messages-by-topic?topic=/orgs/resourceatwork/tripadvisor/desksensors" + parameters,
             headers: {"Authorization": "api-key c2dffcde-5e55-413a-aff4-b5daaf58bd02"}}, function (error, response, body) {
        res.json(processor.getOccupancyAndTemperature(JSON.parse(body)));
    });
});

console.log("Node.JS server started at localhost:8888...");
app.listen(8888, function () {});