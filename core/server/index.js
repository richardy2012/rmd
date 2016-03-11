
"use strict";

const koa = require('koa');
const middleware = require('./middleware');
const Server = require('./server');
const model = require('./model');

function init(options) {
    const frontApp = koa();

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