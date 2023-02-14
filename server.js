const app = require('./app.js');
const http = require('http');
var mongoose = require('mongoose');
var server = http.createServer(app);











server.listen(2000, () => console.log('Server started'));      