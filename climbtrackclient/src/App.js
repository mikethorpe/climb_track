import React from 'react';
import ClimbLogger from './components/organisms/ClimbLogger/ClimbLogger';
import ProviderWrapper from './dataLayer/store/providerWrapper';
import createStore from './dataLayer/store/store';

const store = createStore();

function App() {
  return (
    <div className="App">
      <ProviderWrapper store={store}>
        <ClimbLogger />
      </ProviderWrapper>
    </div>
  );
}

export default App;