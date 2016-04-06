angular.module("Omoto").controller("RobotController", ['$scope', 'NodeServerService', 'localStorageService', function ($scope, NodeServerService, localStorageService) {


    $scope.device = null;
    $scope.deviceStatus = 0;
    $scope.connectStatus = "Connect";
    $scope.sent = 0;
    $scope.received = 0;
    $scope.transitingPackets = [];
    $scope.input = { angle: 0, puissance: 0, sens: 0,lastUpdate: new Date().getTime()};
    $scope.currentRobotPacket = {};
    $scope.$watch(function (scope) {

        return scope.input.angle;
    }, function (oldValue, newValue) {
        var time = new Date().getTime();
        if (time - $scope.input.lastUpdate > 100) {
            $scope.sent += 1;
            var packet = new robotPacket($scope.input.angle, $scope.input.puissance, $scope.input.sens)
            $scope.currentRobotPacket = packet;
            $scope.send(packet);
            $scope.input.lastUpdate = time;
            
        }
        //$scope.$digest();
    },true);
    //Gestion du mode de contrôle (distant via serveur node ou direct bluetooth)
    $scope.isSelected = 1;
    $scope.$watch('isSelected', function (newValue, oldValue) {
        $scope.mode = parseInt(newValue);
        $scope.setControlMode();
    });
    $scope.$watch('deviceStatus', function (newValue, oldValue) {
        switch (newValue) {
            case 0: $scope.connectStatus = "Connect"; break;
            case 1: $scope.connectStatus = "Connecting ..."; break;
            case 2: $scope.connectStatus = "Disconnect"; break;
            default: $scope.connectStatus = "Connect"; break;
        }
    });
    $scope.setControlMode = function () {
        $scope.device = localStorageService.get('bluetooth_device_' + $scope.mode);
    }
    $scope.connectDisconnect = function () {
        if ($scope.robot.isConnectedToRobot) {
            $scope.disconnect();
        }
        else
            $scope.connect();
    }

    //Connexion
    $scope.canConnect = function () {
        return $scope.device.adress != null;
    }

    $scope.connect = function () {
        NodeServerService.ConnectBluetoothDevice($scope.device, $scope.onConnectionCallback);
        $scope.deviceStatus = 1;
    }

    //Deconnexion
    $scope.canDisconnect = function () {
        return $scope.device != null && $scope.robot.isConnectedToRobot;
    }

    $scope.disconnect = function () {
        NodeServerService.DisconnectBluetoothDevice($scope.device, $scope.onConnectionCallback);
    }
    //Change connetion Callback
    $scope.onConnectionCallback = function (connectResult) {
        $scope.robot.isConnectedToRobot = connectResult.connected;
        $scope.deviceStatus = parseInt(connectResult.result);
        $scope.$digest();
    }

    //Send data
    $scope.send = function (data) {
        NodeServerService.SendBluetoothDevice($scope.device, data, $scope.onSendCallback);
        $scope.transitingPackets.push(data);
    }
    $scope.onSendCallback = function (sendResult) {
        if (sendResult.error == null) {
            var packetIndex = $scope.transitingPackets.map(function (p) { return p.lastUpdate; }).indexOf(sendResult.result.start);
            //var packetIndex = $scope.transitingPackets.indexOf(sendResult.start);
            if (packetIndex >-1) {
                $scope.received++;
                $scope.transitingPackets.splice(packetIndex, 1);
            }
        }
    };
}]);