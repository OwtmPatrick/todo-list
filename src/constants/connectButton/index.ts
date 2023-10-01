import { ConnectionType } from '../../web3/connections';

export const ConnectButtonTitle: Partial<Record<ConnectionType, string>> = {
  INJECTED: 'Metamask',
  COINBASE_WALLET: 'Coinbase wallet',
  WALLET_CONNECT: 'Wallet connect'
};
