/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: 06/16/2015
 * Description: Socket function for to init connection
 */
var droneRequest = require('../controllers/drone.request.controller');

var drones = require('../controllers/drone.controller');

var socket = function (app) {

    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    //Real-time
    io.on('connection', function (socket) {

        console.log('socket connection successful');

        socket.emit('drones', {
            drones: drones.getDroneListRealTime(),
        });
        var i = 0;
        var waypoints = droneRequest.getWaypointsListRealtime();
        var parent = this;

        this.interval = setInterval(function () {

            socket.emit('waypoints', {
                waypoints: waypoints,
                currentWaypoint: i
            });
            console.log('socket.emit', i);
            i++;
            console.log('waypoints.length', waypoints.length);
            if (i == waypoints.length) {
                clearInterval(parent.interval);
                console.log('clear interval')
            }

        }, 3000);

    });
    return server;
};

module.exports = socket;
