import React from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker } from './DatePicker';


storiesOf('DatePicker', module)
    .add('Default', () => (
        <DatePicker label="StoryLabel" selectedDate={new Date(Date.now())} handleDateChange={console.log('date changed')} />
    ));