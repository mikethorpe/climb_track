import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createExercise } from '../actions/ExerciseActions';
import IExercise from '../interfaces/IExercise';

export interface ExerciseFormProps {
    createExercise(exercise: IExercise)
}

class ExerciseForm extends Component<ExerciseFormProps, IExercise> {
    constructor(props){
        super(props);
        this.state = {
            Name:'',
            Reps: undefined,
            Sets: undefined,
            Notes:''
        }
    }

    handleTextFieldChange = name => event => {
        this.setState({
          ...this.state,
          [name]: event.target.value,
        });
      };
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createExercise(this.state);
        event.target.reset();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" onChange={this.handleTextFieldChange('name')}/>
                <input type="number" name="reps" onChange={this.handleTextFieldChange('reps')}/>
                <input type="number" name="sets" onChange={this.handleTextFieldChange('sets')}/>
                <input type="text" name="notes" onChange={this.handleTextFieldChange('notes')}/>
                <input type="submit"></input>
            </form>
        )
    };
} 

export default connect(null, {createExercise})(ExerciseForm);