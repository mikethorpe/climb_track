import { CREATE_CLIMBING_SESSION } from '../actions/types';

const initialState = {
    climbingSessions: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_CLIMBING_SESSION:
            console.log(`climbingSessionReducer: creating climbing session ${action.payload}`)
            return {
                ...state,
                climbingSessions: [...state.climbingSessions, action.payload]
            }
        default:
            return {
                ...state
            }
    }
}
