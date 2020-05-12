import React from 'react';
import { storiesOf } from '@storybook/react';
import ClimbLog from './ClimbLog';
import createStore from '../../../dataLayer/store/store';
import Provider from '../../../dataLayer/store/providerWrapper';
import StoryRouter from 'storybook-react-router';

//TODO: We fetch from the mock API when this component mounts - do we need this store?
const storeWithClimbingSessions = {
    userInterface: {
        climbLoggerModalDisplayed: false
    }
};

const store = createStore(storeWithClimbingSessions);
storiesOf('ClimbLog', module)
    .addDecorator(StoryRouter())
    .add('Default', () => (
        <Provider store={store}>
            <ClimbLog />
        </Provider>
    ));