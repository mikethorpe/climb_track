import React from 'react';
import ProviderWrapper from './dataLayer/store/providerWrapper';
import createStore from './dataLayer/store/store';
import TemporaryWrapper from './components/pages/ClimbLog/TemporaryWrapper';

const store = createStore();

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