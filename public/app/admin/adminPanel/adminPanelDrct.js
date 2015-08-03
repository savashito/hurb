/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 08/July/2015
 * Description: Admin Panel Directive
 */

angular.module('app').directive('adminPanelDrct', function (){
	return{
		controller: 'adminPanelCtrl',
		templateUrl: '/partials/admin/adminPanel/adminPanel'
		
	}
});