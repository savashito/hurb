/**
 * @author Jake Hewitt
 * Description:
 */

var auth = require('../config/auth');
var drones = require('../controllers/drone.controller');

module.exports = function (app) {
    // app.get('/api/drones', auth.requiresRole('admin'), drones.getDrones);
    app.get('/api/drones', drones.getDrones);

    //Drone CRUD
    app.get('/api/drones/:id', drones.getDroneById);
    app.get('/api/users/:id/drones', drones.getUserDrones);
    app.post('/api/users/:id/drones', drones.registerDrone);
    app.post('/api/drones', drones.registerDrone);
    // app.put('/api/users/:id/drones', drones.updateDrone);
    app.put('/api/drones', drones.updateDrone);
    app.delete('/api/drones/:id', drones.deleteDrone);
    app.delete('/api/drones', drones.deleteAllDrone);

};
