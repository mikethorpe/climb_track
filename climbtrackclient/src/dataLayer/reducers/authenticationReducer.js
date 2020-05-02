import { SET_AUTHENTICATED } from '../actions/types';

const initialState = {

};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.payload
            };
        default:
            return {
                ...state
            };
    }
};