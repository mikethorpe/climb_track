import { FETCH_EXERCISES, CREATE_EXERCISE } from '../actions/types';
import axios from 'axios';

const baseDomain  = 'https://localhost:44380';
const baseExercisesApi = '/api/exercises';

export const fetchExercises = () => dispatch => {
    console.log('Fetching exercises')
    axios.get(`${baseDomain}${baseExercisesApi}`)
    .then(exericses => {
        console.log(exericses.data);
        dispatch({
        type: FETCH_EXERCISES,
        payload: exericses.data
        });
    });
};

