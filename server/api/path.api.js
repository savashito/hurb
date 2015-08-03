/**
 * @author Jake Hewitt
 * Description:
 */

var auth = require('../config/auth');
var paths = require('../controllers/path.controller');

module.exports = function (app) {
    app.get('/api/paths', paths.getPaths);
    // Path CRUD
    app.get('/api/paths/:id', paths.getPathById);
    app.get('/api/users/:id/paths', paths.getUserPaths);
    app.post('/api/users/:id/paths', paths.createPath);
    app.put('/api/users/:id/paths', paths.updatePath);
    app.delete('/api/drones/:id', paths.deletePath);
};
