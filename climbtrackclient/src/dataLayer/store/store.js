import { configureStore } from '@reduxjs/toolkit';
import climbingSessions from '../reducers/climbingSessionReducer';
import styles from '../reducers/stylesReducer';

export const createStore = (preloadedState) => {
    return configureStore({
        reducer: {
            climbingSessions,
            styles
        },
        preloadedState
    });
};
export default createStore;
