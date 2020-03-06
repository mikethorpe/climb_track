import {configureStore} from 'redux-starter-kit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};
const middleWare = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
    preloadedState: initialState
});

export default store;
