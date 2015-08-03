
angular.module('app').controller('userMapCtrl',
function( $scope,userMapSvc,$location,userRequestDroneSvc){

	userMapSvc.center.then(function(center){
		$scope.map.center = center;
	});
	
	$scope.map = userMapSvc.map;
	// if there is no promise for location return to the page to ger it
/*
	if(userRequestDroneSvc.requestDronePromise == undefined){
		$location.path("/user");
	}
	*/
	//$scope.map.center = requestDroneSvc.location;
});
