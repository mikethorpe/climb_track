import rootReducer from '../reducers';
import { configureStore } from '@reduxjs/toolkit';

export const createStore = (preloadedState) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
};
export default createStore;
