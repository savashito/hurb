/**
 * @author Rodrigo Savage
 * Description:
 */

var auth = require('../config/auth');
var zoneType = require('../controllers/zone-type.controller');

module.exports = function (app) {
    app.get('/api/zonetype', zoneType.getZoneType);
    app.get('/api/zonetype/:id', zoneType.getZoneTypeById);
    app.post('/api/zonetype', zoneType.createZoneType);
    app.put('/api/zonetype', zoneType.updateZoneType);
    app.delete('/api/zonetype/:id', zoneType.deleteZoneType);
    app.delete('/api/zonetype', zoneType.deleteAllZoneType);
};
