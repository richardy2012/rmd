
"use strict";

const path = require('path');
const _ = require('lodash');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('config');
const api = require('../api');
const views = require('co-views');
const render = views(config.get('front.template'), { map: { html: 'ejs' } });

function * getUser(authorization){
    // 如果token为空
    if (_.isEmpty(authorization)) {
        return null;
    }

    // 查找token
    let res = yield api.token.read({access_token: authorization});
    if (_.isEmpty(res.data)) {
        return null;
    }

    // 如果token过期
    if (moment().isAfter(moment(res.data.expires))) {
        return null;
    }

    const decoded = jwt.verify(authorization, config.get('token.cert'));
    res = yield api.user.read({id: decoded.iss});
    if (_.isEmpty(res.data)) {
        return null;
    }

    const user = res.data;
    delete user.password;
    return user;
}

module.exports = {
    index: function *() {
        const authorization = this.cookies.get('authorization');
        const user = yield getUser(authorization);

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