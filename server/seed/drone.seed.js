/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Creates initial seed data for the database for the drone model
 */

var Drone = require("../models/drone.model").Drone;

function createDefaultDrones() {

    Drone.find().exec(function (err, collection) {
        if (collection.length == 0) {

            Drone.create({
                name: 'Apollo',
                location: {
                    longitude: -110.9683734,
                    latitude: 32.2275414
                },
                altitude: 710.295001,
                phone: 16123609716
            });

            Drone.create({
                name: 'Apollo2',
                location: {
                    longitude: -110.9683734,
                    latitude: 32.2275414
                },
                altitude: 710.295001,
                phone: 16128496138
            });

            /*
             Drone.create( {name:'Sergio', location: {
             longitude: -110.969,
             latitude: 32.2270338
             }
             });

             Drone.create({name:'Luis', location: {
             longitude: -110.9699,
             latitude: 32.2270338
             }
             });
             */

        }
    });
}

exports.createDefaultDrones = createDefaultDrones;
