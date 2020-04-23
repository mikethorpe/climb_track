import React from 'react';
import { action } from '@storybook/addon-actions';
import GradeControl from 'GradeControl';

export default {
    title: 'Button',
    component: Button,
};

export const Emoji = () => (
    <GradeControl onClick={action('clicked')}>
        <span role="img" aria-label="so cool">
            😀 😎 👍 💯
    </span>
);
