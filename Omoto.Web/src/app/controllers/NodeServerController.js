angular.module("Omoto").controller("NodeServerController", ['$scope', 'NodeServerService', function ($scope, NodeServerService) {
    'use strict';
    var nodeServerIp = NodeServerService.getNodeServer();
    $scope.localip = { ip: nodeServerIp.localIp };
    $scope.publicip = { ip: nodeServerIp.publicIp };
    $scope.port = nodeServerIp.port;


    $scope.canSaveIps = function () {
        return $scope.localip.ip != nodeServerIp.localIp
        || $scope.publicip.ip != nodeServerIp.publicIp
        || ($scope.port!=nodeServerIp.port && $scope>0);
    }

    $scope.saveIps = function () {
        NodeServerService.setNodeServer($scope.localip.ip, $scope.publicip.ip, $scope.port);
    }

}]);