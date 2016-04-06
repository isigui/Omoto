var OmotoModule = angular.module("Omoto");
OmotoModule.factory('NodeServerService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var factory = {};
    factory.GetBluetoothDeviceListCallback;
    factory.ConnectBluetoothDeviceCallback;
    factory.DisconnectBluetoothDeviceCallback;
    factory.SendBluetoothDeviceCallback
    factory.DisconnectCallback;
    var socket;
    factory.getNodeServer = function () {
        return {
            localIp: localStorageService.get('nodeserver_localip'),
            publicIp: localStorageService.get('nodeserver_publicip'),
            port: localStorageService.get('nodeserver_port')
        }
    }
    factory.setNodeServer = function (localIp, publicIp, port) {
        localStorageService.set('nodeserver_localip', localIp);
        localStorageService.set('nodeserver_publicip', publicIp);
        localStorageService.set('nodeserver_port', port);

    }
    factory.testIp = function (ip, port) {
        var self = this;
        self.deferred = $q.defer();
        if (socket == null || socket.connected === false) {

            socket = io.connect('http://' + ip + ':' + port);

            socket.on('connected', function () {
                socket.on('bluetooth-list-result', function (data) {
                    console.log("bluetooth-list-result retrieved");
                    self.deferred.resolve("connection succeed !");

                });
                socket.emit('bluetooth-list');
            });
        }
        else {
            socket.emit('bluetooth-list');
        }
        return self.deferred.promise;
    }
    factory.GetBluetoothDeviceList = function (callback) {
        factory.GetBluetoothDeviceListCallback = callback;
        if (socket == null || socket.connected === false) {
            factory.InitializeSocket().then(
                function () {
                    socket.emit('bluetooth-list');
                });
        }
        else {
            socket.emit('bluetooth-list');
        }

    }
    factory.ConnectBluetoothDevice = function (device, callback) {
        factory.ConnectBluetoothDeviceCallback = callback;
        if (socket == null || socket.connected === false) {
            factory.InitializeSocket().then(
                function () {
                    socket.emit('bluetooth-connect-device', device);
                });
        }
        else {
            socket.emit('bluetooth-connect-device', device);
        }

    }
    factory.SendBluetoothDevice = function (device, data, callback) {
        factory.SendBluetoothDeviceCallback = callback;
        if (socket == null || socket.connected === false) {
            factory.InitializeSocket().then(
                function () {
                    socket.emit('bluetooth-send-device', device, data);
                });
        }
        else {
            socket.emit('bluetooth-send-device', device, data);
        }
    }
    factory.DisconnectBluetoothDevice = function (device, callback) {
        factory.DisconnectBluetoothDeviceCallback = callback;
        if (socket == null || socket.connected === false) {
            factory.InitializeSocket().then(
                function () {
                    socket.emit('bluetooth-disconnect-device', { 'device': device });
                });
        }
        else {
            socket.emit('bluetooth-disconnect-device', { 'device': device });
        }
    }
    factory.InitializeSocket = function () {
        var self = this;
        self.deferred = $q.defer();
        var ip = factory.getNodeServer();
        socket = io.connect('http://' + ip.localIp + ':' + ip.port);
        socket.on('connected-result', function () {
            console.log('connected');
            self.deferred.resolve('connected');
            socket.on('bluetooth-list-result', function (result) {
                factory.GetBluetoothDeviceListCallback(result.devices);
            });
            socket.on('bluetooth-connect-device-result', function (res) {
                factory.ConnectBluetoothDeviceCallback(res);
            });
            socket.on('bluetooth-send-device-result', function (res) {
                factory.SendBluetoothDeviceCallback(res);
            });
            socket.on('bluetooth-disconnect-device-result', function (res) {
                factory.DisconnectBluetoothDeviceCallback(res);
            });
            socket.on('disconnected-result', function (res) {
                //factory.DisconnectCallback(res);
            });

        });

        return self.deferred.promise;

    }


    return factory;
}]);