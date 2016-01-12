
"use strict";

module.exports = {
    identity: 'media',
    attributes: {
        name: {
            type: 'string'
        },
        type: {
            type: 'string',
            enum: ['.png', '.jpg', '.gif', '.mp3']
        },
        size: {
            type: 'integer' // kb
        },
        description: {
            type: 'string'
        },
        url: {
            type: 'string',
            unique: true
        },
        owner: {
            model: 'user'
        }
    }
};