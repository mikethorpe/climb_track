
import React from 'react';
import LogonForm from './LogonForm';
import { storiesOf } from '@storybook/react';

storiesOf('LogonForm', module)
    .add('Default', () => (
        <LogonForm />
    ));