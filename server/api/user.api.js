/**
 * @author Jake Hewitt
 * Description:
 */

var auth = require('../config/auth');
var users = require('../controllers/user.controller');

module.exports = function (app) {
    app.get('/api/users', users.getUsers);
    // app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    // app.post('/api/users', auth.requireApiLogin, users.createUser);
    app.put('/api/users', auth.requireApiLogin, users.updateUser);
    // User CRUD
    app.post('/api/users/:id', users.createUser);
    // app.post('/api/users/:id', auth.requiresRole('admin'), users.createUser);
    app.get('/api/users/:id', users.getUser);
    // app.get('/api/users/:id', auth.requiresRole('admin'), users.getUser);
    // app.put('/api/users/:id', auth.requiresRole('admin'), users.updateUser);
    app.put('/api/users/:id', users.updateUser);
    app.delete('/api/users/:id', auth.requiresRole('admin'), users.deleteUser);
};
