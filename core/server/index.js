
"use strict";

var koa = require('koa');
var middleware = require('./middleware');
var Server = require('./server');
var model = require('./model');

function init(options) {
    var frontApp = koa();

    // load middleware
    middleware(frontApp);

    return model.init().then(function (tables){
        return new Server(frontApp);
    }).catch(function (err){
        console.error(err);
        process.exit(0);
    });
}
module.exports = init;