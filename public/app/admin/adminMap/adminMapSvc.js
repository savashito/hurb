/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 11/july/2015
 * Description: service for apollo map
 */




angular.module('app').factory('adminMapSvc', function ($q,zoneSvc,adminToolBarSvc,mapSvc) {
	var center = $q(function(resolve,reject){
		// locate the center in the middle of t he majority of the zones
		zoneSvc.zone.$promise.then(function(zones){
			if(zones.lenght>0){
				var location = zones[0].vertices[0];
				resolve(location);
			}else{
				// find location
				//var location = {longitude:-110.944854,latitude:32.2365591};
				var location = {latitude:32.2318706,longitude:-110.9538835};
				resolve(location);

				// load zones to map
				zoneSvc.addZones();

			}


		},function(){
			reject("Failed fetching zones");
		});
	});

	var map = undefined;
	




	var events =  {
		tilesloaded: function (m) {
			if(map===undefined){
				// add click events for map
				var parent = this;
				map = m;
				mapSvc.setMap(map);
				map.setOptions({ draggableCursor: 'crosshair' });
				google.maps.event.addListener(map, 'click', function(event) {
					var lat = event.latLng.lat(); 
					var lng = event.latLng.lng();
					var location = {
						longitude: lng,
						latitude: lat
					};
					if(adminToolBarSvc.zone){
						zoneSvc.addVertex(location);
					}else{
						if(zoneSvc.selectedZone){
							zoneSvc.selectedZone.setSelected(false);
							zoneSvc.applyScope();
						}
					}
				});   
				google.maps.event.addListener(map, 'rightclick', function(event) { 
					var lat = event.latLng.lat();
					var lng = event.latLng.lng();

				});
			}
		},

		
		zoom_changed:function(map,zoom){
			// AdminMapUtil.zoom_changed(map);
		}
	};
	var getMap = function(){
		return map;
	}
	var options = { 	
		scrollwheel: true, 
		panControl: false,
		zoomControl: false,
		mapTypeControl: true,
		scaleControl: true,
		streetViewControl: false,
		overviewMapControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [{
			// remove buses
			featureType: "transit.station.bus",
			stylers: [{ visibility: "off" }]
		},
		{	// remove business
			featureType: "poi",
			stylers: [{ visibility: "off" }]
		}]
	};
	return {
		center:center,
		map:{
			zoom: 18,
			events:events,
			options:options

		},
		getMap:getMap

	};
});