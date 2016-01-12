
"use strict";

var api = require('./api');
var front = require('./front');
var auth = require('./auth');

module.exports = {
    apiBaseUrl: '/api/v1',
    authBaseUrl: '/auth',
    api: api,
    front: front,
    auth: auth
};