import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './actions/Exercises';
import { GetExercise, GetExercises, CreateExercise, UpdateExercise, DeleteExercise } from './actions/Exercises';

class App extends Component {
  
  testCreateExercise(){
    let exercise = CreateExercise(
      {
        Name: 'Awesome exercise',
        Reps: 1,
        Sets: 3
      }
    );
    console.log(exercise);
  }

  testGetExercises(){
    let exercises = GetExercises();
    console.log(exercises);
  }

  testGetExercise() {
    let id = 1;
    let exercise = GetExercise(id);
    console.log(exercise);
  }

  testUpdateExercise() {
    let updateObject = {
      ID : 1,
      Name: "Super cool exercise",
      Reps: 1,
      Sets: 4
    };
    let updatedExercise = UpdateExercise(updateObject.ID, updateObject);
    console.log(updatedExercise);
  }

  testDeleteExercise() {
    let id = 1;
    DeleteExercise(id);
  }

  
  render() {
    return (
      <div className="App">
        <button onClick={this.testCreateExercise}>CreateExercise</button>
        <button onClick={this.testGetExercises}>GetExercises</button>
        <button onClick={this.testGetExercise}>GetExercise</button>
        <button onClick={this.testUpdateExercise}>UpdateExercise</button>
        <button onClick={this.testDeleteExercise}>DeleteExercise</button>
      </div>
    );
  }
}

export default App;
