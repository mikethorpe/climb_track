import { SET_AUTHENTICATED, SHOW_ERROR } from '../actions/types';

const initialState = {
    authenticated: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.payload
            };
        case SHOW_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return {
                ...state
            };
    }
};