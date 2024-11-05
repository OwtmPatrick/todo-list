import { SUPPORTED_CHAINS, Token, ChainId } from '@uniswap/sdk-core';

export const repoName = 'web3-wallet-connect' as const;
export const WAVAX = new Token(
  ChainId.AVALANCHE,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);

export const DAI_TOKEN = new Token(
  ChainId.AVALANCHE,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
);
