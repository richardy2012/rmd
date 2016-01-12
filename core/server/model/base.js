
"use strict";

var uuid = require('node-uuid');
var config = require('config');

module.exports = {
    connection: config.get('engine'),
    attributes: {
        uuid: {
            type: 'string',
            unique: true,
            uuidv4: true,
            defaultsTo: function() {
                return uuid.v4();
            }
        }
    }
};