angular.module('app').factory('droneManagerSvc', function (elementManagerSvc) {
	// Private methods
	// Drone manager class
	var DroneManager = new elementManagerSvc('drone','/assets/map/drone1-icon.png','/assets/map/drone1-icon.png');
	return DroneManager;
});