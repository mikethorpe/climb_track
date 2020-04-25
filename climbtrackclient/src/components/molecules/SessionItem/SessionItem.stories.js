import React from 'react';
import SessionItem from './SessionItem';
import { storiesOf } from '@storybook/react';

const climbingSession = {
    id: 1,
    dateTime: '24th April',
    log: [
        { id: 1, grade: '7a', style: 'Overhanging' },
        { id: 2, grade: '7b', style: 'Slab' }
    ]
};

storiesOf('SessionItem', module)
    .add('Default', () => (
        <SessionItem climbingSession={climbingSession} />
    ));