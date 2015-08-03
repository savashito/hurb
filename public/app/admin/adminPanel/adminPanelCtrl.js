/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 08/July/2015
 * Description: Admin Panel Controller
 */

angular.module('app').controller('adminPanelCtrl', function ($scope,adminZoneTypeModalSvc,zoneSvc,zoneTypeSvc) {

	$scope.zoneSvc = zoneSvc;
	$scope.zoneTypeSvc = zoneTypeSvc;
	// add listener to scope
	zoneSvc.addScope($scope);
	
	$scope.changeVal = function (i) {
		zoneTypeSvc.setSelectedZone(i);
		$scope.selectedZoneType = i;
		$scope.zoneSvc.selectedZone.updateColor($scope.selectedZoneType.getRiskColor());
	};
	
	$scope.addVal = function () {
		$scope.editZoneType({update:false,zoneType:{}});
		// zoneTypeSvc.setSelectedZone({});
		// $scope.selectedZoneType  = {};
	};
	
	$scope.editZoneType = function(o){
		adminZoneTypeModalSvc.show(o);
	};

});