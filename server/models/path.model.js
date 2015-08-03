/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Database model for paths
 */

var mongoose = require('mongoose');

var pathSchema = new mongoose.Schema({
    waypoints: [{
        longitude: Number,
        latitude: Number
    }],
    distance: Number,
    lastUsed: {
        type: Date,
        default: Date.now
    },
    temporary: Boolean
});

pathSchema.methods = {};

var Path = mongoose.model('Path', pathSchema);

module.exports = {
    Path: Path
};
