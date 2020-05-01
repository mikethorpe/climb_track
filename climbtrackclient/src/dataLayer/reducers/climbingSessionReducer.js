import { CREATE_CLIMBING_SESSION, SET_CLIMBING_SESSIONS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_CLIMBING_SESSION:
            return [
                ...state,
                action.payload
            ];
        case SET_CLIMBING_SESSIONS:
            return [
                ...action.payload
            ];
        default:
            return [
                ...state
            ];
    }
};