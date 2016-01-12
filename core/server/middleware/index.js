
"use strict";

var path = require('path');
var config = require('config');
var mount = require('koa-mount');
var serve = require('koa-static');
var passport = require('koa-passport');
var bodyParser = require('koa-bodyparser');
var router = require('../router');
var authenticate = require('./authenticate');

module.exports = function (frontApp) {

    // front
    frontApp.use(function *(next) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
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