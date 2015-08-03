angular.module('app').factory('adminToolBarSvc', function (zoneSvc) {
	return {
		modelChange:function(value){
			if(this.zone && this.zoneDisplay){
				this.zone = false;
				this.zoneDisplay = false;
				this[value] = true;
				if(value == 'zone'){
					zoneSvc.selectedZone.setSelected(false);
				}
			}
			//console.log('miau ',value,this.zone,this.zoneDisplay);
		},
		drone:false,abm:false,zone:true,zoneDisplay:false};
});