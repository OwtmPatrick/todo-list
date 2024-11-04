import { http, createConfig } from 'wagmi';
import { injected, metaMask } from 'wagmi/connectors';
import { mainnet, sepolia, avalanche } from 'wagmi/chains';

export const config = createConfig({
  chains: [mainnet, sepolia, avalanche],
  connectors: [injected(), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [avalanche.id]: http()
  }
});
