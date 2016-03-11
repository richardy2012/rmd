
"use strict";

const router = require('koa-router')();
const api = require('../api');

module.exports = function (){

    router.get('/user/me', api.http(api.user.me));
    //router.get('/user', api.http(api.user.browse));
    //router.get('/user/:id', api.http(api.user.read));
    //router.post('/user', api.http(api.user.add));
    //router.put('/user/:id', api.http(api.user.edit));
    //router.delete('/user/:id', api.http(api.user.destroy));

    router.get('/post', api.http(api.post.browse));
    router.get('/post/:id', api.http(api.post.read));
    router.post('/post', api.http(api.post.add));
    router.post('/post/:id', api.http(api.post.addOrEdit));
    router.delete('/post/:id', api.http(api.post.destroy));

    router.get('/media', api.http(api.media.browse));
    router.get('/media/:id', api.http(api.media.read));
    router.delete('/media/:id', api.http(api.media.destroy));

    router.post('/authenticate/token', api.http(api.authenticate.token));
    router.post('/authenticate/revoke', api.http(api.authenticate.revoke));

    router.post('/upload', api.http(api.upload.index));
    router.post('/upload/base64', api.http(api.upload.base64));

    return router;
};