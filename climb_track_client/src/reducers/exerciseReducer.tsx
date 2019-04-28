import { FETCH_EXERCISES, CREATE_EXERCISE, DELETE_EXERCISE } from '../actions/types';

const initialState = {
    items: [],
    item: {}
};

export default function(state = initialState, action) {
    switch(action.type){
    case FETCH_EXERCISES:
        console.log('reducer fetching exercises')
        return {
            ...state,
            items: action.payload
        }
    case CREATE_EXERCISE:
        console.log(`exercise reducer posting actions ${action.payload}`)
        return {
            ...state,
            item: action.payload
        }
    case DELETE_EXERCISE:
        console.log(`exercise deleted with id ${action.payload}`);
        return {
            ...state,
            ...state.items.slice(0, action.payload),
            ...state.items.slice(action.payload + 1)
        }
    default:
        return state;
}
}