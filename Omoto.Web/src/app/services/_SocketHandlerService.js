var OmotoModule = angular.module("Omoto");
OmotoModule.factory('SocketHandlerService', ['$http', '$q', function ($http, $q) {
    var factory = {};
    factory.socket;
    factory.promises = [];
    factory.nodeServer = {};
    factory.emit = function (message, data) {
        var deferred = $q.defer();
        var uuid = guid();
        factory.promises.push({ 'uuid': uuid, 'promise': deferred });
        if (factory.socket == null || factory.socket.connected === false) {
            factory.InitializeSocket().then(
                function () {
                    factory.socket.emit(message, uuid, data);
                });
        }
        else {
            factory.socket.emit(message, uuid, data);
        }
        return deferred.promise;
    };

    factory.InitializeSocket= function() {
        var deferred = $q.defer();
        
        factory.socket = io.connect('http://' + factory.nodeServer.localIp + ':' + factory.nodeServer.port);
        factory.socket.on('connected-result', function () {
            console.log('connected');
            deferred.resolve('connected');
            factory.socket.on('bluetooth-list-result', factory.HandleResponse);
            factory.socket.on('bluetooth-connect-device-result', factory.HandleResponse);
            factory.socket.on('bluetooth-send-device-result', factory.HandleResponse);
            factory.socket.on('bluetooth-disconnect-device-result', factory.HandleResponse);
            factory.socket.on('gopro-poweron-result', factory.HandleResponse);
            factory.socket.on('gopro-poweroff-result', factory.HandleResponse);
            factory.socket.on('gopro-status-result', factory.HandleResponse);
            factory.socket.on('disconnected-result', factory.HandleResponse);
            deferred.resolve('connected');
        });
        return deferred.promise;
    };
    factory.HandleResponse = function(data){
        var promise = factory.RetrievePromise(data.uuid);
        if (promise) {
            promise.resolve(data.result);
        }
    };
    factory.RetrievePromise=function(uuid) {
        var promiseIndex = factory.promises.map(function (p) { return p.uuid; }).indexOf(uuid);
        if (promiseIndex > -1)
        {
            var thePromise = factory.promises[promiseIndex];
            factory.promises.splice(promiseIndex, 1);
            return thePromise.promise;
        }
    }
    return factory;
}]);