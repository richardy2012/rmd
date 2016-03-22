
"use strict";

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