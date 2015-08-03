/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Creates initial seed data for the database for the order model
 */

var Order = require("../models/order.model").Order;

function createDefaultOrders() {

    Order.find().exec(function (err, collection) {
        if (collection.length == 0) {

            Order.create({
                packageDimensions: {
                    height: 3,
                    width: 3,
                    weight: 5
                },
                timeWindow: 30,
                status: "In progress",
                sender: "556e06662a6efc6c2544773b",
                receiver: "556e06662a6efc6c2544773c",
                orderLabel: "6245-4856-7741"
            });

            Order.create({
                packageDimensions: {
                    height: 5,
                    width: 7,
                    weight: 8
                },
                timeWindow: 90,
                status: "Delivered",
                sender: "556e06662a6efc6c2544773b",
                receiver: "556e06662a6efc6c2544773c",
                orderLabel: "2648-5234-3546"
            });

            Order.create({
                packageDimensions: {
                    height: 3,
                    width: 3,
                    weight: 5
                },
                timeWindow: 30,
                status: "In progress",
                sender: "556e06662a6efc6c2544773b",
                receiver: "556ea01e459b3d5f1b64dcaf",
                orderLabel: "6861-4214-3998"
            });


        }
    });
}

exports.createDefaultOrders = createDefaultOrders;