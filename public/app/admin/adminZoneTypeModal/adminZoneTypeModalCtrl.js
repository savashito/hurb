/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: July/08/2015
 * Description: Zone type modal controller
 */
angular.module('app').controller('adminZoneTypeModalCtrl', function ($scope,zoneTypeSvc,adminZoneTypeModalSvc) {
	// adminZoneTypeModalSvc.selectedZoneType = clone(zoneTypeSvc.selectedZoneType);
	// $scope.selectedZoneType = adminZoneTypeModalSvc.selectedZoneType;
	$scope.adminZoneTypeModalSvc = adminZoneTypeModalSvc;
	$scope.hstep = 1;
	$scope.mstep = 15;
	


});

function clone(src,dest) {
	if(dest==undefined)
		dest={};
	dest.name = src.name ;
    dest.temporal = src.temporal ;
    dest.value = src.value ;
    dest.desc = src.desc ;
    dest.schedule =  src.schedule ;
    return dest;
}
