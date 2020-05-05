import React, { useEffect } from 'react';
import ProviderWrapper from './dataLayer/store/providerWrapper';
import createStore from './dataLayer/store/store';
import Interceptor from './dataLayer/interceptors/interceptors';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory } from "react-router-dom";
import ClimbLog from './components/pages/ClimbLog/ClimbLog';
import LogonForm from './components/organisms/LogonForm/LogonForm';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import LogOffButton from './components/atoms/LogOffButton/LogOffButton';
import { SET_AUTHENTICATED } from './dataLayer/actions/types';

const store = createStore();

function App() {
  return (
    <div className="App">
      <ProviderWrapper store={store}>
        <Interceptor />
        <Router>
          <LogOffButton />
          <Switch>
            <Route path="/login">
              <LogonForm />
            </Route>
            <PrivateRoute path="/">
              <ClimbLog />
            </PrivateRoute>
          </Switch>
        </Router>
      </ProviderWrapper>
    </div >
  );
}

const PrivateRoute = ({ children, ...rest }) => {

  const authentication = useSelector(state => state.authentication);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authentication.authenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
export default App;