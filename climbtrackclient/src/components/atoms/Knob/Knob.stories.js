
import React from 'react';
import Knob from './Knob';
import { action } from '@storybook/addon-actions';
export default { title: 'Knob' };
const biscuits = [
    'Bourbon',
    'Rich tea',
    'Digestive',
    'Chocolate digestive'
];
const headerText = 'Select a biscuit';
const buttonText = 'Add biscuit';

export const Default = () => (
    <Knob selection={biscuits} headerText={headerText} buttonText={buttonText} onButtonClick={action('button clicked')} />
);