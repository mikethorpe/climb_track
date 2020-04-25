
import React from 'react';
import ClimbLogger from './ClimbLogger';
import Provider from '../../../dataLayer/store/providerWrapper';
import { storiesOf } from '@storybook/react';
import createStore from '../../../dataLayer/store/store';

const storeWithSessions = {
    climbingSessions: [
        { id: 1, dateTime: '24th April', grade: '7a', style: 'Overhanging' },
        { id: 2, dateTime: '22th April', grade: '7b', style: 'Overhanging' }
    ]
};

const defaultStore = createStore(storeWithSessions);
console.log(`defaultstore ${defaultStore}`);
storiesOf('ClimbLogger', module)
    .add('default', () => (
        <Provider store={defaultStore}>
            <ClimbLogger />
        </Provider >
    ));