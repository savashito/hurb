/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: July/12/2015
 * Description: Zone type modal service
 */

angular.module('app').factory('adminZoneTypeModalSvc', function ($modal,zoneTypeSvc,zoneSvc) {
	var modalInstance = undefined;

	return {
		update:undefined,
		show:function(o){
			console.log("modal show",o);
			this.update = o.update;
			this.zoneType = clone(o.zoneType);

			modalInstance = $modal.open({
	      		animation: true,
	    		templateUrl: "/partials/admin/adminZoneTypeModal/adminZoneTypeModal",
	      		controller: 'adminZoneTypeModalCtrl'
			});
			

			return modalInstance;
		},
		zoneType:undefined,
		cancel:function(){
			this.selectedZoneType  = undefined;
			modalInstance.dismiss('cancel');
		},
		updateF:function(){
			console.log('update',this.zoneType);
			// copy to the prev selecet zone type
			clone(this.zoneType,zoneTypeSvc.selectedZoneType);

			// console.log('zone',this.selectedZoneType);
			// console.log('name',zoneTypeSvc.selectedZoneType);
			// zoneTypeSvc.selectedZoneType = this.selectedZoneType;
			zoneTypeSvc.updateSelectedZone();
			// update color
			zoneSvc.updateSelectedZoneColor();
			modalInstance.dismiss();
		},
		add: function (){
			console.log('Salva la cosa');
			zoneTypeSvc.selectedZoneType = this.zoneType;
			zoneTypeSvc.updateSelectedZone();
			zoneSvc.updateSelectedZoneColor();
			modalInstance.dismiss();
		}
	};
});
