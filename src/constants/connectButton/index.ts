import { ConnectionType } from '../../web3/connections';

export const ConnectButtonTitle: Partial<Record<ConnectionType, string>> = {
  INJECTED: 'Metamask',
  COINBASE_WALLET: 'Coinbase wallet',
  WALLET_CONNECT: 'Wallet connect'
};

export const ConnectButtonImage: Partial<Record<ConnectionType, string>> = {
  INJECTED: '/assets/mm.png',
  COINBASE_WALLET: '/assets/cb.png',
  WALLET_CONNECT: '/assets/wc.png'
};
