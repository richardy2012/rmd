
"use strict";

var path = require('path');
var mysql = require('sails-mysql');
var config = require('config');

module.exports = {
    name: 'rmd',
    front: {
        assets: path.join(__dirname, '../core/client/dist'),
        template: path.join(__dirname, '../core/client/dist')
    },
    engine: 'disk',
    database: {
        adapters: {
            disk: require('sails-disk')
        },
        connections: {
            disk: {
                adapter: 'disk'
            }
        },
        defaults: {
            migrate: 'alter'
        }
    },
    token: {
        expires: 30
    },
    passport: {
        github: {
            callbackURL: 'http://localhost:3000/auth/github/callback'
        }
    },
    upload: {
        directory: path.join(__dirname, '../core/client/dist')
    }
};