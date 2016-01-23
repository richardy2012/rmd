
import {handleActions} from 'redux-actions';
import uuid from 'node-uuid';
import _ from 'lodash';
import readme from './readme.txt';

const initialState = JSON.parse(localStorage.getItem('posts')) || [{
        id: uuid.v4(),
        title: ``,
        markdown: readme,
        html: ``,
        selected: true
    }];

export default handleActions({
    'set post' (state, action) {
        return _.isEmpty(action.payload) ? _.cloneDeep(state) : action.payload;
    },
    'add post' (state, action) {
        return [...state, {
            id: uuid.v4(),
            title: ``,
            markdown: ``,
            html: ``
        }];
    },
    'select post' (state, action) {
        return state.map((post) => {
            post.selected = post.id === action.payload;
            return post;
        });
    },
    'edit post'(state, action){
        return state.map((post) => {
            return post.id === action.payload.id ? action.payload : post;
        });
    },
    'save post' (state, action){
        return action.payload;
    },
    'delete post'(state, action){
        return state.filter((post) => {
            return post.id !== action.payload
        });
    }
}, initialState);