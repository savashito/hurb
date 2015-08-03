/**
 * @author Jake Hewitt
 * Last Edited: 06/04/2015
 * Description: Controller for Abm API
 */

var Abm = require("../models/abm.model").Abm;

exports.getAbms = function (req, res) {
    Abm.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.getAbmById = function (req, res) {
    Abm.findOne({_id: req.params.id}).exec(function (err, abm) {
        res.send(abm);
    });
};

exports.getUserAbms = function (req, res) {
    Abm.find({owner: req.params.id}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.createAbm = function (req, res) {
    var abmData = req.body;
    Abm.create(abmData, function (err, abm) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    })
};

exports.updateAbm = function (req, res) {
    var abmData = req.body;

    Abm.findOne({_id: req.body.id}, function (err, abm) {
        // Make changes here
        abm.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.sendStatus(200);
        });
    })
};

exports.deleteAbm = function (req, res) {
    Abm.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};