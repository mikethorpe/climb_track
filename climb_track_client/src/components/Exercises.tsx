import React, {Component} from 'react';
import {connect} from 'react-redux'
import { fetchExercises } from '../actions/exerciseActions';
import PropTypes from 'prop-types';

export interface ExerciseProps {
    fetchExercises(),
    exercises
}

class Exercises extends Component<ExerciseProps> {
    constructor(props: ExerciseProps) {
        super(props);
    }
    
    static propTypes = {
        fetchExercises: PropTypes.func.isRequired,
        exercises: PropTypes.array.isRequired
    };

    componentWillMount() {
        this.props.fetchExercises();
    };

    componentDidMount() {
        console.log(`props: ${this.props.exercises}`);
    }
        
    render() {
        // console.log(this.props);
        const listExercises = this.props.exercises.map(exercise => <div>{exercise.name}, </div>);
        return(
            <>
                <h1>A list of exercises</h1>
                {listExercises}
            </>
        );
    }
}


const mapStateToProps = state => ({
    exercises: state.exercises.items
});



export default connect(
    mapStateToProps, 
    {fetchExercises}
)(Exercises);