import _ from 'lodash';
import $ from 'jquery';
import { createAction } from 'redux-actions';

export const setUser = createAction('set user');
export const setPost = createAction('set post');
export const addPost = createAction('add post');
export const selectPost = createAction('select post');
export const editPost = createAction('edit post');
export const savePosts = createAction('save posts', (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
    const post = _.find(posts, {selected: true}) || posts[0];
    var index = _.indexOf(posts, post);

    return $.post(`/api/v1/post/${post.id}`, post).then((res) => {
        var data = res.data;
        posts.splice(index, 1, data);

        return posts;
    });
});