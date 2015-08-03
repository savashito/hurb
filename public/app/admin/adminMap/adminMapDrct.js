/**
 * @author Rodrigo Savage
 * Last Edited: 05/june/2015
 * Description: Directive for apollo map
 */
angular.module('app').directive('apolloMap',function(){
  return {
    controller: 'adminMapCtrl',
    
	templateUrl: "/partials/admin/adminMap/adminMap"
  }
});