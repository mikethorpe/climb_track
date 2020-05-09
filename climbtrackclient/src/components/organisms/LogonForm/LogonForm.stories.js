
import React from 'react';
import { LogonForm } from './LogonForm';
import { storiesOf } from '@storybook/react';
import Provider from '../../../dataLayer/store/providerWrapper';
import createStore from '../../../dataLayer/store/store';

const store = createStore({});

storiesOf('LogonForm', module)
    .add('Default', () => (
        <Provider store={store}>
            <LogonForm />
        </Provider>
    ));