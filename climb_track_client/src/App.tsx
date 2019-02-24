import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './actions/Exercises';
import { GetExercise, GetExercises, CreateExercise } from './actions/Exercises';

class App extends Component {
  
  testGetExercises(){

  }

  testCreateExercise(){
    CreateExercise(
      {
        Name: 'Awesome exercise',
        Reps: 1,
        Sets: 3
      }
    ) 
  }
      render() {
    return (
      <div className="App">
        <button onClick={this.testCreateExercise}>CreateExercise</button>
        <button onClick={this.testGetExercises}>GetExercises</button>
        <button onClick={this.testGetExercises}>GetExercise</button>
        <button onClick={this.testGetExercises}>UpdateExercise</button>
        <button onClick={this.testGetExercises}>DeleteExercise</button>
      </div>
    );
  }
}

export default App;
