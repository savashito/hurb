/**
 * @author Jake Hewitt
 * Last Edited: 05/29/2015
 * Description: Creates initial seed data for the database for the ABM model
 */

var BaseModel = require("../models/abm.model").BaseModel;

function createDefaultBaseModel() {

    BaseModel.find().exec(function (err, collection) {
        if (collection.length == 0) {

            BaseModel.create({
                // Put attributes here
            });


        }
    });
}

exports.createDefaultBaseModel = createDefaultBaseModel;