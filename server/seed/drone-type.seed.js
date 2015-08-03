/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Creates initial seed data for the database for the dronemodel model
 */

var DroneModel = require("../models/drone-type.model").DroneModel;

function createDefaultDroneModel() {

    DroneModel.find().exec(function (err, collection) {
        if (collection.length == 0) {

            DroneModel.create({
                // Put attributes here
            });


        }
    });
}

exports.createDefaultDroneModel = createDefaultDroneModel;