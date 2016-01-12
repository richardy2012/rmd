
"use strict";

module.exports = {
    identity: 'post',
    attributes: {
        title: {
            type: 'string',
            index: true
        },
        markdown: {
            type: 'text'
        },
        html: {
            type: 'text'
        },
        status: {
            type: 'string',
            enum: ['draft', 'publish'],
            defaultsTo: 'draft'
        },
        visibility: {
            type: 'string',
            enum: ['private', 'password', 'public'],
            defaultsTo: 'public'
        },
        owner: {
            model: 'user'
        }
    }
};