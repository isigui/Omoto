var goProClient = function (GoPro) {
    /*http://10.5.5.9/param1/PARAM2?t=PASSWORD&p=%OPTION*/
    var q = require('q');
    var gopro = {};
    gopro.On = function () {
        var deferred = q.defer();
        setTimeout(function () { deferred.resolve(true); }, 1000);
        return deferred.promise;
    };
    
    gopro.Status = function () {
        var deferred = q.defer();
        setTimeout(deferred.resolve('status ok'), 1000);
        return deferred.promise;
    };
    gopro.Off = function () {
        var deferred = q.defer();
        setTimeout(deferred.resolve(true), 1000);
        return deferred.promise;
    };
    return gopro;
}
module.exports = goProClient;