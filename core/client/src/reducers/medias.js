
"use strict";

import {handleActions} from 'redux-actions';

const initialState = [];

export default handleActions({
    'add media' (state, action) {
        return [...state, action.payload];
    }
}, initialState);