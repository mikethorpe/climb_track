import React from 'react';
import { storiesOf } from '@storybook/react';
import ClimbLog from './ClimbLog';
import createStore from '../../../dataLayer/store/store';
import Provider from '../../../dataLayer/store/providerWrapper';

const storeWithClimbingSessions = {
    climbingSessions: [
        {
            id: 1,
            dateTime: '24th April',
            maxGrade: '7b',
            log: [
                { id: 1, grade: '7a', style: 'Overhanging' },
                { id: 2, grade: '7b', style: 'Slab' }
            ]
        },
        {
            id: 2,
            dateTime: '28th April',
            maxGrade: '9b++',
            log: [
                { id: 1, grade: '7a', style: 'Overhanging' },
                { id: 2, grade: '9b++', style: 'Arete' }
            ]
        }
    ]
};

const store = createStore(storeWithClimbingSessions);
storiesOf('ClimbLog', module)
    .add('Default', () => (
        <Provider store={store}>
            <ClimbLog />
        </Provider>
    ));