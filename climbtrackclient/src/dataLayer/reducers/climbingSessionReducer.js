import { CREATE_CLIMBING_SESSION, SET_CLIMBING_SESSIONS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_CLIMBING_SESSION:
            console.log(`climbingSessionReducer: creating climbing session`)
            return [
                ...state,
                action.payload
            ];
        case SET_CLIMBING_SESSIONS:
            console.log(`climbingSessionReducer: setting climbing sessions`)
            return [
                ...action.payload
            ];
        default:
            return [
                ...state
            ];
    }
}