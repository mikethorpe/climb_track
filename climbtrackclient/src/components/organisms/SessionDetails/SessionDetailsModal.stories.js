
import React from 'react';
import { SessionDetailsModal } from './SessionDetailsModal';
import { storiesOf } from '@storybook/react';
import createStore from '../../../dataLayer/store/store';

storiesOf('SessionDetails', module)
    .add('Default', () => (
        <SessionDetailsModal />
    ));