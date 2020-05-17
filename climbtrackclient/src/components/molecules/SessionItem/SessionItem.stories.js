import React from 'react';
import SessionItem from './SessionItem';
import { storiesOf } from '@storybook/react';
import createStore from '../../../dataLayer/store/store';
import Provider from '../../../dataLayer/store/providerWrapper';

const storeWithClimbingSessions = {
    climbingSessions: []
};

const climbingSession = {
    id: 2,
    dateTime: '28th April',
    maxGrade: '9b++',
    climbs: [
        { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
        { id: 2, grade: '9b++', style: { id: 2, description: 'Slab' } }
    ]
};

const store = createStore(storeWithClimbingSessions);

storiesOf('SessionItem', module)
    .add('Default', () => (
        <Provider store={store}>
            <SessionItem climbingSession={climbingSession} />
        </Provider>
    ));