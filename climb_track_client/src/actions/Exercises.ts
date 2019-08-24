import axios from 'axios';
const baseDomain  = 'https://localhost:44380';
const baseExercisesApi = '/api/exercises';
import IExercise from '../interfaces/IExercise';

interface IExerciseId extends IExercise {
  ID : Number
}

export const CreateExercise = async (exercise: IExercise) => {
  try {
    const response = await axios.post(`${baseDomain}${baseExercisesApi}`, exercise);
    return response.data;
  } catch (error) {
    console.log(error);
  };
}

export const GetExercises = async () => {
    try {
        const response = await axios.get(`${baseDomain}${baseExercisesApi}`);
        return response.data;
      } catch (error) {
        console.log(error);
    };
}

export const GetExercise = async (Id: Number) => {
  try {
    const response = await axios.get(`${baseDomain}${baseExercisesApi}/${Id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  };
}

export const UpdateExercise = async (id : Number, exercise: IExerciseId) => {
  try {
    const response = await axios.put(`${baseDomain}${baseExercisesApi}/${exercise.ID}`, exercise);
    return response.data;
  } catch (error) {
    console.log(error);
  };
}

export const DeleteExercise = async (Id: Number) => {
  try {
    const response = await axios.delete(`${baseDomain}${baseExercisesApi}/${Id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  };
}
