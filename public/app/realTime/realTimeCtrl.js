/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: 06/16/2015
 * Description: Real time Controller
 */

angular.module('app').controller('realTimeCtrl', function($scope, socket){
    

    socket.on('init', function (data) {
    	 $scope.drones = data.drones;
        /*
        $scope.name = data.name;
        $scope.users = data.users;
	*/

    });
    socket.on('drones', function (data) {
    	$scope.drones = data.drones;
	});
	socket.on('waypoints', function (data) {
    	$scope.waypoints = data.waypoints;
    	$scope.currentWaypoint = data.currentWaypoint;
    	console.log('waypoints',data);
	});
    $scope.hola = "hola";
});