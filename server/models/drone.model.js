/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Database model for drones
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;


var droneSchema = new mongoose.Schema({
    owner: ObjectId,
    speed: Number,
    battery: Number,
    maxPayload: Number,
    altitude: Number,
    status: String,
    life: Number,
    name: String,
    phone: Number,
    location: {
        longitude: Number,
        latitude: Number
    }

});

droneSchema.methods = {};

var Drone = mongoose.model('Drone', droneSchema);

module.exports = {
    Drone: Drone
};
