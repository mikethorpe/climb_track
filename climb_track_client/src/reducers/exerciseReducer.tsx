import { FETCH_EXERCISES, CREATE_EXERCISE } from '../actions/types';

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
    default:
        return state;
}
}