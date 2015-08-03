/**
 * @author Luis Arias
 * Last Edited: 06/12/2015
 * Description: Database model for waypoints
 */

var mongoose = require('mongoose');

var waypointsSchema = new mongoose.Schema({
    location: {
        longitude: {type: Number},
        latitude: {type: Number}
    },
    i: {type: Number}
});

waypointsSchema.methods = {};

var Waypoints = mongoose.model('Waypoints', waypointsSchema);

module.exports = Waypoints;
