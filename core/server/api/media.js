
"use strict";

const _ = require('lodash');
const model = require('../model').waterline;

module.exports = {
    browse: function (options){
        return function *(){
            options = _.merge({offset: 0, limit: 15}, options);
            const user = this.state.user;
            const data = yield model.collections.media.find().where({owner: user.id}).skip(options.offset).limit(options.limit);

            return {ret: 0, msg: 'ok', data: data};
        };
    },
    read: function (options){
        return function *(){
            const id = options.id;
            const user = this.state.user;
            const data = yield model.collections.media.findOne().where({id: id, owner: user.id});
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    add: function (object, options){
        return function *() {
            const user = this.state.user;
            object.owner = user.id;
            const data = yield model.collections.media.create(object);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    edit: function (object, options){
        return function *() {
            const id = options.id;
            const user = this.state.user;

            // 看看是不是属于你的
            const media = yield model.collections.media.findOne().where({id: id});
            if (media.owner != user.id) {
                return {ret: 403, msg: 'forbidden', data: null};
            }

            const data = yield model.collections.media.update({id: id}, object);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    destroy: function (options){
        return function *() {
            const id = options.id;
            const user = this.state.user;

            // 看看是不是属于你的
            const media = yield model.collections.media.findOne().where({id: id});
            if (media.owner != user.id) {
                return {ret: 403, msg: 'forbidden', data: null};
            }

            const data = yield model.collections.media.destroy({id: id});
            return {ret: 0, msg: 'ok', data: data};
        };
    }
};