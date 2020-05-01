
import React from 'react';
import Knob from './Knob';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

const biscuits = [
    'Bourbon',
    'Rich tea',
    'Digestive',
    'Chocolate digestive'
];
const headerText = 'Select a biscuit';
const buttonText = 'Add biscuit';

storiesOf('Knob', module)
    .add('Default', () => (
        <Knob selection={biscuits} headerText={headerText} buttonText={buttonText} onButtonClick={action('button clicked')} />
    ));