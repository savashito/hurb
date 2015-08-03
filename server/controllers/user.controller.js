/**
 * @author Jake Hewitt
 * Last Edited: 06/04/2015
 * Description: Controller for User API
 */

var User = require("../models/user.model").User;
var encrypt = require('../utilities/encryption');
var ObjectId = require('mongoose').Types.ObjectId;

// Returns a list of all users
exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

// Fetches user id by their username
exports.getIdByUsername = function (req, res) {
    User.findOne({username: req.params.id}).exec(function (err, user) {
        res.send(user._id);
    });
};

// Fetches user by username or id
exports.getUser = function (req, res) {
    User.findOne({username: req.params.id}).exec(function (err, user) {
        res.send(user);
        // var id = req.params.id;
        // var $or = [{username: id}];

        // // If it looks like an ObjectId, convert it to one and
        // // add it to the list of OR operands.
        // if (ObjectId.isValid(id)) {
        //     $or.push({_id: ObjectId(id)});
        // }

        // User.find({$or: $or}).exec(function (err, collections) {
        //     // TODO: check for errors
        //     res.send(collections);
    });
};


// Creates a user
exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    });
};

// Update a user
exports.updateUser = function (req, res) {
    var userUpdates = req.body;

    if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.name = userUpdates.name;
    req.user.username = userUpdates.username;
    req.user.location.longitude = userUpdates.location.longitude;
    req.user.location.latitude = userUpdates.location.latitude;


    if (userUpdates.password && userUpdates.password.length > 0) {
        req.user.sale = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.sale, userUpdates.password)
    }

    req.user.save(function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(req.user);
    });
};

// Deletes user by username
exports.deleteUser = function (req, res) {
    User.findOneAndRemove({username: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};
