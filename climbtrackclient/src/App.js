import React from 'react';
import ProviderWrapper from './dataLayer/store/providerWrapper';
import createStore from './dataLayer/store/store';
import ClimbLog from './components/pages/ClimbLog/ClimbLog';

const store = createStore();

function App() {
  return (
    <div className="App">
      <ProviderWrapper store={store}>
        <ClimbLog />
      </ProviderWrapper>
    </div>
  );
}

export default App;