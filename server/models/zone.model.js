/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: 25/06/2015
 * Description: Database model for mesh zone
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;


var zoneSchema = new mongoose.Schema({
    zoneType: ObjectId,
    vertices: [{
        longitude: Number,
        latitude: Number
    }]
});


var Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
