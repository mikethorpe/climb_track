import { configureStore } from '@reduxjs/toolkit';
import climbingSessions from '../reducers/climbingSessionReducer';

export const createStore = (preloadedState) => {
    return configureStore({
        reducer: {
            climbingSessions
        },
        preloadedState
    });
};
export default createStore;
