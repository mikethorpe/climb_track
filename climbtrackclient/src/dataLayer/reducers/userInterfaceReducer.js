import { SET_SHOW_CLIMBLOGGER_MODAL } from '../actions/types';

const initialState = {
    climbLoggerModalDisplayed: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SHOW_CLIMBLOGGER_MODAL:
            return {
                ...state,
                climbLoggerModalDisplayed: action.payload
            };
        default:
            return {
                ...state
            };
    }
};