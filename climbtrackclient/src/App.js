import React from 'react';
import ProviderWrapper from './dataLayer/store/providerWrapper';
import createStore from './dataLayer/store/store';
import TemporaryWrapper from './components/pages/ClimbLog/TemporaryWrapper';
import { configureRefreshAccessTokenInterceptor } from './dataLayer/interceptors/interceptors';

const store = createStore();
configureRefreshAccessTokenInterceptor();

function App() {
  return (
    <div className="App">
      <ProviderWrapper store={store}>
        <TemporaryWrapper />
      </ProviderWrapper>
    </div>
  );
}

export default App;