
"use strict";

var path = require('path');

module.exports = {
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
    }
};