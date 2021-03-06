
import React from 'react';
import { ClimbLogger } from './ClimbLogger';
import Provider from '../../../dataLayer/store/providerWrapper';
import { storiesOf } from '@storybook/react';
import createStore from '../../../dataLayer/store/store';

const store = {
    climbingSessions: [
        { id: 1, dateTime: '24th April', grade: '7a', style: { id: 1, description: 'Overhang' } },
        { id: 2, dateTime: '22th April', grade: '7b', style: { id: 2, description: 'Slab' } }
    ],
    styles: [
        { id: 1, description: 'Overhang' },
        { id: 2, description: 'Slab' }
    ],
    userInterface: {
        climbLoggerModalDisplayed: true
    }
};

const defaultStore = createStore(store);

storiesOf('ClimbLogger', module)
    .add('Default', () => (
        <Provider store={defaultStore}>
            <ClimbLogger />
        </Provider >
    ));