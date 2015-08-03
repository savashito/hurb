/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 16/july/2015
 * Description: service for requestDroneSvc
 */
angular.module('app').factory('userRequestDroneSvc', function ($q,$resource) {


	var droneRequest = $resource('/api/dronerequest');
	var location = $q(function(resolve,reject){
        // quick change location
        //l = {longitude: -111.32100820541382, latitude: 32.61019752616995};
        //l = {longitude: -110.96949398517609, latitude: 32.22896646278922};
         l = {longitude: -110.9683734, latitude: 32.2275414};
        resolve(l);
       
		if (navigator.geolocation) {
        /*
            navigator.geolocation.getCurrentPosition(function (position) {
                var l = {};
                l.longitude = position.coords.longitude;
				l.latitude = position.coords.latitude;
                resolve(l);
            });*/

        } else {
        	reject("Geolocation Not defined");
        }
	});
    var requestDrone = function(inLocation){
        var droneRequestObj = new droneRequest();
        location.then(function(l){
            if(inLocation)
                l = inLocation;
            droneRequestObj.location = l;
            userRequestDroneSvc.requestDronePromise = droneRequestObj.$save(function(res){
                // var drone = res.drone;
                // console.log(drone.location);
                // // wait for user location
                // location.then(function(loc){
                //     userManagerSvc.newElement(loc);
                //     droneManagerSvc.newElement(drone.location);
                // });
            });
        });
    };
    var userRequestDroneSvc = {location:location,droneRequest:droneRequest,requestDrone:requestDrone,requestDronePromise:undefined};
    return userRequestDroneSvc;
});
