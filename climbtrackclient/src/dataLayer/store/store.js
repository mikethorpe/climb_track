import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import climbingSessions from '../reducers/climbingSessionReducer';
import styles from '../reducers/stylesReducer';
import authentication from '../reducers/authenticationReducer';
import userInterface from '../reducers/userInterfaceReducer';

export const createStore = (preloadedState) => {
    return configureStore({
        reducer: {
            climbingSessions,
            styles,
            authentication,
            userInterface
        },
        preloadedState,
        middleware: [...getDefaultMiddleware()],
    });
};
export default createStore;
