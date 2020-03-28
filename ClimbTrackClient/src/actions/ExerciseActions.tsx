import { FETCH_EXERCISES, CREATE_EXERCISE, DELETE_EXERCISE } from '../actions/types';
import axios from 'axios';
import IExercise from '../interfaces/IExercise';
import { debug } from 'util';

const baseDomain  = 'https://localhost:5001';
const baseExercisesApi = '/api/exercise';

export const fetchExercises = () => dispatch => {
    axios.get(`${baseDomain}${baseExercisesApi}`)
    .then(exericses => {
        console.log(exericses.data);
        dispatch({
        type: FETCH_EXERCISES,
        payload: exericses.data
        });
    })
    .catch(error => {
        console.error(`Unable to fetch exercises, ${error}`)
    });
};

export const createExercise = (exercise: IExercise) => dispatch => {
    axios.post(`${baseDomain}${baseExercisesApi}`, exercise)
    .then(exercise => 
        dispatch({
            type: CREATE_EXERCISE,
            payload: exercise.data
        }))
    .catch(error => {
        console.error(`Unable to create exercise, ${error}`)
    });
};

export const deleteExercise = (Id: Number) => dispatch => {
    console.log(`action deleting exercise ${Id}`);
      axios.delete(`${baseDomain}${baseExercisesApi}/${Id}`)
      .then(() =>
        dispatch({
            type: DELETE_EXERCISE,
            payload: Id
        }))
    .catch(error => {
        console.error(`Unable to delete exercise, ${error}`)
    });
  };