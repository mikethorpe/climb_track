import React from 'react';
import { storiesOf } from '@storybook/react';
import { Main } from './Main';
import createStore from '../../../dataLayer/store/store';
import Provider from '../../../dataLayer/store/providerWrapper';
import StoryRouter from 'storybook-react-router';

//TODO: We fetch from the mock API when this component mounts - do we need this store?
const storeWithClimbingSessions = {
    userInterface: {
        climbLoggerModalDisplayed: false
    },
    authentication: {
        authenticated: true
    }
};

const store = createStore(storeWithClimbingSessions);
storiesOf('Main', module)
    .addDecorator(StoryRouter())
    .add('Default', () => (
        <Provider store={store}>
            <Main />
        </Provider>
    ));