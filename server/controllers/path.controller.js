/**
 * @author Jake Hewitt
 * Last Edited: 06/05/2015
 * Description: Controller for Path API
 */

var Path = require("../models/path.model").Path;

exports.getPaths = function (req, res) {
    Path.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.getPathById = function (req, res) {
    Path.findOne({_id: req.params.id}).exec(function (err, path) {
        res.send(path);
    });
};

exports.getUserPaths = function (req, res) {
    Path.find({owner: req.params.id}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.createPath = function (req, res) {
    var pathData = req.body;
    Path.create(pathData, function (err, path) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    })
};

exports.updatePath = function (req, res) {
    var pathData = req.body;

    Path.findOne({_id: req.body.id}, function (err, path) {
        // Make changes here
        path.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.sendStatus(200);
        });
    })
};

exports.deletePath = function (req, res) {
    Path.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};