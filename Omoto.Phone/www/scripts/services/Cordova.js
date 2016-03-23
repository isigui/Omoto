(function () {
    'use strict';

    angular.module('CarSolan').factory('cordova', ['$q', '$window', '$timeout', cordova]);

    /**
      * Service that allows access to Cordova when it is ready.
      *
      * @param {!angular.Service} $q
      * @param {!angular.Service} $window
      * @param {!angular.Service} $timeout
      */
    function cordova($q, $window, $timeout) {
        var deferred = $q.defer();
        var resolved = false;

        // Listen to the 'deviceready' event to resolve Cordova.
        // This is when Cordova plugins can be used.
        document.addEventListener('deviceready', function () {
            var params = {
                request: true,
                time: 10000 //in milliseconds, time to scan defaults to 5000ms if not provided
            };
            bluetoothle.initialize(initializeSuccess, initializeError, params);
            function initializeSuccess(obj) {
                if (obj.status == "enabled") {
                    var address = window.localStorage.getItem(addressKey);
                    if (address == null) {
                        console.log("Bluetooth initialized successfully, scanning for devices now.");
                        bluetoothle.startScan(startScanSuccess, startScanError, null);
                    }
                    else {
                        //connectDevice(address);
                    }
                }
                else {
                    console.log("Unexpected initialize status: " + obj.status);
                }
            }

            function initializeError(obj) {
                console.log("Initialize error: " + obj.error + " - " + obj.message);
            }

            resolved = true;
            deferred.resolve($window.cordova);
            console.log('deviceready fired');
        }, false);

        // If the 'deviceready' event didn't fire after a delay, continue.
        $timeout(function () {
            if (!resolved && $window.cordova) {
                deferred.resolve($window.cordova);
            }
        }, 1000);

        return { ready: deferred.promise };
    }
})();