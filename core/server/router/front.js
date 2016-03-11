
"use strict";

const router = require('koa-router')();
const front = require('../controller/front');

module.exports = function (){
    router.get('/', front.index);
    return router;
};