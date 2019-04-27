import { FETCH_EXERCISES, CREATE_EXERCISE } from '../actions/types';

const initialState = {
    items: [],
    item: {}
};

export default function(state = initialState, action) {
 switch(action.type){
    case FETCH_EXERCISES:
        return {
            ...state,
            exercises: action.payload
        }
    default:
        return state;
}
}