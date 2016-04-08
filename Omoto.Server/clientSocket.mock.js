var bluetoothClient = function (socket, BTSP) {
    var clientSocket = {};
    //var GoPro = require('goproh4');
    clientSocket.goproClient = require('./clientGopro.js')();
    clientSocket.socket = socket;
    clientSocket.handleConnection = function () {
        
        clientSocket.socket.on('bluetooth-list', function (uuid) {
            console.log('client asked bluetooth list');
            clientSocket.emit('bluetooth-list-result', uuid, {
                devices: 
 [
            
                    {
                        "name": "REMOTE_Sharp",
                        
                        "address": "7abd1308-94f3-4eff-a08b-e6f6c18b8101",
                        "channel": 1
                    },
                    {
                        "name": "REMOTE_Moss",
                        "address": "40865696-7df4-4174-83dc-265afdb001b4",
                        "channel": 1
                    },
                    {
                        "name": "REMOTE_Wade",
                        "address": "9c25a457-2e32-4f21-9e5e-6b88da31f751",
                        "channel": 1
                    },
                    {
                        "name": "REMOTE_Rhodes",
                        "address": "eae69726-bef1-43a2-97d3-23eec641539f",
                        "channel": 1
                    },
                    {
                        "name": "REMOTE_Reid",
                        "address": "db20d1a3-cfcf-4a2c-8974-cb4d839a0ade",
                        "channel": 1
                    },
                    {
                        "name": "REMOTE_Hahn",
                        "address": "2365e0dc-104c-43ab-9f18-0c9ebfcfcd76",
                        "channel": 1
                    },
                    {
                        "name": "REMOTE_Mcneil",
                        "address": "318e9081-87a1-4fa5-ac2b-c117a79fcf68",
                        "channel": 1
                    }
                ]
            });

 
        });
        clientSocket.socket.on('bluetooth-connect-device', function (uuid, device) {
            
            console.log("client try to connect to " + device.name);
            setTimeout(function () {
                clientSocket.emit('bluetooth-connect-device-result', uuid, { connected: true, result: 2 });
            }, 1000);
        });
        clientSocket.socket.on('bluetooth-disconnect-device', function (uuid, device) {
            console.log("client disconnectet from " + device.name);
            clientSocket.emit('bluetooth-disconnect-device-result', uuid, { connected: false, result: 0 });
        });
        clientSocket.socket.on('bluetooth-send-device', function (uuid, data) {
            //packet: packet.device, packet.data
            var packageDate = new Date(data.data.lastUpdate);
            console.log("receiving packet: ( " + data.data.lastUpdate + ")" + packageDate.getHours() + ":" + packageDate.getMinutes() + ":" + packageDate.getSeconds() + ":" + packageDate.getMilliseconds() + "sens:" + data.data.sens + " Left Wheel Speed: " + data.data.SpeedLeftWheel.toString() + " Right Wheel Speed: " + data.data.SpeedRightWheel.toString());
            data.data.middle = new Date().getTime();
            clientSocket.emit('bluetooth-send-device-result', uuid, { result: 1, error: null, result: { start: data.data.lastUpdate, middle: data.data.middle, end: new Date().getTime() } });
        });
        clientSocket.socket.on('disconnect', function (uuid) {
            console.log('client ' + socket.id + ' disconnected');
            clientSocket.emit('disconnected-result', uuid);
        });
        clientSocket.socket.on('gopro-poweron', function (uuid) {
            console.log('client try to powerOn GoPro');
            clientSocket.goproClient.Status().then(function (status) {
                if (status.power == "on") {
                    console.log('gopro already powered on');
                    clientSocket.emit('gopro-poweron-result', uuid, { 'connected': true, video: { 'on': true, 'status': status, 'url': 'http://az29176.vo.msecnd.net/videocontent/BaliTemple_ShutterstockRF_6930133_1080_HD_FR-FR.mp4', 'format': 'video/mp4' } });
                }
                else {
                    console.log('gopro is '+ status.power+' powering gopro on ...');
                    clientSocket.goproClient.On().then(function () {
                        console.log('retrieving status...');
                        setTimeout(function () {
                            clientSocket.goproClient.Status()
                            .then(function (status) {
                                console.log("status retrieved !");

                                clientSocket.emit('gopro-poweron-result', uuid, { 'connected': true, video: { 'on': true, 'status': status, 'url': 'http://az29176.vo.msecnd.net/videocontent/BaliTemple_ShutterstockRF_6930133_1080_HD_FR-FR.mp4', 'format': 'video/mp4' } });
                            })
                            .catch(function (err) { console.log(err); })
                        }, 8000);
                    }).catch(function (err) { console.log(err); });
                }
            }).catch(function (err) { console.log(err); });
        });
        
        clientSocket.socket.on('gopro-poweroff', function (uuid) {
            console.log('client try to powerOff GoPro');
            clientSocket.goproClient.Status().then(function (status) {
                if (status.power == "off") {
                    console.log('gopro already powered off');
                    clientSocket.emit('gopro-poweroff-result', uuid, { 'connected': false, video: { 'on': false, 'status': status, 'url': '', 'format': '' } });
                }
                else {
                    console.log('gopro is '+status.power+' powering gopro off ...');
                    clientSocket.goproClient.Off().then(function () {
                        console.log('retrieving status...');
                        setTimeout(function () {
                            clientSocket.goproClient.Status()
                            .then(function (status) { clientSocket.emit('gopro-poweroff-result', uuid, { 'connected': false, video: { 'on': false, 'status': status, 'url': '', 'format': '' } }); })
                            .catch(function (err) { console.log(err); })
                        }, 8000);
                    }).catch(function (err) { console.log(err); });
                }
            }).catch(function (err) { console.log(err); });
        });

        clientSocket.socket.on('gopro-status', function (uuid) {
            console.log('client try to get GoPro status');
            clientSocket.goproClient.Status().then(function (status) {
                console.log("go pro status: " + status);
                clientSocket.emit('gopro-status-result', uuid, { 'ok': true, 'result': '' });
            });
        });
        clientSocket.socket.emit('connected-result');
    }
    clientSocket.emit = function (message, uuid, result) {
        clientSocket.socket.emit(message, { 'uuid': uuid, 'result': result });
    }
    return clientSocket;
};
module.exports = bluetoothClient;


