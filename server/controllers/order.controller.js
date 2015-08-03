/**
 * @author Jake Hewitt
 * Last Edited: 06/03/2015
 * Description: Controller for Order API
 */

var Order = require("../models/order.model").Order;

exports.getOrders = function (req, res) {
    Order.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.getOrderById = function (req, res) {
    Order.findOne({_id: req.params.id}).exec(function (err, order) {
        res.send(order);
    });
};

exports.getUserOrders = function (req, res) {
    Order.find({$or: [{sender: req.params.id}, {receiver: req.params.id}]}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.createOrder = function (req, res) {
    var orderData = req.body;
    Order.create(orderData, function (err, order) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    })
};

exports.updateOrder = function (req, res) {
    var orderData = req.body;

    Order.findOne({_id: req.body.id}, function (err, order) {
        // Make changes here
        order.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.sendStatus(200);
        });
    })
};

exports.deleteOrder = function (req, res) {
    Order.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};