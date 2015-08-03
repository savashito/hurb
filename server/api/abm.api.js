/**
 * @author Jake Hewitt
 * Description:
 */

var auth = require('../config/auth');
var abms = require('../controllers/abm.controller');

module.exports = function (app) {
    app.get('/api/abms', abms.getAbms);
    // Base Model CRUD
    app.get('/api/abms/:id', abms.getAbmById);
    app.get('/api/users/:id/abms', abms.getUserAbms);
    // app.post('/api/users/:id/abms', abms.createAbm);
    app.post('/api/abms', abms.createAbm);
    app.put('/api/users/:id/ambs', abms.updateAbm);
    app.delete('/api/abms/:id', abms.deleteAbm);

};
