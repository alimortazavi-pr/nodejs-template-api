require('app-module-path').addPath(__dirname);
require('dotenv').config();
global.config = require('./config');

const Application = require('./app');
new Application();