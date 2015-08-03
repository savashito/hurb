/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: July/14/2015
 * Description: Zone type  service
 */

angular.module('app').factory('zoneTypeSvc', function ($resource,$q) {
	
	var resource = $resource('/api/zonetype/:id', {id: '@id'}, {
		update: {
			method: 'PUT'
		}
	});

	var extendZoneType = function(zoneType){
		zoneType.getRiskColor = function(){
			if(zoneType.value<1)
			  return '#00FF00';
			if(zoneType.value<2)
			  return '#0000FF';
			return '#FF0000';
		}
	}

	var zoneType = resource.query();
	var zoneTypeSvc = {
		zoneType: zoneType,

		zoneTypeById: $q(function(resolve,reject){
			zoneType.$promise.then(function(zones){
				var zoneTypeByID = {};
				for (var i = zones.length - 1; i >= 0; i--) {
					var zoneType = zones[i];
					extendZoneType(zoneType);
					zoneTypeByID[zoneType._id] = zoneType;

				}
				zoneTypeSvc.zoneTypeById = zoneTypeByID;

				resolve(zoneTypeByID);

			},function(){
				reject("Failed fetching zoneTypeID");
			});
		}),

		selectedZoneType: $q(function(resolve,reject){
			zoneType.$promise.then(function(zones){
				var zone = zones[1];
				zoneTypeSvc.selectedZoneType = zone;
				resolve(zone);
			},function(){
				reject("Failed fetching zoneTypeID");
			});
		}),
		
		setSelectedZone: function(zoneType){
			zoneTypeSvc.selectedZoneType = zoneType;
		},
		setSelectedZoneType:function(id){
			zoneTypeSvc.selectedZoneType = zoneTypeSvc.zoneTypeById[id];
		},
		updateSelectedZone:function(){
			if(zoneTypeSvc.selectedZoneType.$update==undefined){
				// inserting new type zone
				var selectedZoneType = new resource();
				clone(zoneTypeSvc.selectedZoneType,selectedZoneType);
				console.log('saved ',selectedZoneType)
				selectedZoneType.$save();
				zoneTypeSvc.selectedZoneType = selectedZoneType;
				extendZoneType(selectedZoneType);
		  	}
		  	else{
		  		zoneTypeSvc.selectedZoneType.$update(function(){
		  			console.log("success updated")
		  		});
		  		// extend things <3
		  		extendZoneType(zoneTypeSvc.selectedZoneType);
		  	}

		}
	};
	return zoneTypeSvc;
});