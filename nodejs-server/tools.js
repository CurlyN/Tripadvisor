module.exports.addSeconds = function(d, s) {
    d.setTime(d.getTime() + s * 1000);
    return d;
}

function pad(s) {
    s = s + "";
    return s.length == 1 ? "0" + s : s;
}

module.exports.pad = pad;

module.exports.getCurrentUTC = function() {
    var i = new Date();
    return new Date(i.getTime() + (i.getTimezoneOffset() * 60000));
}

module.exports.parseAsUTC = function(s) {
    var i = new Date(s);
    return new Date(i.getTime() + (i.getTimezoneOffset() * 60000));
}


module.exports.formatDate = function(d) {
    return d.getFullYear() + "-" + pad((d.getMonth() + 1)) + "-" + pad(d.getDate());
}

module.exports.formatTime = function(d) {
    return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
}
