var mongoose = require('mongoose');
var userModel = require('../seed/user.seed');
var droneModel = require('../seed/drone.seed');
var orderModel = require('../seed/order.seed');
var waypointsModel = require('../seed/way.seed');
var zoneModel = require('../seed/zone-type.seed');

module.exports = function (config) {
    mongoose.connect(config.db);
    console.log(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('apollo db opened');
    });

    userModel.createDefaultUsers();
    droneModel.createDefaultDrones();
    orderModel.createDefaultOrders();
    zoneModel.createDefaultZoneType();
    //waypointsModel.createDefaultWay();

};