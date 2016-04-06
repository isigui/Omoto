var bluetoothClient = function (socket, BTSP, GoProClient) {
    var clientSocket = {};
    clientSocket.socket = socket;
    clientSocket.serial = new BTSP.BluetoothSerialPort();
    clientSocket.serial.on('data', function (buffer) {
        //clientSocket.socket.emit('bluetooth-send-device-result', { result: 1, error: null, result: buffer });
        console.log(buffer.toString('ascii'));
    });
    clientSocket.serial.on('closed', function (e) {
        console.log("bluetooth serial connection closed");
    });
    
    clientSocket.handleConnection = function () {
        
        clientSocket.socket.on('bluetooth-list', function (uuid) {
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
                    clientSocket.emit('bluetooth-list-result', uuid, { devices: foundDevices });
                }, function (error) {
                    console.log('error: ' + error);
                });
            });
            clientSocket.serial.on('finished', function () {
                console.log('finish searching ...');
            });
            clientSocket.serial.inquire();
        });

        clientSocket.socket.on('bluetooth-connect-device', function (device, uuid) {
            
            console.log("client try to connect to " + device.name);
            clientSocket.serial.connect(device.address, device.channel, function () {
                console.log('connected to ' + device.name + ' on channel ' + device.channel);
                clientSocket.emit('bluetooth-connect-device-result', uuid, { connected: true, result: 2 });
            }, function (err) {
                console.log('connexion failed to device ' + device.name + " cause: " + err);
                clientSocket.emit('bluetooth-connect-device-result', uuid, { connected: false, result: 0 });
            });
            
        });

        clientSocket.socket.on('bluetooth-disconnect-device', function (device, uuid) {
            console.log("client try to disconnect from " + device.name);
            console.log("closing bluetooth serial connection on " + device.name);
            clientSocket.serial.close();
            console.log("client disconnected from " + device.name);
            clientSocket.emit('bluetooth-disconnect-device-result', uuid, { connected: false, result: 0 });
        });
        clientSocket.socket.on('bluetooth-send-device', function (data, uuid) {
            //packet: packet.device, packet.data
            var packageDate = new Date(data.data.lastUpdate);
            console.log("receiving packet: ( " + data.data.lastUpdate + ")" + packageDate.getHours() + ":" + packageDate.getMinutes() + ":" + packageDate.getSeconds() + ":" + packageDate.getMilliseconds() + "sens:" + data.data.sens + " Left Wheel Speed: " + data.data.SpeedLeftWheel.toString() + " Right Wheel Speed: " + data.data.SpeedRightWheel.toString());
            data.data.middle = new Date().getTime();
            if (clientSocket.serial.isOpen()) {
                clientSocket.serial.write(new Buffer(data.data.sens.toString() + data.data.SpeedLeftWheel.toString() + data.data.SpeedRightWheel.toString()), function (err, bytesWritten) {
                    if (err == null) {
                        console.log('writing to device: ' + bytesWritten + " bytes written");
                        clientSocket.emit('bluetooth-send-device-result', uuid, { result: 1, error: null, result: { start: data.data.lastUpdate, middle: data.data.middle, end: new Date().getTime() } });
                    }
                    else {
                        console.log('error writing to device: ' + device.name);
                        clientSocket.emit('bluetooth-send-device-result', uuid, { result: 0, error: err, result: { start: data.data.lastUpdate, middle: data.data.middle, end: null } });
                    }
                });
            }
            else {
                console.log("bluetooth serial not available");
                clientSocket.socket.emit('bluetooth-send-device-result', { result: 0, error: null, result: null });
            }
            //var packageDate = new Date(data.lastUpdate);
            //clientSocket.socket.emit('bluetooth-send-device-result', { error: null, result: {start:data.lastUpdate, middle: new Date().getTime(), end:new Date().getTime()} });
        });
        clientSocket.socket.on('disconnect', function (uuid) {
            console.log('client ' + socket.id + ' disconnected');
            clientSocket.emit('disconnect-result', uuid);
        });
        clientSocket.socket.on('gopro-poweron', function (uuid) {
            console.log('client try to powerOn GoPro');
            clientSocket.goproClient.On()
            .then(function (result) {
                console.log('powered On: ' + result);
                clientSocket.emit('gopro-poweron-result', uuid, { connected: true });
            })
            .catch(function (err) {
                console.log(err);
                clientSocket.emit('gopro-poweron-result', uuid, { connected: false });
            });
        });
        clientSocket.socket.on('gopro-poweroff', function (uuid) {
            console.log('client try to powerOff GoPro');
            clientSocket.goproClient.Off().then(function (result) {
                console.log('powered On: ' + result);
                clientSocket.emit('gopro-poweroff-result', uuid, { disconnected: true });
            })
            .catch(function (err) {
                console.log(err);
                clientSocket.emit('gopro-poweroff-result', uuid, { disconnected: false });
            });
        });
        clientSocket.socket.on('gopro-status', function (uuid) {
            console.log('client try to get GoPro status');
            clientSocket.goproClient.Status().then(function (result) {
                clientSocket.emit('gopro-status-result',uuid, { 'ok': true, 'result': result });
            })
            .catch(function (err) {
                console.log(err);
                clientSocket.emit('gopro-status-result', uuid, { 'ok': false, 'result': null });
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



