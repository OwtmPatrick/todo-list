import { Box, Image, Menu, MenuButton, MenuList, MenuItem, HStack, Text } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { ConnectWallet } from '../ConnectWallet';
import { Icon } from '../Icon';
import { ConnectionType, getConnection, tryDeactivateConnector } from '../../web3/connections';
import { LocalStorageKeys } from '../../constants/localStorage';
import { shortAddress } from '../../utils';
import { ConnectButtonImage } from '../../constants/connectButton';

export const Wallet = () => {
  const { account, isActive } = useWeb3React();
  const connectionType = localStorage.getItem(LocalStorageKeys.WEB3_CONNECTION_TYPE);

  const disconnect = async () => {
    const deactivation = await tryDeactivateConnector(
      getConnection(connectionType as ConnectionType).connector
    );
    // undefined means the deactivation failed
    if (deactivation === undefined) {
      // TODO: handle error
      return;
    }
    localStorage.removeItem(LocalStorageKeys.WEB3_CONNECTION_TYPE);
  };

  return (
    <div>
      {isActive ? (
        <Box display="flex" alignItems="center" h={{ base: '40px', lg: '48px' }}>
          <Menu>
            <MenuButton padding="10px 12px" background="white" borderRadius="20px">
              <HStack gap="8px">
                <Image
                  width={18}
                  height={18}
                  src={ConnectButtonImage[connectionType as ConnectionType]}
                />
                <Text color="green.200" fontSize={{ base: '12px', lg: '16px' }}>
                  {shortAddress(account!)}
                </Text>
                <Icon name="logout" />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem background="white" onClick={disconnect}>
                Disconnect
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
};
