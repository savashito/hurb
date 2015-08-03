angular.module('app').controller('userCtrl', 
    function ($scope,userRequestDroneSvc,$location) {
        $scope.userRequestDroneSvc = userRequestDroneSvc;
        $scope.requestDrone = function(){
            userRequestDroneSvc.requestDrone($scope.userModel);
            $location.path("/user/map");
        };
        //$scope.userModel = {latitude:32.6105701,longitude:-111.3171201};
        $scope.userModel = {latitude:32.2318706,longitude:-110.9538835};
});