"use strict";

var _ = require('lodash');
var passport = require('koa-passport');
var GitHubStrategy = require('passport-github').Strategy;
var api = require('../api');
var config = require('config');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var model = require('../model').waterline;

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
            var ctx = this;
            yield passport.authenticate('github', function *(err, profile, info, status) {
                var json = profile._json;
                var res = yield api.user.read({githubId: profile.id});
                if (_.isEmpty(res.data)) {
                    res = yield api.user.add({
                        githubId: profile.id,
                        username: profile.username,
                        email: json['email'],
                        avatar: json['avatar_url']
                    });
                }

                // set cookie
                var user = res.data;
                var expires = moment().add(30, 'days').valueOf();
                var access_token = jwt.sign({iss: user.id, expires: expires}, config.get('token.cert'));

                // save token to db
                var data = yield model.collections.token.create({access_token: access_token, expires: expires});
                ctx.cookies.set('authorization', access_token);

                ctx.redirect('/');
            });
        }
    }
};