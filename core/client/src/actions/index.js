
import _ from 'lodash';
import { createAction } from 'redux-actions';

export const setUser = createAction('set user');
export const setPost = createAction('set post');
export const addPost = createAction('add post');
export const selectPost = createAction('select post');
export const editPost = createAction('edit post');
export const savePosts = createAction('save posts', (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
    return posts;
});