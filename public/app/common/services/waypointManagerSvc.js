angular.module('app').factory('waypointManagerSvc', function (elementManagerSvc,mapSvc) {
	// Private methods
	// Drone manager class
	var WaypointManager = new elementManagerSvc('waypoint','/assets/map/waypoint-icon.png','/assets/map/waypoint-iconSelected.png');
	
	WaypointManager.addWaypoints = function(waypoints){
		for (var i = waypoints.length - 1; i >= 0; i--) {
			this.newElement(waypoints[i]);
		};
		var gList = convertListToGoogleRoute(waypoints);
		displayConnection(gList);
	};
	var convertListToGoogleRoute = function(list){
		var gList = [];
		for (var i = list.length - 1; i >= 0; i--) {
			gList.push(convertObjToGoogleLatLng(list[i]));
		};
		return gList;
	};

	var convertObjToGoogleLatLng = function(obj){
		var loc1 = obj;//obj.location;
		return  new google.maps.LatLng(loc1.latitude, loc1.longitude)
	};

	var displayConnection = function(ruta){
		var lineSymbol = {
	        path: 'M 0,-1 0,1',
	        strokeOpacity: 1,
	        scale: 4
	    };
		var line = new google.maps.Polyline({
		    path: ruta,
		    strokeOpacity: 0,
		    icons: [{
		        icon: lineSymbol,
		        offset: '0',
		        repeat: '20px'
		    }],
		    map: mapSvc.getMap()
	    });
	}
	return WaypointManager;
});