import { createAction } from 'redux-actions';
import $ from 'jquery';

export const initPost = createAction('init post');
export const addPost = createAction('add post');
export const editPost = createAction('edit post');
export const savePost = createAction('save post', (post) => {
    if (post.unSave) {
        delete post.id;
        delete post.unSave;
        return $.post(`/api/v1/post`, post).then((res) => {
            return $.get(`/api/v1/post`);
        }).then((res) => {
            return res.data;
        });
    }
    else {
        return $.ajax({
            type: 'PUT',
            dataType: 'json',
            url: `/api/v1/post/${post.id}`,
            data: post
        }).then((res) => {
            return $.get(`/api/v1/post`);
        }).then((res) => {
            return res.data;
        });
    }
});
export const addMedia = createAction('add media', (img) => {

});