/**
 * @author Jake Hewitt
 * Description:
 */

var auth = require('../config/auth');
var edge = require('../controllers/edge.controller');

module.exports = function (app) {
    app.get('/api/edges', edge.getEdges);
    // Edges CRUD
    app.get('/api/edges/:id', edge.getEdgeById);
    app.post('/api/edges', edge.createEdge);
    app.delete('/api/edges/:id', edge.deleteEdge);
    app.delete('/api/edges/', edge.deleteAllEdge);
};
