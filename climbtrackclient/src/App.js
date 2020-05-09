import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ErrorModal } from './components/atoms/ErrorModal/ErrorModal';
import LogOffButton from './components/atoms/LogOffButton/LogOffButton';
import { LogonForm } from './components/organisms/LogonForm/LogonForm';
import ClimbLog from './components/pages/ClimbLog/ClimbLog';
import Interceptor from './dataLayer/interceptors/interceptors';
import ProviderWrapper from './dataLayer/store/providerWrapper';
import createStore from './dataLayer/store/store';

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