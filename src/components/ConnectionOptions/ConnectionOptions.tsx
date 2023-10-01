import { FC } from 'react';
import { VStack, Link } from '@chakra-ui/react';
import { ConnectionType, getHasMetaMaskExtensionInstalled } from '../../web3/connections';
import { METAMASK_URL } from '../../web3/constants';
import { Option } from '../ConnectionOption/Option';

type ConnectOptionsProps = {
  onClose: () => void;
};

export const ConnectionOptions: FC<ConnectOptionsProps> = ({ onClose }) => {
  function getOptions() {
    const hasMetaMaskExtension = getHasMetaMaskExtensionInstalled();

    const metaMaskOption = hasMetaMaskExtension ? (
      <Option connectionType={ConnectionType.INJECTED} img="/assets/mm.png" onClose={onClose} />
    ) : (
      <Link href={METAMASK_URL}>Install Metamask</Link>
    );

    const coinbaseWalletOption = (
      <Option
        connectionType={ConnectionType.COINBASE_WALLET}
        img="/assets/cb.png"
        onClose={onClose}
      />
    );

    const walletConnectOption = (
      <Option
        connectionType={ConnectionType.WALLET_CONNECT}
        img="/assets/wc.png"
        onClose={onClose}
      />
    );

    return (
      <>
        {metaMaskOption}
        {coinbaseWalletOption}
        {walletConnectOption}
      </>
    );
  }

  return <VStack>{getOptions()}</VStack>;
};
