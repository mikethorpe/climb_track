import { SET_SHOW_CLIMBLOGGER_MODAL, SET_SHOW_SESSIONDETAILS_MODAL } from '../actions/types';

const initialState = {
    climbLoggerModalDisplayed: false,
    sessionDetailsModalDisplayed: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SHOW_CLIMBLOGGER_MODAL:
            return {
                ...state,
                climbLoggerModalDisplayed: action.payload
            };
        case SET_SHOW_SESSIONDETAILS_MODAL:
            return {
                ...state,
                sessionDetailsModalDisplayed: action.payload
            };
        default:
            return {
                ...state
            };
    }
};