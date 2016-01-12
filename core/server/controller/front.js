
"use strict";

var path = require('path');
var _ = require('lodash');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var config = require('config');
var api = require('../api');
var views = require('co-views');
var render = views(config.get('front.template'), { map: { html: 'ejs' } });

function * getUser(authorization){
    // 如果token为空
    if (_.isEmpty(authorization)) {
        return null;
    }

    // 查找token
    var res = yield api.token.read({access_token: authorization});
    if (_.isEmpty(res.data)) {
        return null;
    }

    // 如果token过期
    if (moment().isAfter(moment(res.data.expires))) {
        return null;
    }

    var decoded = jwt.verify(authorization, config.get('token.cert'));
    res = yield api.user.read({id: decoded.iss});
    if (_.isEmpty(res.data)) {
        return null;
    }

    var user = res.data;
    delete user.password;
    return user;
}

module.exports = {
    index: function *() {
        var authorization = this.cookies.get('authorization');
        var user = yield getUser(authorization);

        try {
            this.body = yield render('editor', {
                user: JSON.stringify(user)
            });
        }
        catch (err) {
            this.body = {ret: 500, msg: 'render template error'};
        }
    }
};