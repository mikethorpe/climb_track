import { SET_STYLES } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_STYLES:
            console.log(`payload ${action.payload}`);
            return [
                ...action.payload
            ];
        default:
            return [
                ...state
            ];
    }
};