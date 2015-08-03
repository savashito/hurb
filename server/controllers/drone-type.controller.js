/**
 * @author Jake Hewitt
 * Last Edited: 06/05/2015
 * Description: Controller for DroneType API
 */

var DroneType = require("../models/drone-type.model").DroneType;

exports.getDroneTypes = function (req, res) {
    DroneType.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.getDroneTypeById = function (req, res) {
    DroneType.findOne({_id: req.params.id}).exec(function (err, droneType) {
        res.send(droneType);
    });
};

exports.getUserDroneTypes = function (req, res) {
    DroneType.find({owner: req.params.id}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.createDroneType = function (req, res) {
    var droneTypeData = req.body;
    DroneType.create(droneTypeData, function (err, droneType) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    })
};

exports.updateDroneType = function (req, res) {
    var droneTypeData = req.body;

    DroneType.findOne({_id: req.body.id}, function (err, droneType) {
        // Make changes here
        droneType.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.sendStatus(200);
        });
    })
};

exports.deleteDroneType = function (req, res) {
    DroneType.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};