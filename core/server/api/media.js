
"use strict";

var _ = require('lodash');
var model = require('../model').waterline;

module.exports = {
    browse: function (options){
        return function *(){
            options = _.merge({offset: 0, limit: 15}, options);
            var user = this.state.user;
            var data = yield model.collections.media.find().where({owner: user.id}).skip(options.offset).limit(options.limit);

            return {ret: 0, msg: 'ok', data: data};
        };
    },
    read: function (options){
        return function *(){
            var id = options.id;
            var user = this.state.user;
            var data = yield model.collections.media.findOne().where({id: id, owner: user.id});
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    add: function (object, options){
        return function *() {
            var user = this.state.user;
            object.owner = user.id;
            var data = yield model.collections.media.create(object);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    edit: function (object, options){
        return function *() {
            var id = options.id;
            var user = this.state.user;

            // 看看是不是属于你的
            var media = yield model.collections.media.findOne().where({id: id});
            if (media.owner != user.id) {
                return {ret: 403, msg: 'forbidden', data: null};
            }

            var data = yield model.collections.media.update({id: id}, object);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    destroy: function (options){
        return function *() {
            var id = options.id;
            var user = this.state.user;

            // 看看是不是属于你的
            var media = yield model.collections.media.findOne().where({id: id});
            if (media.owner != user.id) {
                return {ret: 403, msg: 'forbidden', data: null};
            }

            var data = yield model.collections.media.destroy({id: id});
            return {ret: 0, msg: 'ok', data: data};
        };
    }
};