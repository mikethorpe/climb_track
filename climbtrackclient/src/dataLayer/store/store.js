import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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
        preloadedState,
        middleware: [...getDefaultMiddleware()],
    });
};
export default createStore;
