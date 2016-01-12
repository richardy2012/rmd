
"use strict";

// check env
var koa = require('koa');
var mount = require('koa-mount');
var core = require('./core');
var parent = koa();

module.exports = core().then(function (server){
    parent.use(mount('/', server.rootApp));
    return server.start(parent);
});