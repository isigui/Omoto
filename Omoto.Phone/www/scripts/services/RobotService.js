var CarSolanModule = angular.module("CarSolan");
CarSolanModule.factory('RobotService', ['$http', '$q', 'localStorageService','NodeServerService', function ($http, $q, localStorageService,NodeServerService) {
    var factory = {};
    factory.device = null;
    factory.IsConnected = false;

    factory.SetControlMode = function (mode) {
        factory.device = localStorageService.get('bluetooth_device_' + mode);
    }
//Connexion
    factory.CanConnect = function () {
        return factory.device != null;
    }

    factory.Connect = function () {
        NodeServerService.ConnectBluetoothDevice(factory.Device,OnConnectCallback);
    }

    factory.OnConnectCallback = function (connectResult) {
        factory.IsConnected = true;
    }


//Deconnexion
    factory.CanDisConnect = function () {
        return factory.device != null && factory.IsConnected;
    }

    factory.Disconnect() = function () {
        NodeServerService.DisconnectBluetoothDevice(factory.Device, OnDisconnectCallback);
    }

    factory.OnDisconnectCallback = function (disconnectResult) {
        factory.IsConnected = false;
    }
    
}]);