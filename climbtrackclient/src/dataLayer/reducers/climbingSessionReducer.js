import { CREATE_CLIMBING_SESSION, SET_CLIMBING_SESSIONS, SET_SELECTED_SESSION } from '../actions/types';

const initialState = {
    sessions: [],
    selectedSession: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_CLIMBING_SESSION:
            return {
                ...state,
                sessions: [...state.sessions, action.payload]
            };
        case SET_CLIMBING_SESSIONS:
            return {
                ...state,
                sessions: [...action.payload]
            };
        case SET_SELECTED_SESSION:
            const session = action.payload ? { ...state.sessions.find(s => s.id == action.payload) } : null;
            return {
                ...state,
                selectedSession: session
            }
        default:
            return {
                ...state
            };
    }
};