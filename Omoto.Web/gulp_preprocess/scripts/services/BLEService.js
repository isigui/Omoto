/// <reference path="../../../bower_components/angular-local-storage/dist/angular-local-storage.js" />
var OmotoModule = angular.module("Omoto");
OmotoModule.factory('BLEService', ['NodeServerService', function (NodeServerService) {
    'use strict';
    var factory = {};
    factory.deviceFoundCallback;
    factory.infoCallback;
    factory.GetBluetoothDeviceList = function (mode, deviceFoundCallback, infoCallback) {
        factory.deviceFoundCallback = deviceFoundCallback;
        factory.infoCallback = infoCallback;
        if (mode === 0)
            bluetoothSerial.list(factory.onDeviceListSuccess, factory.onDeviceListError);
        else {
            NodeServerService.GetBluetoothDeviceList()
                .then(function (result) {
                    factory.onDeviceListSuccess(result.devices);
                })
                .catch(function (e) {
                    factory.onDeviceListError(e);
                });
        }
    }
    factory.onDeviceListSuccess = function (deviceList) {
        deviceList.forEach(function (device) {
            //deviceFoundCallback({ 'name': device.name, 'address': device.address });
            factory.deviceFoundCallback({ 'name': device.name, 'address': device.address, channel:device.channel, 'canConnect': true });
        });

    }
    factory.onDeviceListError = function (error) {
        infoCallback(error);
    }
    factory.startScan = function (deviceFoundCallback, infoCallback) {
        infoCallback("Searching for ble devices ...");
        bluetoothle.retrieveConnected(function (deviceList) {
            deviceList.forEach(function (device) {
                deviceFoundCallback({ 'name': device.name, 'address': device.address });

            });
        }, function (error) {
            infoCallback(error);
        }, scanParams);

    }
    factory.Connect = function (device, connectCallback) {
    }
    return factory;
}]);


