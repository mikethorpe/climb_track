import { FETCH_EXERCISES, CREATE_EXERCISE } from '../actions/types';
import axios from 'axios';

const baseDomain  = 'https://localhost:44380';
const baseExercisesApi = '/api/exercises';

interface IExercise {
    Name: string,
    Reps: Number,
    Sets: Number
  }


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

export const createExercise = (exercise: IExercise) => dispatch => {
    axios.post(`${baseDomain}${baseExercisesApi}`, exercise)
    .then(exercise => {
        dispatch({
            type: CREATE_EXERCISE,
            payload: exercise.data
        })
    }
    )

    
}

