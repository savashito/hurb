var express = require('express');
var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config')[env];

//Express middlewares and some configurations
require('./server/config/express.js')(app, config);

//connect with mongoDB
require('./server/config/mongoose')(config);

//Passport configure
require('./server/config/passport')(app);

require('./server/config/routes')(app,config);

var server = require('./server/config/socket')(app);

server.listen( config.port);
console.log("Listen port " + config.port + "...");