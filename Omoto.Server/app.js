
var app = require('express')();
var routes = require('./routes.js');
var BTSP = require('bluetooth-serial-port');

var GoProClient = require('./clientGopro.js');
var bluetoothClient = require('./clientSocket.mock.js');

app.use('/', routes);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
var server = require('http').Server(app);
var io = require('socket.io')(server, { origins: '*:*' });

server.listen(5001, '', '', function () { console.log('listening on port 5001') });




io.sockets.on('connection', function (socket) {
    
    console.log('client ' + socket.id + ' connected. transport: ' + socket.conn.transport.name);
    
    bluetoothClient(socket, BTSP, GoProClient).handleConnection();
});

//var goProClient = function () {
//    var GoPro = require('goproh4');
//    var gopro = {};
//    gopro.cam = new GoPro.Camera({
//        ip: '10.5.5.9' /* Gopro ip, should be 10.5.5.9 except in remote mode */,
//        broadcastip: '10.5.5.255' /* Broadcast ip of the gopro network, use to wake up the gopro (WOL protocol), should be 10.5.5.255 */,
//        mac: 'd8:96:85:b1:48:c8' /* Mac address, used to wake up the gopro, should be set if the camera is off before launching the script, can be retrieve on the camera object cam._mac */
//    });
//    gopro.On = function () {
//        return gopro.cam.powerOn();
//    }
//    gopro.Status = function () {
//        gopro.cam.status(GoPro.Status.InternalBatteryLevel).then(function (battery_level) {
//            console.log('[battery level] = ', battery_level);
//        }, function (err) {
//            console.log('arrr error: ' + err);
//        });
//    }
//    return gopro;
//}

//var go = new goProClient();
//var result = go.On();
//console.log("gopro on: " + result);
//var status = go.Status();



