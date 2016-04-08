var omoto = angular.module('Omoto', ['ngRoute',
            'LocalStorageModule',
            'frapontillo.bootstrap-switch',
            'ngSanitize',
            'com.2fdevs.videogular',
			'com.2fdevs.videogular.plugins.controls',
			'com.2fdevs.videogular.plugins.overlayplay',
            'com.2fdevs.videogular.plugins.poster',
            'com.2fdevs.videogular.plugins.hls']);

angular.module('Omoto')
    .config(['$routeProvider', 'localStorageServiceProvider', '$sceDelegateProvider', '$httpProvider', function ($routeProvider, localStorageServiceProvider, $sceDelegateProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        $httpProvider.defaults.headers.common["toto"] = "titi";
        $httpProvider.defaults.withCredentials = true;
        $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        'http://10.5.5.9:8080/live/*',
        'http://127.0.0.1:5001/**',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        //'http://srv*.assets.example.com/**',
        'http://az29176.vo.msecnd.net/**'
        ]);
        $routeProvider
            .when('/home',
            {
                templateUrl: 'templates/header.html'
            })
            .when('/robot',
            {
                templateUrl: 'templates/robot/robotControl.html'
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


