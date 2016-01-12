
"use strict";

var _ = require('lodash');
var config = require('config');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var api = require('../api');
var model = require('../model').waterline;

module.exports = function (){
    return function *(next){

        if (/^\/authenticate\/token/gi.test(this.url)) {
            yield next;
            return;
        }

        var authorization = this.request.header['authorization'] || this.cookies.get('authorization') || this.query.access_token;
        // 如果token为空
        if (_.isEmpty(authorization)) {
            this.body = {ret: 403, msg: 'invalid access token'};
            return;
        }

        // 查找token
        var token = yield model.collections.token.findOne({access_token: authorization});
        if (_.isEmpty(token)) {
            this.body = {ret: 403, msg: 'invalid access token'};
            return;
        }

        // 如果token过期
        if (moment().isAfter(moment(token.expires))) { // invalid
            this.body = {ret: 403, msg: 'invalid access token'};
            return;
        }

        var decoded = jwt.verify(authorization, config.get('token.cert'));
        var res = yield api.user.read({id: decoded.iss});
        if (_.isEmpty(res.data)) {
            this.body = {ret: 403, msg: 'invalid access token'};
            return;
        }

        var user = res.data;
        delete user.password;
        this.state.user = user;

        // 验证
        yield next;
    }
};