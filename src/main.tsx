import React from 'react';
import ReactDOM from 'react-dom/client';
import Example from './example/Example';
import { Web3ContextProvider } from './libs/components/Web3ContextProvider';

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3ContextProvider>
      <Example />
    </Web3ContextProvider>
  </React.StrictMode>
);
