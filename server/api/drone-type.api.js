/**
 * @author Jake Hewitt
 * Description:
 */

var auth = require('../config/auth');
var droneTypes = require('../controllers/drone-type.controller');

module.exports = function (app) {
    app.get('/api/dronetypes', droneTypes.getDroneTypes);
    // Drone Type CRUD
    app.get('/api/dronetypes/:id', droneTypes.getDroneTypeById);
    app.get('/api/users/:id/dronetypes', droneTypes.getUserDroneTypes);
    app.post('/api/users/:id/dronetypes', droneTypes.createDroneType);
    app.put('/api/users/:id/dronetypes', droneTypes.updateDroneType);
    app.delete('/api/drones/:id', droneTypes.deleteDroneType);
};
