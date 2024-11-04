import React from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { App } from './App';

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

// Node polyfills required by WalletConnect
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
