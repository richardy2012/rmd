
"use strict";

var router = require('koa-router')();
var front = require('../controller/front');

module.exports = function (){
    router.get('/', front.index);
    return router;
};