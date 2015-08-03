/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Creates initial seed data for the database for the path model
 */

var Path = require("../models/path.model").Path;

function createDefaultPath() {

    Path.find().exec(function (err, collection) {
        if (collection.length == 0) {

            Path.create({
                // Put attributes here
            });


        }
    });
}

exports.createDefaultPath = createDefaultPath;