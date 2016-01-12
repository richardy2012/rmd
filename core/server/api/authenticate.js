
"use strict";

var _ = require('lodash');
var config = require('config');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var model = require('../model').waterline;

module.exports = {
    token: function (object, options) {
        return function *() {
            var username = object.username;
            var password = object.password;

            // if username or password is empty
            if (_.isEmpty(username) || _.isEmpty(password)) {
                return {ret: 401, msg: 'username or password is not allowed empty'};
            }

            var user = yield model.collections.user.findOne({username: username});
            // is user existed || is password error
            if (_.isEmpty(user) || password !== user.password) {
                return {ret: 404, msg: 'username or password error'};
            }

            var expires = moment().add(30, 'days').valueOf();
            var access_token = jwt.sign({iss: user.id, expires: expires}, config.get('token.cert'));

            // save token to db
            var data = yield model.collections.token.create({access_token: access_token, expires: expires});
            this.cookies.set('authorization', access_token);
            return {ret: 0, msg: 'ok', data: {access_token: access_token, expires: expires}};
        };
    },
    revoke: function (object, options){
        return function *(){
            var authorization = this.request.header['authorization'] || this.cookies.get('authorization') || this.query.access_token;
            yield model.collections.token.destroy({access_token: authorization});
            return {ret: 0, msg: 'ok'};
        };
    }
};