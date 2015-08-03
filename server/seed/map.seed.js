/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Creates initial seed data for the database for the map model
 */

var Map = require("../models/map.model").Map;

function createDefaultMap() {

    Map.find().exec(function (err, collection) {
        if (collection.length == 0) {

            Map.create({
                // Put attributes here
            });


        }
    });
}

exports.createDefaultMap = createDefaultMap;