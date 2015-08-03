/**
 * @author Jake Hewitt
 * Description:
 */

var auth = require('../config/auth');
var matts = require('../controllers/matt.controller');

module.exports = function (app) {
    app.get('/api/matts', matts.getMatts);
    // MATT CRUD
    app.get('/api/matts/:id', matts.getMattById);
    app.get('/api/users/:id/matts', matts.getUserMatts);
    app.post('/api/matts', matts.createMatt);
    // app.post('/api/users/:id/matts', matts.createMatt);
    app.put('/api/users/:id/matts', matts.updateMatt);
    app.delete('/api/drones/:id', matts.deleteMatt);
};
