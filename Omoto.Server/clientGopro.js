var goProClient = function (GoPro) {
    /*http://10.5.5.9/param1/PARAM2?t=PASSWORD&p=%OPTION*/
    var when = require('when');
    var config = require('./node_modules/gopro_hero_api/config');
    var GoPro = require('./node_modules/gopro_hero_api/libs/gopro');
    var camera = new GoPro("milan123");
    
    var gopro = {};
    gopro.On = function () {
        return camera.power(true);
    
    };
    
    gopro.Status = function () {
        return camera.status();
    };
    gopro.Off = function () {
        return camera.power(false);
    };
    
    //var rp = require('request-promise');
    //var gopro = {};
    //gopro.baseUrl = 'http://10.5.5.9';
    //gopro.streamPort = 8080;
    //gopro.password = 'milan123';
    //gopro.On = function () {
    //    console.log('trying to power gopro on gopro ...');
    //    return rp(gopro.baseUrl + '/bacpac/PW?t=' + gopro.password + '&p=%01');
    
    //}
    //gopro.Off = function () {
    //    console.log('trying to power gopro off gopro ...');
    //    return rp(gopro.baseUrl + '/bacpac/PW?t=' + gopro.password + '&p=%00');
    //}
    //gopro.Status = function () {
    //    console.log('trying to retrieve gopro status ...');
    //    return rp(gopro.baseUrl+'/bacpac/SX?t='+gopro.password);
    //}
    return gopro;
}
module.exports = goProClient;