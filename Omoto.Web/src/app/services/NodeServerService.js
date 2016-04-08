var OmotoModule = angular.module("Omoto");
OmotoModule.factory('NodeServerService', ['SocketHandlerService', 'localStorageService', function (SocketHandlerService, localStorageService) {
    var socket;
    var factory = {};

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
    factory.getBluetoothDeviceList = function () {
        return SocketHandlerService.emit('bluetooth-list');
    }
    factory.connectBluetoothDevice = function (device) {
        return SocketHandlerService.emit('bluetooth-connect-device', device);
    }
    factory.sendBluetoothDevice = function (device, data) {
        return SocketHandlerService.emit('bluetooth-send-device', { 'device': device, 'data': data });
    }
    factory.disconnectBluetoothDevice = function (device) {
        return SocketHandlerService.emit('bluetooth-disconnect-device', device);
    }
    factory.connectGoPro = function () {
        return SocketHandlerService.emit('gopro-poweron');
    }
    factory.disconnectGoPro = function () {
        return SocketHandlerService.emit('gopro-poweroff');
    }
    factory.goProStatus = function () {
        return SocketHandlerService.emit('gopro-status');
    }

    SocketHandlerService.nodeServer = factory.getNodeServer();


    return factory;
}]);