/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: 06/13/2015
 * Description: Database model for edges
 */

var mongoose = require('mongoose');

var edgeSchema = new mongoose.Schema({
    coordinateA: {type: Number},
    coordinateB: {type: Number},
    riskyness: Number,
    distance: Number
});

edgeSchema.methods = {};

var Edge = mongoose.model('Edge', edgeSchema);

module.exports = Edge;
