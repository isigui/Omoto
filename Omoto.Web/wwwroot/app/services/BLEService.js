
angular.module("Omoto").factory('BLEService', ['$timeout', '$q', 'NodeServerService', function ($timeout, $q, NodeServerService) {

    'use strict';
    var factory = {};
    factory.getBluetoothDeviceList = function (mode) {
        var deffered = $q.defer();
        if (mode === 0) {

            $timeout(function () {
                var deviceList = [
        {
            "name": "Wade",
            "address": "9c25a457-2e32-4f21-9e5e-6b88da31f751",
            "channel":"1"
        },
        {
            "name": "Rhodes",
            "address": "eae69726-bef1-43a2-97d3-23eec641539f",
            "channel":"2"
        },
        {
            "name": "Reid",
            "address": "db20d1a3-cfcf-4a2c-8974-cb4d839a0ade",
            "channel":"3"
        },
        {
            "name": "Hahn",
            "address": "2365e0dc-104c-43ab-9f18-0c9ebfcfcd76"
        },
        {
            "name": "Mcneil",
            "address": "318e9081-87a1-4fa5-ac2b-c117a79fcf68"
        },
        {
            "name": "Sharp",
            "address": "7abd1308-94f3-4eff-a08b-e6f6c18b8101"
        },
        {
            "name": "Moss",
            "address": "40865696-7df4-4174-83dc-265afdb001b4"
        }
                ];
                factory.onDeviceListSuccess(deviceList);
                deffered.resolve(deviceList);
            }, 2000);
        }
        else {
            NodeServerService.getBluetoothDeviceList(function (devices) {
                factory.onDeviceListSuccess(devices);
                deffered.resolve(devices);
            })

        }
        return deffered.promise;
    }
    factory.onDeviceListSuccess = function (deviceList) {
        deviceList.forEach(function (device) {
            device.canConnect = true;
            device.connectStatus = "Connect";
        });

    }

    factory.Disconnect = function (device, mode) {
        var deffered = $q.defer();
        device.connectStatus = "Disconnecting ...";
        if (mode == 0) {
            $timeout(function () {
                deffered.resolve(true);
            }, 2000);
        }
        else
        {
            NodeServerService.disconnectBluetoothDevice(device,function (res) {
                deffered.resolve(res);
            });
        }
        return deffered.promise;
    }
    factory.Connect = function (device, mode) {
        var deffered = $q.defer();
        device.connectStatus = "Connecting ...";
        if (mode == 0) {
            $timeout(function () {
                deffered.resolve(true);
            }, 2000);
        }
        else {
            NodeServerService.connectBluetoothDevice(device, function (res) {
                deffered.resolve(res);
            });
        }
        return deffered.promise;

    }
    return factory;
}]);


