/**
 * @author Jake Hewitt
 * Last Edited: 06/05/2015
 * Description: Controller for Matt API
 */

var Matt = require("../models/matt.model").Matt;

exports.getMatts = function (req, res) {
    Matt.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.getMattById = function (req, res) {
    Matt.findOne({_id: req.params.id}).exec(function (err, matt) {
        res.send(matt);
    });
};

exports.getUserMatts = function (req, res) {
    Matt.find({owner: req.params.id}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.createMatt = function (req, res) {
    var mattData = req.body;
    Matt.create(mattData, function (err, matt) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    })
};

exports.updateMatt = function (req, res) {
    var mattData = req.body;

    Matt.findOne({_id: req.body.id}, function (err, matt) {
        // Make changes here
        matt.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.sendStatus(200);
        });
    })
};

exports.deleteMatt = function (req, res) {
    Matt.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};