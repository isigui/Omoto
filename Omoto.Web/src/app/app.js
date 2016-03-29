var omoto = angular.module('Omoto', ['ngRoute', 'LocalStorageModule', 'frapontillo.bootstrap-switch']);

angular.module('Omoto')
    .config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
        $routeProvider
            .when('/home',
            {
                templateUrl: 'templates/header.html'
            })
            .when('/robot',
            {
                templateUrl: 'templates/robot/robotControl.html',
                controller: 'RobotController as RobotController'
            })
            .when('/parameters',
            {
                templateUrl: 'templates/parameters/menu.html',
                controller: 'MainController as MainController'
            })
            .when('/parameters/bluetooth',
            {
                templateUrl: 'templates/parameters/bluetooth.html',
                controller: 'BLEController as BLEController'
            })
            .when('/parameters/nodeserver',
            {
                templateUrl: 'templates/parameters/node_server.html',
                controller: 'NodeServerController as NodeServerController'
            })
        .otherwise({
            redirecto: '/'
        });
        localStorageServiceProvider.setPrefix('ls');
    }]);

omoto.run(function ($rootScope) {
    $rootScope.$on("$includeContentLoaded", function (event, templateName) {
        console.log(templateName + " loaded");
        switch (templateName) {
            case 'templates/header.html':
                {

                }; break;
            case 'templates/nav.html':
                {
                    nav.init();
                }; break;
        }
    });
});


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        // Here, we redirect to the web site.
        console.log("device is ready");
    },
    // Note: This code is taken from the Cor dova CLI template.
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
    }
};


