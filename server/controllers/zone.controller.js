/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: 06/25/2015
 * Description: Controller for zone
 */
var Zone = require("../models/zone.model");
var gridController = require('../controllers/grid.controller');

exports.getZone = function (req, res) {
    Zone.find({}).exec(function (err, collections) {
        res.send(collections);
    });

//res.send({MIAU:'JIJO'});
};

exports.getZoneById = function (req, res) {
    Zone.findOne({_id: req.params.id}).exec(function (err, zone) {

        res.send(zone);
    });
};


exports.createZone = function (req, res) {
    var zoneData = req.body;
    console.log('createzone', zoneData);
    if (zoneData._id !== undefined) {
        Zone.findOneAndUpdate({_id: zoneData._id}, zoneData, function (err, Zone) {
            console.log('Updated ', zoneData._id);
             res.send(zoneData);
        })
    }else{
        Zone.create(zoneData, function (err, zone) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            // update the grid
            gridController.update(zoneData);
            res.sendStatus(200);
        })

    }
};

exports.updateZone = function (req, res) {
    var zoneData = req.body;

    /*
     Mesh.findOne({_id: req.body.id}, function (err, Mesh) {
     // Make changes here
     Mesh.save(function (err) {
     if (err) {
     res.status(400);
     return res.send({reason: err.toString()});
     }
     res.sendStatus(200);
     });
     })
     */
};

exports.deleteZone = function (req, res) {
    Zone.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};

exports.deleteAllZone = function (req, res) {
    Zone.remove({}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};
