/**
 * @author Luis Arias y Rodrigo Savage
 * Last Edited: 26/06/2015
 * Description: Creates initial seed data for the database for the drone model
 */

var Zone = require("../models/zone-type.model");

function createDefaultZoneType() {

    Zone.find().exec(function (err, collection) {
        if (collection.length == 0) {

            Zone.create(
                {
                    name: 'Residential', value: 0.5,
                    schedule: [{
                        startTime: '2015-07-02T13:00:17.762Z',
                        endTime: '2015-07-02T16:30:17.762Z',
                        value: 1,
                        days: [1, 2, 3, 4, 5]
                    }, {
                        startTime: '2015-07-02T21:00:17.762Z',
                        endTime: '2015-07-03T03:00:17.762Z',
                        value: 1,
                        days: [1, 2, 3, 4, 5]
                    }],
                    desc: "A residential area is a land use in which housing predominates. These include single-family, multi-family residential, or mobile homes."
                });


            Zone.create({name: 'Building', value: 0.1});
            Zone.create({name: 'Govermental', value: 3});
            Zone.create({name: 'Forbidden', value: 3});


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

module.exports.createDefaultZoneType = createDefaultZoneType;
