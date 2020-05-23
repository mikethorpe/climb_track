import React from 'react';
import { storiesOf } from '@storybook/react';
import { SessionItems } from './SessionItems';
import createStore from '../../../dataLayer/store/store';
import Provider from '../../../dataLayer/store/providerWrapper';

const storeWithClimbingSessions = {
    climbingSessions: [
        {
            id: 1,
            dateTime: '24th April',
            maxGrade: '7b',
            climbs: [
                { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 2, grade: '7b', style: { id: 2, description: 'Slab' } }
            ]
        },
        {
            id: 2,
            dateTime: '28th April',
            maxGrade: '9b++',
            climbs: [
                { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 2, grade: '9b++', style: { id: 2, description: 'Slab' } }
            ]
        }
    ]
};

const store = createStore(storeWithClimbingSessions);
storiesOf('SessionItems', module)
    .add('Default', () => (
        <Provider store={store}>
            <SessionItems />
        </Provider>
    ));