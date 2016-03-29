var bluetoothClient = function (socket) {
    var clientSocket = {};
    var BTSP = require('bluetooth-serial-port');
    clientSocket.socket = socket;
    clientSocket.serial = new BTSP.BluetoothSerialPort();
    
    
    clientSocket.serial.on('data', function (buffer) {
        //clientSocket.socket.emit('bluetooth-send-device-result', { result: 1, error: null, result: buffer });
        console.log(buffer.toString('ascii'));
    });
    clientSocket.handleConnection = function () {
        
        clientSocket.socket.on('bluetooth-list', function () {
            console.log('client asked bluetooth list');
            var foundDevices = [];
            clientSocket.serial.on('found', function (address, name) {
                
                console.log('device found ! (' + name + ')... testing if serial port channel exist');
                clientSocket.serial.findSerialPortChannel(address, function (channel) {
                    console.log("Found serial port channel: " + channel + " for " + name + " (" + address + ") !");
                    foundDevices.push({
                        "name": name,
                        "address": address,
                        "channel": channel
                    });
                    clientSocket.socket.emit('bluetooth-list-result', { devices: foundDevices });
                    
                }, function (error) {
                    console.log('error: ' + error);
                });
            });
            clientSocket.serial.on('finished', function () {
                console.log('finish searching ...');
                
            });
            clientSocket.serial.inquire();
        });
        clientSocket.socket.on('bluetooth-connect-device', function (device) {
            
            console.log("client try to connect to " + device.name);
            clientSocket.serial.connect(device.address, device.channel, function () {
                console.log('connected to ' + device.name + ' on channel ' + device.channel);
                clientSocket.socket.emit('bluetooth-connect-device-result', { connected: true, result: 2 });
            }, function (err) {
                console.log('connexion failed to device ' + device.name + " cause: " + err);
                clientSocket.socket.emit('bluetooth-connect-device-result', { connected: false, result: 0 });
            });
            
        });
        clientSocket.socket.on('bluetooth-disconnect-device', function (device) {
            console.log("client try to disconnect from " + device.name);
            //if (clientSocket.serial.isOpen()) {
                console.log("closing bluetooth serial connection on " + device.name);
                clientSocket.serial.close();
                console.log("client disconnected from " + device.name);
                clientSocket.socket.emit('bluetooth-disconnect-device-result', { connected: false, result: 0 });
            //}
            //else {
            //    console.log("bluetooth serial connection not open on " + device.name);
            //    clientSocket.socket.emit('bluetooth-disconnect-device-result', { connected: null, result: 1, error: "bluetooth serial connection not open on " + device.name });
            //}

        });
        clientSocket.serial.on('closed', function (e) {
            console.log("bluetooth serial connection closed");
        });
        clientSocket.socket.on('bluetooth-send-device', function (device,data) {
            //packet: packet.device, packet.data
            var packageDate = new Date(data.lastUpdate);
            console.log("receiving packet: ( " + data.lastUpdate + ")" + packageDate.getHours() + ":" + packageDate.getMinutes() + ":" + packageDate.getSeconds() + ":" + packageDate.getMilliseconds() +"sens:"+data.sens+ " puissance: "+data.puissance+" angle: "+data.angle);
            data.middle = new Date().getTime();
            if (clientSocket.serial.isOpen()) {
                clientSocket.serial.write(new Buffer(data.sens.toString()+data.puissance.toString()+data.angle.toString()), function (err, bytesWritten) {
                    if (err == null) {
                        console.log('writing to device: ' + bytesWritten+" bytes written");
                        clientSocket.socket.emit('bluetooth-send-device-result', { result: 1, error: null, result: { start: data.lastUpdate, middle: data.middle, end: new Date().getTime() } });
                    }
                    else {
                        console.log('error writing to device: ' + device.name);
                        clientSocket.socket.emit('bluetooth-send-device-result', { result: 0, error: err, result: { start: data.lastUpdate, middle: data.middle, end: null } });
                    }
                });
            }
            else {
                console.log("bluetooth serial not available");
                clientSocket.socket.emit('bluetooth-send-device-result', { result: 0, error:null, result:null });
            }
            //var packageDate = new Date(data.lastUpdate);
            //clientSocket.socket.emit('bluetooth-send-device-result', { error: null, result: {start:data.lastUpdate, middle: new Date().getTime(), end:new Date().getTime()} });
        });
        clientSocket.socket.on('disconnect', function () {
            console.log('client ' + socket.id + ' disconnected');
            //clientSocket.socket.emit('disconnected-result');
        })
        clientSocket.socket.emit('connected-result');
    }
    return clientSocket;
};
module.exports = bluetoothClient;



