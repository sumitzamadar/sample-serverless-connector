'use strict';

const serverless = require('serverless-http');
const app = require('./src/app')

module.exports.handler = serverless(app, {
    binary: ['image/*']
});