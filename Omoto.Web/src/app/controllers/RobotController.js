angular.module("Omoto").controller("RobotController", ['$scope', 'NodeServerService', 'localStorageService', function ($scope, NodeServerService, localStorageService) {

    $scope.info = "";
    $scope.currentRobotPacket = {};
    $scope.networkStat = { sent: 0, received: 0, transiting: 0, failed: 0, responseDelayms: 0 };
    $scope.device = localStorageService.get('bluetooth_device_0');
    $scope.robotStatus = 0;
    $scope.video = {on:0};
    $scope.enableVideoSwitch = true;
    $scope.videoUrl = "";
    /*robotStatus
    0: connect
    1: connecting
    2: connected
    3: disconnecting
    */
    var transitingPackets = [];

    $scope.$watch('video.on', function (newValue, oldValue) {
        if (newValue != oldValue) {
            var mode = parseInt(newValue);
            newValue === 1 ? connectToGoPro() : disconnectFromGoPro();
        }
    });

    //Connexion Robot
    $scope.canConnectToRobot = function () {
        return $scope.device.adress != null;
    }

    $scope.connectDisconnectRobot = function () {
        if ($scope.robot.isConnectedToRobot) {
            $scope.info = "";
            disconnectFromRobot();
        }
        else {
            $scope.info = "Connecting to robot ...";
            connectToRobot();
        }
    }

    $scope.sendRobotPacket = function (packet) {
        transitingPackets.push(packet);
        $scope.networkStat.sent++;
        $scope.networkStat.transiting = transitingPackets.length;
        NodeServerService.SendBluetoothDevice($scope.device, packet)
            .then(onRobotPacketSuccess, onRobotPacketFailure);
    }

    function connectToRobot() {
        $scope.robotStatus = 1;
        NodeServerService.ConnectBluetoothDevice($scope.device)
            .then(onBluetoothConnectionSuccess, onBluetoothConnectionFailure);
    }
    function disconnectFromRobot() {
        $scope.robotStatus = 3;
        NodeServerService.DisconnectBluetoothDevice($scope.device)
            .then(onBluetoothDisconnectionSuccess, onBluetoothDisconnectionFailure);
    }


    function connectToGoPro() {
        enableVideoSwitch = false;
        NodeServerService.ConnectGoPro()
            .then(onGoProConnectionSuccess, onGoProConnectionFailure);
    }
    function disconnectFromGoPro() {
        enableVideoSwitch = false;
        NodeServerService.disconnectGoPro()
            .then(onGoProDisconnectionSuccess, onGoProDisconnectionFailure);
    }


    //Callbacks
    function onBluetoothConnectionSuccess(res) {
        $scope.robotStatus = 2;
        $scope.robot.isConnectedToRobot = true;
    }
    function onBluetoothConnectionFailure(err) {
        $scope.robotStatus = 0;
        $scope.robot.isConnectedToRobot = false;
    }

    function onBluetoothDisconnectionSuccess(disconnectResult) {
        $scope.robotStatus = 0;
        $scope.robot.isConnectedToRobot = false;
    }
    function onBluetoothDisconnectionFailure(err) {
        $scope.robotStatus = 2;
    }

    function onGoProConnectionSuccess(connectResult) {
        enableVideoSwitch = true;
        $scope.videoUrl = connectResult.result.videoUrl;
    }
    function onGoProConnectionFailure(err) {
        enableVideoSwitch = true;
        $scope.videoOn = 0;
        console.log(err);
        $scope.videoUrl = "";
    }
    function onGoProDisconnectionSuccess(disconnectResult) {
        enableVideoSwitch = true;
        $scope.videoUrl = "";
    }
    function onGoProDisconnectionFailure(err) {
        enableVideoSwitch = true;
        $scope.videoOn = 1;
        console.log(err);
    }

    function onRobotPacketSuccess(sendResult) {
        if (sendResult.error == null) {
            var packetIndex = transitingPackets.map(function (p) { return p.lastUpdate; }).indexOf(sendResult.result.start);
            if (packetIndex > -1) {
                $scope.networkStat.received++;
                $scope.networkStat.responseDelayms = sendResult.result.end - sendResult.result.start;
                $scope.currentRobotPacket = transitingPackets[packetIndex];
                transitingPackets.splice(packetIndex, 1);
                $scope.networkStat.transiting = transitingPackets.length;
            }
        }
    };
    function onRobotPacketFailure(err) {
        $scope.networkStat.failed++;
    };
}]);