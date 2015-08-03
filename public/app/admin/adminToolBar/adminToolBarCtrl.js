/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 08/July/2015
 * Description: Admin Tool Bar Controller
 */

angular.module('app').controller('adminToolBarCtrl', function ($scope,adminToolBarSvc){
	$scope.adminToolBarModel = adminToolBarSvc ;
});