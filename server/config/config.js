var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

var settings = require('../../.settings/settings.json');

module.exports = {
    development: {
        db: settings.development.db,
        rootPath: rootPath,
        port: process.env.PORT || settings.development.port
    },
    production: {
        db: settings.production.db,
        rootPath: rootPath,
        port: process.env.PORT || settings.production.port
    }
};
