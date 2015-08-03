/**
 * @author Jake Hewitt
 * Last Edited: 06/4/2015
 * Description: Database model for the Apollo Base Model (ABM)
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;


var abmSchema = new mongoose.Schema({
    model: String,
    available: Boolean,
    status: Boolean,
    isPublic: Boolean,
    owner: ObjectId,
    location: {
        longitude: Number,
        latitude: Number
    }
});

abmSchema.methods = {};

var Abm = mongoose.model('Abm', abmSchema);

module.exports = {
    Abm: Abm
};
