/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Database model for the map
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;


var mapSchema = new mongoose.Schema({
    zones: [ObjectId],
    routes: [ObjectId]
});

mapSchema.methods = {};

var Map = mongoose.model('Map', mapSchema);

module.exports = {
    Map: Map
};