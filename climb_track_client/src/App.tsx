import React, { Component } from 'react';
import './actions/Exercises';
// import { GetExercise, GetExercises, CreateExercise, UpdateExercise, DeleteExercise } from './actions/Exercises';
import { Provider } from 'react-redux';
import store from './store';
import Exercises from './components/Exercises';
import ExerciseForm from './components/ExerciseForm'; 

class App extends Component {
  
  // testCreateExercise(){
  //   let exercise = CreateExercise(
  //     {
  //       Name: 'Awesome exercise',
  //       Reps: 1,
  //       Sets: 3
  //     }
  //   );
  //   console.log(exercise);
  // }

  // testGetExercises(){
  //   let exercises = GetExercises();
  //   console.log(exercises);
  // }

  // testGetExercise() {
  //   let id = 1;
  //   let exercise = GetExercise(id);
  //   console.log(exercise);
  // }

  // testUpdateExercise() {
  //   let updateObject = {
  //     ID : 1,
  //     Name: "Super cool exercise",
  //     Reps: 1,
  //     Sets: 4
  //   };
  //   let updatedExercise = UpdateExercise(updateObject.ID, updateObject);
  //   console.log(updatedExercise);
  // }

  // testDeleteExercise() {
  //   let id = 1;
  //   DeleteExercise(id);
  // }

  
  render() {
    return (
      
      <Provider store={store}>
        <ExerciseForm/>
        <Exercises/>
      </Provider>

       // {/* <div className="App">
          // <button onClick={this.testCreateExercise}>CreateExercise</button>
          // <button onClick={this.testGetExercises}>GetExercises</button>
          // <button onClick={this.testGetExercise}>GetExercise</button>
          // <button onClick={this.testUpdateExercise}>UpdateExercise</button>
          // <button onClick={this.testDeleteExercise}>DeleteExercise</button>
        // </div> */}
    );
  }
}

export default App;
