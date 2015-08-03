var distance = require('gps-distance');
var Waypoint = require("../models/waypoints.model");

var listDrones = undefined;
var listWaypoints = undefined;
var listEdges = undefined;

// Tested


exports.findNearestWaypoint = function (point, callback) {
    // console.log('point',point);
    checkForLists(function (listWaypoints) {
        // console.log('listWaypoints',listWaypoints);
        var minDist = Number.MAX_VALUE;
        var minWaypoint = -1;
        for (var i = listWaypoints.length - 1; i >= 0; i--) {
            wp = listWaypoints[i];
            var d = getDistance(point, wp);
            // console.log('d al wp ',d,wp);
            if (minDist > d) {
                minDist = d;
                minWaypoint = wp;
                // console.log('minDist',minDist,minWaypoint.i);

            }
        }
        // console.log('minWaypoint',minWaypoint);
        callback(minWaypoint);
    });

};
exports.setListWaypoints = function (ways) {
    listWaypoints = ways;
};

var getDistance = function (a, b) {
    var l1 = a.location;
    var l2 = b.location;
    return distance(l1.latitude, l1.longitude, l2.latitude, l2.longitude);
};

var checkForLists = function (callback) {
    if (listWaypoints === undefined) {
        Waypoint.find({}).exec(function (err, collection) {
            listWaypoints = collection;
            callback(listWaypoints);
        });
    } else {
        callback(listWaypoints);
    }
};
