import { RouterProvider } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './navigation/router';
import { config } from './config';

import './App.css';

const queryClient = new QueryClient();

export const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </WagmiProvider>
);
