/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Database model for the MATT landing pad
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var mattSchema = new mongoose.Schema({
    timeCreated: {
        type: Date,
        default: Date.now
    },
    owner: ObjectId,
    location: {
        longitude: Number,
        latitude: Number
    }
});

mattSchema.methods = {};

var Matt = mongoose.model('Matt', mattSchema);

module.exports = {
    Matt: Matt
};
