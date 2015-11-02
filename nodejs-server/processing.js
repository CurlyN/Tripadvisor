var linq = require("linq");
var tools = require("./tools");


function getFilteredData(d) {

    var payload = linq.from(d.messages).select(function(i) {

        var p = null;

        try {
            p = JSON.parse(i.payload.text);
        } catch(e) {
        }

        return p == null ? null : { dt: i.date, t: p.t, id: p.id };
    }).where(function(i) { return i != null }).toArray();

    return payload; 
}


module.exports.getGroupedData = function(l, r, s, d) {

    var left = tools.parseAsUTC(l);
    var right = tools.parseAsUTC(r);
    var filtered = getFilteredData(d);
    var result = [];

    while (left <= right) {
        var savedLeft = new Date(left);
        var border = tools.addSeconds(left, s);
        var count = linq.from(filtered).where(function(item){ 
            var date = tools.parseAsUTC(item.dt);
            return savedLeft < date && date < border; 
        }).groupBy("$.id", null, function(k, g) { return { id: k }; }).count();
        result.push({ d: tools.formatDate(savedLeft), t: tools.formatTime(savedLeft), count: count });
    }
    
    return result;
}

module.exports.getOccupancyAndTemperature = function(d) {

    var f = getFilteredData(d);
    var sum = 0.0;
    var vc = 0;

    for (var i = 0; i < f.length; i++) {
        var v = parseFloat(f[i].t);

        if (!isNaN(v)) {      
            sum = sum + v;
            vc++;
        }
    }

    if (f.length == 0) {
        return {
            t: 0,
            0: 0
        };
    }

    return {
        t: (sum / vc).toFixed(2),
        o: linq.from(d).groupBy("$.id", null, function(k, g) { return { id: k }; }).count()
    };
}