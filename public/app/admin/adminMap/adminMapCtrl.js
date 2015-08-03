/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 05/june/2015
 * Description: controller for apollo map
 */
angular.module('app').controller('adminMapCtrl',function($scope,adminMapSvc){

	adminMapSvc.center.then(function(center){
		$scope.map.center = center;
	});
	
	$scope.map = adminMapSvc.map;
});