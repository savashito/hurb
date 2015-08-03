/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Creates initial seed data for the database for the zone model
 */

var Zone = require("../models/zone.model").Zone;

function createDefaultZone() {

    Zone.find().exec(function (err, collection) {
        if (collection.length == 0) {

            Zone.create({
                // Put attributes here
            });


        }
    });
}

exports.createDefaultZone = createDefaultZone;