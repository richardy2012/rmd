
"use strict";

var path = require('path');
var mysql = require('sails-mysql');

module.exports = {
    engine: 'mysql',
    database: {
        adapters: {
            mysql: mysql
        },
        connections: {
            mysql: {
                adapter: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                database: 'rmd'
            }
        },

        defaults: {
            migrate: 'alter'
        }

    }
};