/**
 * @author Luis Arias
 * Last Edited: 06/12/2015
 * Description: Controller for Waypoints API
 */

var Waypoint = require("../models/waypoints.model");

exports.getWaypointsList = function (callback) {
    Waypoint.find({}).exec(function (err, collections) {
        callback(collections);
    });
};

exports.getWaypoints = function (req, res) {
    Waypoint.find({}).exec(function (err, collections) {
        //collections = extendWaypoints(collections);
        // console.log('getWaypoints',collections);
        res.send(collections);
    });
};

function extendWaypoints(wpts) {
    var col = [];
    for (var i = 0; i < wpts.length; i++) {
        var t = {miau: i, location: wpts[i].location};
        // wpts[i].miau = wpts[i].i;
        col.push(t);
    }
    return col;
}


exports.getWaypointById = function (req, res) {
    Waypoint.findOne({_id: req.params.id}).exec(function (err, waypoints) {
        res.send(waypoints);
    });
};

exports.createWaypoint = function (req, res) {
    var waypointData = req.body;
    Waypoint.create(waypointData, function (err, waypoints) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};


exports.deleteAllWaypoint = function (req, res) {
    Waypoint.remove({}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};

exports.deleteWaypointI = function (req, res) {
    Waypoint.findOneAndRemove({i: 2}, function (err) {
        /*if (err) {
         res.status(400);
         return res.send({reason: err.toString()});
         }
         res.sendStatus(200);*/
    });
};

exports.deleteWaypoint = function (req, res) {
    Waypoint.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};
