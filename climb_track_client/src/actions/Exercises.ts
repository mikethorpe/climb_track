import axios from 'axios';
const baseDomain  = 'https://localhost:44380';
const baseExercisesApi = '/api/exercises';

// Add some interfaces here

interface IExerciseId extends IExercise {
  Id : string
}

interface IExercise {
  Name: string,
  Reps: Number,
  Sets: Number
}

export const CreateExercise = async (exercise: IExercise) => {
  try {
    let stringifiedExercise = JSON.stringify(exercise);
    console.log(stringifiedExercise); 
    return await axios.post(`${baseDomain}${baseExercisesApi}`, exercise);
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
    return await axios.get(`${baseDomain}${baseExercisesApi}/${Id}`);
  } catch (error) {
    console.log(error);
  };
}

export const UpdateExercise = async (exercise: IExerciseId) => {
  try {
    let stringifiedExercise = JSON.stringify(exercise);
    return await axios.put(`${baseDomain}${baseExercisesApi}/${exercise.Id}`, stringifiedExercise);
  } catch (error) {
    console.log(error);
  };
}

export const DeleteExercise = async (Id: Number) => {
  try {
    return await axios.delete(`${baseDomain}${baseExercisesApi}/${Id}`);
  } catch (error) {
    console.log(error);
  };
}
