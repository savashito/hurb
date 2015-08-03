/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Creates initial seed data for the database for the matt model
 */

var Matt = require("../models/matt.model").Matt;

function createDefaultMatt() {

    Matt.find().exec(function (err, collection) {
        if (collection.length == 0) {

            Matt.create({
                // Put attributes here
            });


        }
    });
}

exports.createDefaultMatt = createDefaultMatt;