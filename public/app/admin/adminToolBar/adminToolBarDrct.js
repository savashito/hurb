/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 08/July/2015
 * Description: Admin Tool Bar Directive
 */


angular.module('app').directive('adminToolBarDrct',function(){
	return {
		controller: 'adminToolBarCtrl',
		templateUrl: "/partials/admin/adminToolBar/adminToolBar"
	}
});