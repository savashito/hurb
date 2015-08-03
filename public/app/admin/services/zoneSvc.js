angular.module('app').factory('zoneSvc', function ($resource,$q,zoneTypeSvc,mapSvc) {
	
	var resource = $resource('/api/zone/:id', {id: '@id'}, {
		update: {
			method: 'PUT'
		}
	});

	var listScope;
	var zone = resource.query();
	var currentZone = undefined;
	var nCliks;
	var currentPath = undefined;

/*
	var zoneById = $q(function(resolve,reject){
		zone.$promise.then(function(zones){
			var zoneByID = {};
			for (var i = zones.length - 1; i >= 0; i--) {
				var zone = zones[i];
				extendZone(zone);
				addEvents(zone);
				zoneByID[zone._id] = zone;

			}
			resolve(zoneByID);
		},function(){
			reject("Failed fetching zoneID");
		});
	});
*/

	var addVertex = function(location){
		if(currentZone===undefined){
			nCliks = 1;
			currentPath = [new google.maps.LatLng(location.latitude, location.longitude)];
			var color =  zoneTypeSvc.selectedZoneType.getRiskColor();

			currentZone = new google.maps.Polygon({
			    paths: currentPath,
			    strokeColor: color,
			    strokeOpacity: 0.8,
			    strokeWeight: 3,
			    fillColor: color,
			    fillOpacity: 0.35,
			    editable: true,
			    map: mapSvc.getMap()
			});
		}else if(currentPath!==undefined){
			nCliks++;
			// add to path
			currentPath.push(new google.maps.LatLng(location.latitude, location.longitude));
			currentZone.setPath(currentPath);
			if(nCliks>2){
				
				// extend current zone
				var zone = {googlePolygon:currentZone};
				extendZone(zone);
				addEvents(zone);
				// Show right panel
				zoneSvc.selectedZone = zone;
				listScope.$apply();
			}
		}
	};
	// var map;

	var addZones = function(){
		//map = m;
		mapSvc.map.then(function(){
			for (var i = 0; i < zone.length; i++) {
				var z = zone[i];
				addZone(z);
			};
		});


	};
	var addZone = function (zone){
		
		var vertices = zone.vertices;
		currentPath = [];
		for (var i = 0; i < vertices.length; i++) {
			currentPath.push(new google.maps.LatLng(vertices[i].latitude, vertices[i].longitude));
		};

		var zoneType = zoneTypeSvc.zoneTypeById[zone.zoneType];
		var color = zoneType.getRiskColor();
		currentZone = new google.maps.Polygon({
		    paths: currentPath,
		    strokeColor: color,
		    strokeOpacity: 0.8,
		    strokeWeight: 3,
		    fillColor: color,
		    fillOpacity: 0.35,
		    editable: false,
		    map:mapSvc.getMap(),
		    zoneType: zoneType
		});
		zone.googlePolygon = currentZone;
		addEvents(zone);
		extendZone(zone);
		currentZone = undefined;
		currentPath = undefined;
		return currentZone;
	};


	var addEvents=function(zonePromise){
		var zone = zonePromise.googlePolygon;
		google.maps.event.addListener(zone, 'click', function(event) {
		    zonePromise.setSelected(true);
		});

		google.maps.event.addListener(zone, 'mouseover', function() {
		
		});

		google.maps.event.addListener(zone, 'mouseout', function() {
     
		});

	};
	var extendZone = function(zonePromise){
		var zone = zonePromise.googlePolygon;
		zonePromise.selected = false;
		zonePromise.toggleMap = function(){
		    zone.zIndex = 99999.0;
		    zone.setMap(null);
		    zone.setMap(mapSvc.getMap());
		};
		zonePromise.updateColor= function(color){
			zone.setOptions({strokeColor: color, fillColor: color});
		};
		zonePromise.setSelected = function(value){
			zonePromise.selected = value;
			if(value){
				if(zoneSvc.selectedZone == zonePromise){
					return;
				}else if(zoneSvc.selectedZone!= undefined){
					// a new zone is selected
					zoneSvc.selectedZone.setSelected(false);
				}

				zoneTypeSvc.setSelectedZoneType( zonePromise.zoneType);

				zoneSvc.selectedZone = zonePromise;
				listScope.$apply();
				zone.strokeOpacity =0.5;
		        zone.strokeWeight = "18";

			}else{
				zone.strokeWeight = "2";
				zoneSvc.selectedZone = undefined;
				
			}
			zonePromise.toggleMap();
		};
	};
	var applyScope = function(){
		listScope.$apply();
	};

	var marshal = function (zone, callback) {
        // bind data
        if(zone==undefined){
            console.log('should not be defiend');
        }

        var path = zone.getPath().getArray();
        var vertices = [];

        for (var i = path.length - 1; i >= 0; i--) {
        	vertices.push({longitude:path[i].lng(),latitude:path[i].lat()});
        };
        var zoneR = new resource();
        console.log('selectedSoneType ',zone.selectedZoneType);
        // save the stuff to the object
        zoneR.vertices = vertices;
        zoneR.zoneType = zone.selectedZoneType._id;
        zoneR._id = zone._id;
        zoneR.$save(callback);
        
        return zoneR;
    };

	var cancelZone = function(){
		// if drawing
		if(currentPath){
			currentZone.setMap(null);
		} // modifing existing geometry
		else{
			if(zoneSvc.selectedZone)
				zoneSvc.selectedZone.setSelected(false);
			// delete zone
			// currentZone.setSelected(false);
		}
		currentZone = undefined;
		currentPath = undefined;
        zoneSvc.selectedZone = undefined;
    };
    var acceptZone = function(){
    	// creating geometry
    	if(currentZone){
			currentZone.setEditable(false);
	        // save to db
	        currentZone.selectedZoneType = zoneTypeSvc.selectedZoneType;
	        console.log('selectedZOneType',zoneTypeSvc.selectedZoneType);
	        marshal(currentZone);
	      	zoneSvc.selectedZone = undefined;
	        
	        // release current zone
	        currentZone=undefined;
	        currentPath = undefined;
	    }else{
	    	var poly = zoneSvc.selectedZone.googlePolygon;
	    	poly._id = zoneSvc.selectedZone._id; 
	    	poly.selectedZoneType = {_id:zoneTypeSvc.selectedZoneType};
	    	marshal(zoneSvc.selectedZone.googlePolygon);
	    	// now hide panel
	    	zoneSvc.selectedZone.setSelected(false);
	    	//applyScope();
	    }
    };
    var updateSelectedZoneColor = function(){
    	var selectedZone = zoneSvc.selectedZone;
    	selectedZone.updateColor(zoneTypeSvc.selectedZoneType.getRiskColor());
    };


	
	var addScope = function(scope){
		listScope = scope;
	}
	var zoneSvc = {
		zone: 		zone,
		// zoneById: 	zoneById,
		addVertex: 	addVertex,
		selectedZone: undefined,
		addScope:addScope,
		cancelZone:cancelZone,
		addZone:addZone,
		addZones:addZones,
		acceptZone:acceptZone,
		applyScope:applyScope,
		updateSelectedZoneColor:updateSelectedZoneColor
	};
	return zoneSvc;

  


});