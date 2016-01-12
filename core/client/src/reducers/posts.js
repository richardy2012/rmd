
import {handleActions} from 'redux-actions';
import uuid from 'node-uuid';
import _ from 'lodash';
import markdown from './markdown.txt';

const initialState = [{
    id: uuid.v4(),
    title: ``,
    markdown: markdown,
    html: ``
}];

export default handleActions({
    'init post' (state, action) {
        return _.isEmpty(action.payload) ? initialState : action.payload;
    },
    'add post' (state, action) {
        return [...state, {
            id: uuid.v4(),
            title: ``,
            markdown: ``,
            html: ``
        }];
    },
    'edit post'(state, action){
        return state.map((post) => {
            return post.id === action.payload.id ? action.payload : post;
        });
    },
    'delete post'(state, action){
        return state.filter((post) => {
            return post.id !== action.payload
        });
    }
}, initialState);