
"use strict";

import { combineReducers } from 'redux';
import posts from './posts';
import medias from './medias';
import user from './user';

const rootReducer = combineReducers({
    posts,
    medias,
    user
});

export default rootReducer;