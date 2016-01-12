
"use strict";

var _ = require('lodash');
var model = require('../model').waterline;

module.exports = {
    browse: function (options){
        return function *(){
            options = _.merge({offset: 0, limit: 15}, options);
            var data = yield model.collections.user.find().skip(options.offset).limit(options.limit);

            return {ret: 0, msg: 'ok', data: data};
        };
    },
    read: function (options){
        return function *(){
            var data = yield model.collections.user.findOne().where(options);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    add: function (object, options){
        return function *() {
            var data = yield model.collections.user.create(object);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    edit: function (object, options){
        return function *() {
            var id = options.id;
            var data = yield model.collections.user.update({id: id}, object);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    destroy: function (options){
        return function *() {
            var id = options.id;
            var data = yield model.collections.user.destroy({id: id});
            return {ret: 0, msg: 'ok', data: data};
        };
    }
};