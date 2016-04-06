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
    factory.GetBluetoothDeviceList = function () {
        return SocketHandlerService.emit('bluetooth-list');
    }
    factory.ConnectBluetoothDevice = function (device) {
        return SocketHandlerService.emit('bluetooth-connect-device', device);
    }
    factory.SendBluetoothDevice = function (device, data) {
        return SocketHandlerService.emit('bluetooth-send-device', { 'device': device, 'data': data });
    }
    factory.DisconnectBluetoothDevice = function (device) {
        return SocketHandlerService.emit('bluetooth-disconnect-device', device);
    }
    factory.ConnectGoPro = function () {
        return SocketHandlerService.emit('gopro-poweron');
    }
    factory.DisconnectGoPro = function () {
        return SocketHandlerService.emit('gopro-poweroff');
    }
    factory.GoProStatus = function () {
        return SocketHandlerService.emit('gopro-status');
    }

    SocketHandlerService.nodeServer = factory.getNodeServer();


    return factory;
}]);