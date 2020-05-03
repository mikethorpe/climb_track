import React from 'react';
import { storiesOf } from '@storybook/react';
import ClimbLog from './ClimbLog';
import createStore from '../../../dataLayer/store/store';
import Provider from '../../../dataLayer/store/providerWrapper';

//TODO: We fetch from the mock API when this component mounts - do we need this store?
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
                { id: 2, grade: '9b++', style: { id: 3, description: 'Arete' } }
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