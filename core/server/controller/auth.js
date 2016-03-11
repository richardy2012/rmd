"use strict";

const _ = require('lodash');
const passport = require('koa-passport');
const GitHubStrategy = require('passport-github').Strategy;
const api = require('../api');
const config = require('config');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const model = require('../model').waterline;

passport.use(new GitHubStrategy({
        clientID: config.get('passport.github.clientID'),
        clientSecret: config.get('passport.github.clientSecret'),
        callbackURL: config.get('passport.github.callbackURL')
    },
    function (accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

module.exports = {
    github: {
        index: function *() {
            yield passport.authenticate('github');
        },
        callback: function *() {
            const ctx = this;
            yield passport.authenticate('github', function *(err, profile, info, status) {
                const json = profile._json;
                let res = yield api.user.read({githubId: profile.id});
                if (_.isEmpty(res.data)) {
                    res = yield api.user.add({
                        githubId: profile.id,
                        username: profile.username,
                        email: json['email'],
                        avatar: json['avatar_url']
                    });
                }

                // set cookie
                const user = res.data;
                const expires = moment().add(30, 'days').valueOf();
                const access_token = jwt.sign({iss: user.id, expires: expires}, config.get('token.cert'));

                // save token to db
                const data = yield model.collections.token.create({access_token: access_token, expires: expires});
                ctx.cookies.set('authorization', access_token);

                ctx.redirect('/');
            });
        }
    }
};