
import React from 'react';
import { LogonForm } from './LogonForm';
import { storiesOf } from '@storybook/react';
import Provider from '../../../dataLayer/store/providerWrapper';
import createStore from '../../../dataLayer/store/store';
import StoryRouter from 'storybook-react-router';

const store = createStore({});

storiesOf('LogonForm', module)
    .addDecorator(StoryRouter())
    .add('Default', () => (
        <Provider store={store}>
            <LogonForm />
        </Provider>
    ));