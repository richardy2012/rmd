
"use strict";

import {handleActions} from 'redux-actions';

const initialState = null;
export default handleActions({
    'set user' (state, action){
        return action.payload;
    }
}, initialState);