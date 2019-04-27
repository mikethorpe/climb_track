import React, {Component} from 'react';
import {connect} from 'react-redux'
import { fetchExercises } from '../actions/exerciseActions';
import PropTypes from 'prop-types';

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
        console.log('component will mount');
        this.props.fetchExercises();
    };

    componentDidMount() {
        console.log(`component did mount: props: ${this.props.exercises}`);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log(`will receive props ${nextProps.name}`)
        if (nextProps) {
            this.props.exercises.unshift(nextProps.newExercise);
        }
    } 

    componentDidUpdate() {
        console.log(`DID UPDATE: ${this.props.newExercise.Name}`);
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