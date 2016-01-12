
"use strict";

var router = require('koa-router')();
var auth = require('../controller/auth');

module.exports = function (){

    router.get('/github', auth.github.index);
    router.get('/github/callback', auth.github.callback);

    return router;
};