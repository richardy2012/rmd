"use strict";

const _ = require('lodash');
const model = require('../model').waterline;

module.exports = {
    browse: function (options) {
        return function *() {
            options = _.merge({offset: 0, limit: 15}, options);
            const user = this.state.user;

            const data = yield model.collections.post.find({owner: user.id}).skip(options.offset).limit(options.limit);

            return {ret: 0, msg: 'ok', data: data};
        };
    },
    read: function (options) {
        return function *() {
            const id = options.id;
            const user = this.state.user;
            const data = yield model.collections.post.findOne({id: id, owner: user.id});

            return {ret: 0, msg: 'ok', data: data};
        };
    },
    add: function (object, options) {
        return function *() {

            const user = this.state.user;
            object.owner = user.id;
            const data = yield model.collections.post.create(object);

            return {ret: 0, msg: 'ok', data: data};
        };
    },
    edit: function (object, options) {
        return function *() {
            const id = options.id;
            const user = this.state.user;

            // 看看是不是属于你的
            const post = yield model.collections.post.findOne().where({id: id});
            if (post.owner != user.id) {
                return {ret: 403, msg: 'forbidden', data: null};
            }

            object.owner = user.id;
            const data = yield model.collections.post.update({id: id}, object);

            return {ret: 0, msg: 'ok', data: data[0]};
        };
    },
    addOrEdit: function (object, options) {
        return function *() {
            const id = options.id;
            const user = this.state.user;

            // 存不存在
            let post = yield model.collections.post.findOne().where({id: id});
            if (!post) {
                object.owner = user.id;
                post = yield model.collections.post.create(object);
                return {ret: 0, msg: 'ok', data: post};
            }
            else {
                // 看看是不是属于你的
                if (post.owner != user.id) {
                    return {ret: 403, msg: 'forbidden', data: null};
                }
                object.owner = user.id;
                const data = yield model.collections.post.update({id: id}, object);

                return {ret: 0, msg: 'ok', data: data[0]};
            }
        };
    },
    destroy: function (options) {
        return function *() {
            const id = options.id;
            const user = this.state.user;

            // 看看是不是属于你的
            const post = yield model.collections.post.findOne().where({id: id});
            if (post.owner != user.id) {
                return {ret: 403, msg: 'forbidden', data: null};
            }

            const data = yield model.collections.post.destroy({id: id});
            return {ret: 0, msg: 'ok', data: data};
        };
    }
};