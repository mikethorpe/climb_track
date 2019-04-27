import { FETCH_EXERCISES, CREATE_EXERCISE } from '../actions/types';
import axios from 'axios';
const baseDomain  = 'https://localhost:44380';
const baseExercisesApi = '/api/exercises';

export const fetchExercises = dispatch => {
    axios.get(`${baseDomain}${baseExercisesApi}`)
    .then(exericses => 
        dispatch({
        type: FETCH_EXERCISES,
        payload: exericses
    }));
};

