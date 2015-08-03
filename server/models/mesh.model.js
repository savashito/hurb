/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: 25/06/2015
 * Description: Database model for mesh zone
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;


var meshSchema = new mongoose.Schema({
    meshType: ObjectId,
    vertices: [{
        longitude: Number,
        latitude: Number
    }]
});


var Mesh = mongoose.model('Mesh', meshSchema);

module.exports = Mesh;
