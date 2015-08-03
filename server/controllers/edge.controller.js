/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: 06/13/2015
 * Description: Controller for Waypoints API
 */

var Edge = require("../models/edge.model");
var listEdges = undefined;
exports.getEdgesList = function (callback) {
    if (listEdges == undefined) {

        Edge.find({}).exec(function (err, collections) {
            callback(collections);
        });
    } else {
        callback(listEdges);
    }
};

exports.getEdges = function (req, res) {
    Edge.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.getEdgeById = function (req, res) {
    Edge.findOne({_id: req.params.id}).exec(function (err, edge) {
        res.send(edge);
    });
};

exports.createEdge = function (req, res) {
    var edgeData = req.body;
    Edge.create(edgeData, function (err, edge) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};

exports.deleteEdge = function (req, res) {
    Edge.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};
exports.deleteEdgeByWaypoint = function (req, res) {
    waypoint = 2;
    console.log('deleteEdgeByWaypoint');
    Edge.find({$or: [{coordinateA: waypoint}, {coordinateB: waypoint}]}).remove()
        .exec(function (err) {
            /* if (err) {
             res.status(400);
             return res.send({reason: err.toString()});
             }
             res.sendStatus(200);*/
        });
};
exports.deleteAllEdge = function (req, res) {
    Edge.remove({}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};
