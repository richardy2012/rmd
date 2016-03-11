
"use strict";

const api = require('./api');
const front = require('./front');
const auth = require('./auth');

module.exports = {
    apiBaseUrl: '/api/v1',
    authBaseUrl: '/auth',
    api: api,
    front: front,
    auth: auth
};