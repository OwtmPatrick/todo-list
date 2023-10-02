import { FC } from 'react';
import { VStack, Button, HStack, Image, Text } from '@chakra-ui/react';
import { ConnectionType, getHasMetaMaskExtensionInstalled } from '../../web3/connections';
import { METAMASK_URL } from '../../web3/constants';
import { Option } from '../ConnectionOption/Option';
import { repoName } from '../../constants/config';

type ConnectOptionsProps = {
  onClose: () => void;
};

export const ConnectionOptions: FC<ConnectOptionsProps> = ({ onClose }) => {
  function getOptions() {
    const hasMetaMaskExtension = getHasMetaMaskExtensionInstalled();

    const metaMaskOption = hasMetaMaskExtension ? (
      <Option connectionType={ConnectionType.INJECTED} img="/assets/mm.png" onClose={onClose} />
    ) : (
      <Button
        variant="outline"
        colorScheme="teal"
        w="100%"
        onClick={() => window.open(METAMASK_URL)}
      >
        <HStack w="100%" justifyContent="center">
          <Image
            src={`${window.location.origin}/${repoName}/assets/mm.png`}
            width={25}
            height={25}
            borderRadius="3px"
          />
          <Text>Install Metamask</Text>
        </HStack>
      </Button>
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
