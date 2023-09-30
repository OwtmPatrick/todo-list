import React from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
// import Example from './example/Example';
import { App } from './App';
import { Web3ContextProvider } from './libs/components/Web3ContextProvider';

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

// Node polyfills required by WalletConnect
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </React.StrictMode>
);
