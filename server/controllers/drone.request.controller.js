var pathingController = require("../controllers/pathing.controller");
var dijkstra = require("../controllers/dijkstraController");
var edgeController = require("../controllers/edge.controller");
var waypointsController = require("../controllers/waypoints.controller");
var smshandler = require('../sms_handler/sms.controller');

var listWaypointsRealtime = 'Este valor inicial es tamal';
var gridController = require('../controllers/grid.controller');

var getWaypointsListRealtime = function () {
    return listWaypointsRealtime;
};
var droneRequest = function (drones, waypoints, edges) {

    var droneRequest = function (req, res) {

        var user = req.body;

        console.log('userLocation', req.body);

        findBestDrone(user.location, function (drone) {
            current_drone = drone;
            console.log('findBestDrone', drone);
            var waypoints = gridController.aStarComplete(drone.location, user.location);
            // send waypoints to drone
            waypoints.unshift(user.location);
            console.log("Waypoints: ", waypoints);
            sendSMSWaypoints(waypoints);


            waypoints.push(drone.location);


            res.send({drone: drone, user: user, waypoints: waypoints});

            /*

             pathingController.findNearestWaypoint(drone, function (waypointDrone) {
             console.log('waypointDrone', waypointDrone);
             pathingController.findNearestWaypoint(userLocation, function (waypointUser) {
             console.log('waypointUser', waypointUser);

             // fetch  edges and waypoints
             edgeController.getEdgesList(function (edges) {
             waypointsController.getWaypointsList(function (vertices) {
             obj = dijkstra(vertices, edges, waypointDrone.i);
             console.log('dijkstra', obj);
             var prev = obj.prev;
             console.log('egegegeg ', waypointUser);

             var dest = waypointDrone.i;

             var current = waypointUser.i;
             var route = [current];
             console.log('voy ', dest, current);

             while (current != dest) {
             current = prev[current];
             route.push(current);
             }
             // build routs array
             waypointsRoute = [drone];
             for (var i = route.length - 1; i >= 0; i--) {
             waypointsRoute.push(vertices[route[i]]);
             }
             waypointsRoute.push(userLocation);

             console.log('route', waypointsRoute);
             //nextWayPoint = prev[waypointUser.i]
             // send message to drone
             sendSMSWaypoints(waypointsRoute);
             listWaypointsRealtime = waypointsRoute;
             res.send({waypointsRoute: waypointsRoute});

             });
             });

             // waypointUser


             });
             });
             */

        });

    };

    var sendSMSWaypoints = function (waypointsRoute) {
        var content = [];
        console.log("\nWaypoints route: \n", waypointsRoute);
        console.log("\ncurrent drone: \n", current_drone);
        for (var i = 0; i < waypointsRoute.length; i++) {

            var l = waypointsRoute[i];
            var smsWaypoint = {
                "sequence": i,
                "latitude": l.latitude.toString().substring(0, 10),
                "longitude": l.longitude.toString().substring(0, 12),
                "altitude": current_drone.altitude + 20,
                "waitTime": "1",
                "textSeq": "1",
                "shouldContinue": (i == (waypointsRoute.length - 1)) ? 0 : 1
            };
            content.push(smsWaypoint);
        }
        console.log("\nContent: \n", content);
        var message = smshandler.encodeSMS(2, content, false);
        console.log("\Message: \n", message);
    //    smshandler.sendSMS(current_drone.phone, message, 13303496524);
        smshandler.sendSMS(14804150471, message, 13303496524);
        //console.log("\nSent message: \n", message, '\n', smshandler.decodeSentSMS(message));
    };

    var findBestDrone = function (location, callback) {
        drones.getDroneList(function (droneList) {
            callback(droneList[0]);
        });
    };

    return droneRequest;// {droneRequest:droneRequest,listWaypointsRealtime:listWaypointsRealtime};
};
module.exports = {
    droneRequest: droneRequest,
    getWaypointsListRealtime: getWaypointsListRealtime
};


//var exports = function (drones, waypoints, edges) {
//
//    var droneRequest = function (drones, waypoints, edges) {
//
//        var userLocation = req.body;
//        console.log("\nUser location: \n", userLocation);
//        findBestDrone(userLocation.location, function (drone) {
//            current_drone = drone;
//            pathingController.findNearestWaypoint(drone, function (waypointDrone) {
//                pathingController.findNearestWaypoint(userLocation, function (waypointUser) {
//
//                    edgeController.getEdgesList(function (edges) {
//                        waypointsController.getWaypointsList(function (vertices) {
//                            obj = dijkstra(vertices, edges, waypointDrone.i);
//                            var prev = obj.prev;
//
//                            var dest = waypointDrone.i;
//
//                            var current = waypointUser.i;
//                            var route = [current];
//
//                            while (current != dest) {
//                                current = prev[current];
//                                route.push(current);
//                            }
//                            // build routs array
//                            var waypointsRoute = [drone];
//                            for (var i = route.length - 1; i >= 0; i--) {
//                                waypointsRoute.push(vertices[route[i]]);
//                            }
//                            // TODO do not touch this line unless you are the wizard
//                            userLocation.location.latitude += .0000001;
//                            userLocation.location.longitude -= .0000001;
//                            waypointsRoute.push(userLocation);
//
//                            //nextWayPoint = prev[waypointUser.i]
//                            // send message to drone
//                            sendSMSWaypoints(waypointsRoute);
//                            res.send({waypointsRoute: waypointsRoute});
//
//                        });
//                    });
//                });
//            });
//        });
//
//    };
