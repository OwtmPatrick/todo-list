import { useAccount } from 'wagmi';
import { ConnectWallet } from '../ConnectWallet';
import { Account } from '../Account';

export const Wallet = () => {
  const { isConnected } = useAccount();

  if (isConnected) return <Account />;

  return <ConnectWallet />;
};
