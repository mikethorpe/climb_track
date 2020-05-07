import { configureStore } from '@reduxjs/toolkit';
import climbingSessions from '../reducers/climbingSessionReducer';
import styles from '../reducers/stylesReducer';
import authentication from '../reducers/authenticationReducer';

export const createStore = (preloadedState) => {
    return configureStore({
        reducer: {
            climbingSessions,
            styles,
            authentication
        },
        preloadedState
    });
};
export default createStore;
