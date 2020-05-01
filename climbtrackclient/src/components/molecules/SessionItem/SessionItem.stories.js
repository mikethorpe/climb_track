import React from 'react';
import SessionItem from './SessionItem';
import { storiesOf } from '@storybook/react';

const climbingSession = {
    id: 1,
    dateTime: '24th April',
    maxGrade: '7b',
    climbs: [
        { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
        { id: 2, grade: '7b', style: { id: 1, description: 'Slab' } }
    ]
};

storiesOf('SessionItem', module)
    .add('Default', () => (
        <SessionItem climbingSession={climbingSession} />
    ));