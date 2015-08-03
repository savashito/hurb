/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Database model for orders
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var orderSchema = new mongoose.Schema({
    packageDimensions: {
        height: Number,
        width: Number,
        weight: Number
    },
    timePlaced: {
        type: Date,
        default: Date.now
    },
    timeWindow: Number,
    timeDelivered: {
        type: Date,
        default: Date.now
    },
    status: String,
    path: ObjectId,
    sender: ObjectId,
    receiver: ObjectId,
    orderLabel: String
});

orderSchema.methods = {};

var Order = mongoose.model('Order', orderSchema);

module.exports = {
    Order: Order
};

