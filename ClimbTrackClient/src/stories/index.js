import React from 'react';
import { storiesOf } from '@storybook/react';
import ExerciseForm from '../components/ExerciseForm';
import Exercises from '../components/Exercises';
import ProviderWrapper from '../store/provider';
import Store from '../store/index';

storiesOf('ExerciseForm', module)
  .add('default', () => (
    <ProviderWrapper store={Store}>
      <ExerciseForm/>
    </ProviderWrapper>
  ));

  storiesOf('Exercises', module)
  .add('default', () => (
    <ProviderWrapper store={Store}>
      <Exercises/>
    </ProviderWrapper>
  ));