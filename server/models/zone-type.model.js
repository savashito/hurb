/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: 25/06/2015
 * Description: Database model for mesh zone
 */

var mongoose = require('mongoose');

var zoneTypeSchema = new mongoose.Schema({
    name: String,
    temporal: Boolean,
    value: Number,
    desc: String,
    schedule: [{
        startTime: String,
        endTime: String,
        /*
         startHours: Number,
         endHours: Number,
         startMinutes: Number,
         endMinutes: Number,
         */
        days: [Number],
        value: Number
    }]
});

var Zone = mongoose.model('ZoneType', zoneTypeSchema);

module.exports = Zone;
