import { FETCH_EXERCISES, CREATE_EXERCISE, DELETE_EXERCISE } from '../actions/types';
import axios from 'axios';
import IExercise from '../interfaces/IExercise';

const baseDomain  = 'https://localhost:44380';
const baseExercisesApi = '/api/exercises';

export const fetchExercises = () => dispatch => {
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
    .then(exercise => 
        dispatch({
            type: CREATE_EXERCISE,
            payload: exercise.data
        }));
};

export const deleteExercise = (Id: Number) => dispatch => {
    console.log(`action deleting exercise ${Id}`);
      axios.delete(`${baseDomain}${baseExercisesApi}/${Id}`)
      .then(() =>
        dispatch({
            type: DELETE_EXERCISE,
            payload: Id
        }));
  };