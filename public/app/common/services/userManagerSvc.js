angular.module('app').factory('userManagerSvc', function (elementManagerSvc) {
	// Private methods
	// Drone manager class
	var UserManager = new elementManagerSvc('user','/assets/map/user-icon.png','/assets/map/user-icon.png');
	return UserManager;
});