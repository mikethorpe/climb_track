import React from 'react';
import { storiesOf } from '@storybook/react';
import { ClimbsTable } from './ClimbsTable';

const climbs = [
    { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
    { id: 2, grade: '9b++', style: { id: 2, description: 'Slab' } }
];


storiesOf('ClimbsTable', module)
    .add('Default', () => (
        <ClimbsTable climbs={climbs} handleDeleteClimb={() => console.log("delete item clicked")} />
    ));