var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var users = require('../controllers/user.controller');
var drones = require('../controllers/drone.controller');
var orders = require('../controllers/order.controller');
var abms = require('../controllers/abm.controller');
var paths = require('../controllers/path.controller');
var waypoints = require('../controllers/waypoints.controller');
var edge = require('../controllers/edge.controller');
var zone = require('../controllers/zone.controller');
var zoneType = require('../controllers/zone-type.controller');

var droneRequest = require('../controllers/drone.request.controller').droneRequest(drones, waypoints);

var sms_controller = require('../sms_handler/sms.controller');

// Test
var dijkstra = require('../controllers/dijkstraController');


// Find nearest waypoint test
var pathingController = require("../controllers/pathing.controller");

// Drone Request Controller
// var droneRequestCtrl = require("../controllers/drone.request.controller");
// add grid
var gridController = require('../controllers/grid.controller');

// this is just for testing
var eventController = require('../controllers/event.controller');

function e(a, b, c) {
    return {coordinateA: a, coordinateB: b, distance: c};
}
function testDijkstra(done) {
    var verts = [];
    for (var i = 7; i >= 0; i--) {
        verts.push({i: i});
    }
    var edges = [
        e(0, 1, 3),
        e(0, 2, 1),
        e(2, 5, 5),
        e(2, 3, 2),
        e(1, 3, 1),
        e(6, 1, 5),
        e(6, 4, 2),
        e(3, 4, 4),
        e(3, 5, 2),
        e(5, 7, 3),
        e(4, 7, 1)
    ];

    var source = 0;
    var miau = dijkstra(verts, edges, source);
    // should be
    miauCorrect = {
        dist: {'0': 0, '1': 3, '2': 1, '3': 3, '4': 7, '5': 5, '6': 8, '7': 9},
        prev: {
            '0': undefined,
            '1': 0,
            '2': 0,
            '3': 2,
            '4': 3,
            '5': 3,
            '6': 1,
            '7': 5
        }
    };
}

function testEventTime() {
    var zone = {zoneType: {schedule: [{start: 27, end: 29}, {start: 28, end: 30}]}};
    eventController.schedule(zone);
    setTimeout(function () {
        console.log("one second");
    }, 1000);
    setTimeout(function () {
        console.log("two second");
    }, 4000);
}
// find nearest waypoint
function testNearestWaypoint() {

    var user1 = {
        location: {
            i: 'u0',
            latitude: 32.226407057853855,
            longitude: -110.97713828086853
        }
    };

    var waypoints = [{
        location: {
            i: 0,
            latitude: 32.22617108072032,
            longitude: -110.97646236419678
        }
    },
        {
            location: {
                i: 1,
                latitude: 32.22704237786052,
                longitude: -110.97629070281982
            }
        }, {
            location: {
                i: 2,
                latitude: 32.22663395836601,
                longitude: -110.97551822662354
            }
        }];

    var user2 = {
        location: {
            i: 'u1',
            latitude: 32.226706566410286,
            longitude: -110.97516417503357
        }
    };
    pathingController.setListWaypoints(waypoints);
    pathingController.findNearestWaypoint(user1, function (waypointUser) {
    });
    pathingController.findNearestWaypoint(user2, function (waypointUser) {
    });
}
// Fucntion for test drone request
var waypointsForDrone = [{
    location: {
        i: 15,
        latitude: 32.233395333670025,
        longitude: -110.96896290779114
    }
},
    {
        location: {
            i: 16,
            latitude: 32.23184343831658,
            longitude: -110.96961736679077
        }
    }, {
        location: {
            i: 17,
            latitude: 32.23212477803757,
            longitude: -110.96738576889038
        }
    }];

var edgesForDrone = [{
    coordinateA: 16,
    coordinateB: 15,
    distance: 183.41899563748046
},
    {
        coordinateA: 15,
        coordinateB: 17,
        distance: 205.08452874145078
    },
    {
        coordinateA: 17,
        coordinateB: 16,
        distance: 212.45868566179942
    }];

// droneRequest(drones,waypointsForDrone,edgesForDrone);


module.exports = function (app, config) {

    testEventTime();
    gridController.initMap();

    // Loads the external files for the CRUD API
    require('../api/user.api')(app);
    require('../api/drone.api')(app);
    require('../api/order.api')(app);
    require('../api/abm.api')(app);
    require('../api/matt.api')(app);
    require('../api/zone.api')(app);
    require('../api/zone-type.api')(app);
    require('../api/drone.api')(app);
    require('../api/zone.api')(app);
    require('../api/path.api')(app);
    require('../api/waypoint.api')(app);
    require('../api/edge.api')(app);

    // visualize grid
    app.get('/api/grid', gridController.renderGrid);

    // big button route
    app.post('/api/dronerequest', droneRequest);

    // SMS receiver
    app.post('/api/receive_sms', sms_controller.receiveSMS);

    app.get('/partials/*', function (req, res) {
        dir = config.rootPath + 'public/app/' + req.params[0] + '.html';
        res.sendFile(dir);
    });

    app.get('/assets/map/*', function (req, res) {
        dir = config.rootPath + 'public/app/admin/adminMap/img/' + req.params[0];
        res.sendFile(dir);
    });
    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};
