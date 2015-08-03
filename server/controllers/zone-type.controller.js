/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 06/25/2015
 * Description: Controller for zone type
 */
var ZoneType = require("../models/zone-type.model");

exports.getZoneType = function (req, res) {
    ZoneType.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.getZoneTypeById = function (req, res) {
    ZoneType.findOne({_id: req.params.id}).exec(function (err, zoneType) {
        res.send(zoneType);
    });
};


exports.createZoneType = function (req, res) {
    var zoneTypeData = req.body;
    console.log('createZoneType', zoneTypeData);
    ZoneType.create(zoneTypeData, function (err, ZoneType) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(ZoneType);
    })
};

exports.updateZoneType = function (req, res) {
    var zoneTypeData = req.body;
    console.log(zoneTypeData);
    if (zoneTypeData._id !== undefined) {
        ZoneType.findOneAndUpdate({_id: zoneTypeData._id}, zoneTypeData, function (err, ZoneType) {
            console.log('Updated ', zoneTypeData._id);
             res.send(zoneTypeData);
        })
    } else {
        console.log("createzoneType", zoneTypeData);
        exports.createZoneType(req, res);
         res.send(zoneTypeData);

    }


};

exports.deleteAllZoneType = function (req, res) {
    ZoneType.remove({}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};

exports.deleteZoneType = function (req, res) {
    ZoneType.findOneAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });
};
