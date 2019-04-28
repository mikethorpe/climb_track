import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import ExerciseForm from '../components/ExerciseForm';
import Exercises from '../components/Exercises';
import ProviderWrapper from '../store/provider';
import Store from '../store/index';
storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));


storiesOf('ExerciseForm', module)
  .add('default', () => (
    <ProviderWrapper store={Store}>
      <ExerciseForm/>
    </ProviderWrapper>
  ))

  storiesOf('Exercises', module)
  .add('default', () => (
    <ProviderWrapper store={Store}>
      <Exercises/>
    </ProviderWrapper>
  ))