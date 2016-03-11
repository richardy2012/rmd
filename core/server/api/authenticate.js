
"use strict";

const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const model = require('../model').waterline;

module.exports = {
    token: function (object, options) {
        return function *() {
            const username = object.username;
            const password = object.password;

            // if username or password is empty
            if (_.isEmpty(username) || _.isEmpty(password)) {
                return {ret: 401, msg: 'username or password is not allowed empty'};
            }

            const user = yield model.collections.user.findOne({username: username});
            // is user existed || is password error
            if (_.isEmpty(user) || password !== user.password) {
                return {ret: 404, msg: 'username or password error'};
            }

            const expires = moment().add(30, 'days').valueOf();
            const access_token = jwt.sign({iss: user.id, expires: expires}, config.get('token.cert'));

            // save token to db
            const data = yield model.collections.token.create({access_token: access_token, expires: expires});
            this.cookies.set('authorization', access_token);
            return {ret: 0, msg: 'ok', data: {access_token: access_token, expires: expires}};
        };
    },
    revoke: function (object, options){
        return function *(){
            const authorization = this.request.header['authorization'] || this.cookies.get('authorization') || this.query.access_token;
            yield model.collections.token.destroy({access_token: authorization});
            return {ret: 0, msg: 'ok'};
        };
    }
};