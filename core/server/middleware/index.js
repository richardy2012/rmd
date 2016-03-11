
"use strict";

const path = require('path');
const config = require('config');
const mount = require('koa-mount');
const serve = require('koa-static');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');
const router = require('../router');
const authenticate = require('./authenticate');

module.exports = function (frontApp) {

    // front
    frontApp.use(function *(next) {
        const start = new Date;
        yield next;
        const ms = new Date - start;
        console.log('%s %s - %s', this.method, this.url, ms + 'ms');
    });
    frontApp.use(serve(config.get('front.assets')));
    frontApp.use(bodyParser());
    frontApp.use(router.front().routes());

    // api
    frontApp.use(mount(router.apiBaseUrl, authenticate()));
    frontApp.use(mount(router.apiBaseUrl, router.api().routes()));

    // auth
    frontApp.use(passport.initialize());
    frontApp.use(passport.session());
    frontApp.use(mount(router.authBaseUrl, router.auth().routes()));

};