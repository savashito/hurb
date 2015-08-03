/**
 * @author Jake Hewitt
 * Last Edited: 06/03/2015
 * Description: Controller for Drone API
 */

var Drone = require("../models/drone.model").Drone;

var listDrones = undefined;

exports.getDroneList = function (callback) {
    // if(listDrones==undefined){
    Drone.find({}).exec(function (err, collections) {
        listDrones = collections;
        // console.log('getDroneList',listDrones);
        callback(listDrones);
    });
    // }else{
    //     callback(listDrones);
    // }
};

exports.getDroneListRealTime = function () {
    // if(listDrones==undefined){

    return listDrones;
    // }else{
    //     callback(listDrones);
    // }
};

exports.getDrones = function (req, res) {
    // if(listDrones==undefined){
    Drone.find({}).exec(function (err, collections) {
        listDrones = collections;
        res.send(listDrones);
    });
    // }else{
    //     res.send(listDrones);
    // }
};

exports.getDroneById = function (req, res) {
    Drone.findOne({_id: req.params.id}).exec(function (err, drone) {
        res.send(drone);
    });
};

exports.getUserDrones = function (req, res) {
    Drone.find({owner: req.params.id}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.registerDrone = function (req, res) {
    var droneData = req.body;
    // TODO: check if user id exists
    Drone.create(droneData, function (err, drone) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    })
};

exports.updateDrone = function (req, res) {
    var droneData = req.body;
    Drone.findOne({_id: req.body.id}, function (err, drone) {
        drone.speed = req.body.speed;
        drone.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.sendStatus(200);
        });
    })
};

exports.deleteDrone = function (req, res) {
    Drone.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};

exports.deleteAllDrone = function (req, res) {
    Drone.remove({}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};