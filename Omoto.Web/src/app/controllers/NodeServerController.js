angular.module("Omoto").controller("NodeServerController", ['$scope', 'NodeServerService', function ($scope, NodeServerService) {
    'use strict';
    var nodeServerIp = NodeServerService.getNodeServer();
    $scope.localip = { ip: nodeServerIp.localIp };
    $scope.publicip = { ip: nodeServerIp.publicIp };
    $scope.port = nodeServerIp.port;

    $scope.testIp = function (ip, port) {
        ip.testinfo = "checking connection ...";
        NodeServerService.testIp(ip.ip, port)
            .then(function (status) {
                ip.testinfo = status;
            });
    };

    $scope.canSaveIps = function () {
        return $scope.localip.ip != nodeServerIp.localIp
        || $scope.publicip.ip != nodeServerIp.publicIp
        || ($scope.port!=nodeServerIp.port && $scope>0);
    }

    $scope.saveIps = function () {
        NodeServerService.setNodeServer($scope.localip.ip, $scope.publicip.ip, $scope.port);
    }

}]);