
var _ = require('lodash');
var model = require('../model').waterline;

module.exports = {
    read: function (options){
        return function *(){
            var data = yield model.collections.token.findOne().where(options);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    add: function (object, options){
        return function *() {
            var data = yield model.collections.token.create(object);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    edit: function (object, options){
        return function *() {
            var id = options.id;
            var data = yield model.collections.token.update({id: id}, object);
            return {ret: 0, msg: 'ok', data: data};
        };
    },
    destroy: function (options){
        return function *() {
            var id = options.id;
            var data = yield model.collections.token.destroy({id: id});
            return {ret: 0, msg: 'ok', data: data};
        };
    }
};