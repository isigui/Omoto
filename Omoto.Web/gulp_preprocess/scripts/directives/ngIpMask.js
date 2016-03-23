angular.module('Omoto').directive('ngIpMask', function () {
    function link(scope, element, attrs) {
        //element.on('load', function () {
        $(element[0]).ipAddress();
        $(element[0]).on('input', function (e) {
            console.log('text changed: ' + $(element));
            //scope.localip=this.Text;
        });
        //});
    }
    return {
        link: link
    };
});



//angular.module('docsTimeDirective', [])
//.controller('Controller', ['$scope', function ($scope) {
//    $scope.format = 'M/d/yy h:mm:ss a';
//}])
//.directive('myCurrentTime', ['$interval', 'dateFilter', function ($interval, dateFilter) {

//    function link(scope, element, attrs) {
//        var format,
//            timeoutId;

//        function updateTime() {
//            element.text(dateFilter(new Date(), format));
//        }

//        scope.$watch(attrs.myCurrentTime, function (value) {
//            format = value;
//            updateTime();
//        });

//        element.on('$destroy', function () {
//            $interval.cancel(timeoutId);
//        });

//        // start the UI update process; save the timeoutId for canceling
//        timeoutId = $interval(function () {
//            updateTime(); // update DOM
//        }, 1000);
//    }

//    return {
//        link: link
//    };
//}]);