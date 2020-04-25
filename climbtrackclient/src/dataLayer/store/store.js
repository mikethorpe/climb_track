import { configureStore } from '@reduxjs/toolkit';
import climbingSessions from '../reducers/climbingSessionReducer';

export const createStore = (preloadedState) => {
    console.dir(preloadedState);
    return configureStore({
        reducer: {
            climbingSessions
        },
        preloadedState
    });
};
export default createStore;
