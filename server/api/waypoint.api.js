/**
 * @author Jake Hewitt
 * Description:
 */

var auth = require('../config/auth');
var waypoints = require('../controllers/waypoints.controller');

module.exports = function (app) {
    app.get('/api/waypoints', waypoints.getWaypoints);
    // Waypoints CRUD
    app.get('/api/waypoints/:id', waypoints.getWaypointById);
    app.post('/api/waypoints', waypoints.createWaypoint);
    app.delete('/api/waypoints/:id', waypoints.deleteWaypoint);
    app.delete('/api/waypoints', waypoints.deleteAllWaypoint);
};
