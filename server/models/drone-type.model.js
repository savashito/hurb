/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Database model for drone types (ie: DJI Phantom)
 */

var mongoose = require('mongoose');

var droneTypeSchema = new mongoose.Schema({
    name: String,
    payload: Number,
    endurance: {
        rain: Number,
        heat: Number,
        cold: Number,
        wind: Number,
        humidity: Number
    },
    dimensions: {
        height: Number,
        width: Number,
        weight: Number
    },
    duration: Number
});

droneTypeSchema.methods = {};

var DroneType = mongoose.model('DroneType', droneTypeSchema);

module.exports = {
    DroneType: DroneType
};