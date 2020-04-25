import { configureStore } from '@reduxjs/toolkit';
import climbingSessionReducer from '../reducers/climbingSessionReducer'
export const createStore = (preloadedState) => {
    return configureStore({
        reducer: {
            climbingSessions: climbingSessionReducer
        },
        preloadedState
    });
};
export default createStore;
