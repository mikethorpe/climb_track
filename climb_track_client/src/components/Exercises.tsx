import React, {Component} from 'react';
import {connect} from 'react-redux'
import { fetchExercises, deleteExercise } from '../actions/ExerciseActions';

export interface ExerciseProps {
    fetchExercises(),
    deleteExercise(id: Number),
    exercises,
    newExercise
}

class Exercises extends Component<ExerciseProps> {
    constructor(props: ExerciseProps) {
        super(props);
    }
    
    componentWillMount() {
        this.props.fetchExercises();
    };
    
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.props.exercises.unshift(nextProps.newExercise);
        }
    }
    

    handleDeleteExercise = (id) => {
        console.log(id);
        console.log(deleteExercise(id));
        this.props.deleteExercise(id);
    }
        
    render() {
        const listExercises = this.props.exercises.map(exercise => 
                <li key={exercise.id}>ID {exercise.id} Name: {exercise.name}, Reps: {exercise.reps}, Sets: {exercise.sets}, Notes: {exercise.notes} 
            <button onClick={() => this.handleDeleteExercise(exercise.id)}>Delete</button>
            </li>
        );
        return(
            <>
                <h1>A list of exercises</h1>
                <ul>
                    {listExercises}
                </ul>
            </>
        );
    }
}

const mapStateToProps = state => ({
    exercises: state.exercises.items,
    newExercise: state.exercises.item
});

export default connect(mapStateToProps, {fetchExercises, deleteExercise})(Exercises);