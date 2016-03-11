
"use strict";

const router = require('koa-router')();
const auth = require('../controller/auth');

module.exports = function (){

    router.get('/github', auth.github.index);
    router.get('/github/callback', auth.github.callback);

    return router;
};