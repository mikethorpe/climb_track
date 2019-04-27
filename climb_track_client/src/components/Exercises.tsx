import React, {Component} from 'react';
import {connect} from 'react-redux'
import { fetchExercises } from '../actions/ExerciseActions';

export interface ExerciseProps {
    fetchExercises(),
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
        
    render() {
        const listExercises = this.props.exercises.map(exercise => <div>Name: {exercise.name}, Reps: {exercise.reps}, Sets: {exercise.sets}, Notes: {exercise.notes} </div>);
        return(
            <>
                <h1>A list of exercises</h1>
                {listExercises}
            </>
        );
    }
}

const mapStateToProps = state => ({
    exercises: state.exercises.items,
    newExercise: state.exercises.item
});

export default connect(mapStateToProps, {fetchExercises})(Exercises);