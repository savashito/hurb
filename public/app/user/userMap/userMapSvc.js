angular.module('app').factory('userMapSvc',
 function ($q,mapSvc,userRequestDroneSvc,droneManagerSvc,userManagerSvc,waypointManagerSvc) {



	var map = undefined;
	
	var events =  {
		tilesloaded: function (m) {
			if(map===undefined){
				// add click events for map
				var parent = this;
				map = m;
				mapSvc.setMap(map);
				userRequestDroneSvc.requestDronePromise.then(function(res){
					var drone = res.drone;
                	var waypoints = res.waypoints;
                	var user = res.user;
                	console.log(waypoints);
                	waypointManagerSvc.addWaypoints(waypoints);
                	userManagerSvc.newElement(user.location);
                	droneManagerSvc.newElement(drone.location);
				});

				// map.setOptions({ draggableCursor: 'crosshair' });
				google.maps.event.addListener(map, 'click', function(event) {
					var lat = event.latLng.lat(); 
					var lng = event.latLng.lng();
					var location = {
						longitude: lng,
						latitude: lat
					};
					console.log(location);

				});   
				google.maps.event.addListener(map, 'rightclick', function(event) { 
					var lat = event.latLng.lat();
					var lng = event.latLng.lng();

				});
			}
		},
		zoom_changed:function(map,zoom){
		}
	};
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
		center:userRequestDroneSvc.location,
		map:{
			zoom: 18,
			events:events,
			options:options

		}
	};
});