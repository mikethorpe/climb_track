import React from 'react'
import { storiesOf } from '@storybook/react'

import ExerciseForm from '../components/ExerciseForm';

storiesOf('ExerciseForm', module)
  .add('default', () => (
    <ExerciseForm/>
  ))