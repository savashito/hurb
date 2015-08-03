/**
 * @author Luis	Arias
 * Last Edited: 06/10/2015
 * Description: Cotrolloer for send location
 */

angular.module('app').controller('sendLocationCtrl', function ($scope, mvUser, $routeParams){


	$scope.saludo = 'Send';
	$scope.user = mvUser.get({ id: $routeParams.id });
	$scope.sendLocation = function (){
		getLocation();
	};


	var getLocation = function (){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position){
				$scope.user.location.longitude = position.coords.longitude;
				$scope.user.location.latitude = position.coords.latitude;
				$scope.user.$update();
			});
		} else {
			console.log('Error');
		}
	}
});
