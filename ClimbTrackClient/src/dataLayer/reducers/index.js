import { combineReducers } from 'redux';
import climbingSessionReducer from './climbingSessionReducer';

export default combineReducers({
    climbingSessions: climbingSessionReducer
});