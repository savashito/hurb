/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 08/July/2015
 * Description: Admin Controller
 */

angular.module('app').controller('adminCtrl', function ($scope, zoneTypeSvc) {
	// load zone type
	$scope.zoneType 	= zoneTypeSvc.zoneType;
	$scope.zoneTypeById = zoneTypeSvc.zoneTypeById;

	$scope.selectedZone = 1;
	$scope.selectedZoneType = zoneTypeSvc.selectedZoneType;
	

	$scope.selectedZoneType.then(function(selected){
		$scope.selectedZoneType = selected;
	});

});
