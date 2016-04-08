
angular.module("Omoto").controller("BLEController", ['$scope', 'localStorageService', 'BLEService', function ($scope, localStorageService, BLEService) {
    'use strict';
    $scope.devices = {};
    $scope.bluetooth_info = "";
    $scope.mode = 0;//0 - local / 1 - distant
    $scope.isSelected = 0;
    $scope.$watch('isSelected', function (newValue, oldValue) {
        $scope.mode = parseInt(newValue);
        $scope.GetBluetoothDevices($scope.mode);
    });

    $scope.GetBluetoothDevices = function (mode) {
        $scope.devices = [];
        $scope.bluetooth_info = "Searching for bluetooth devices ...";
        BLEService.getBluetoothDeviceList(mode).then(function (deviceFound) {
            $scope.bluetooth_info = "";
            deviceFound.forEach(function (device) {
                $scope.devices.push(device);
                UpdateFavorites(mode);
            });

        });
    }

    $scope.SetFavorite = function(device, mode) {
        if (device.favorite) {
            device.favorite = false;
            localStorageService.set('bluetooth_device_' + mode, {});
        }
        else {
            device.favorite = true;
            localStorageService.set('bluetooth_device_' + mode, device);
        }
        UpdateFavorites(mode);
    }
        
    function UpdateFavorites(mode) {
        var storedBluetoothDevice = localStorageService.get('bluetooth_device_' + mode);
        $scope.devices.forEach(function (device) {
            device.favorite = storedBluetoothDevice && device.address === storedBluetoothDevice.address;
        });
    }

    //$scope.GetBluetoothDevices($scope.mode);
}]);

