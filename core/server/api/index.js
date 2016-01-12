
"use strict";

var _ = require('lodash');
var router = require('koa-router');

function http(method) {
    return function *() {
        try {
            var object = this.request.body;
            var options = _.extend({}, this.query, this.params);
            if (_.isEmpty(object)) {
                object = options;
                options = {};
            }
            this.body = yield method(object, options);
        }
        catch (e) {
            this.body = {ret: 500, msg: 'server error', data: e};
        }
    };
}

module.exports = {
    http: http,
    post: require('./post'),
    media: require('./media'),
    authenticate: require('./authenticate'),
    user: require('./user'),
    token: require('./token'),
    upload: require('./upload')
};