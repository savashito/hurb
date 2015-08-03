/**
 * @author Rodrigo Savage
 * Description:
 */

var auth = require('../config/auth');
var zone = require('../controllers/zone.controller');

module.exports = function (app) {
    app.get('/api/zone', zone.getZone);
    app.get('/api/zone/:id', zone.getZoneById);
    app.post('/api/zone', zone.createZone);
   //  app.put('/api/zone/:id', zone.updateZone);
    app.delete('/api/zone/:id', zone.deleteZone);
    app.delete('/api/zone', zone.deleteAllZone);
};
