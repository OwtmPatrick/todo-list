import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { ConnectWallet } from '../ConnectWallet';
import { ConnectionType, getConnection, tryDeactivateConnector } from '../../web3/connections';
import { LocalStorageKeys } from '../../constants/localStorage';

export const Wallet = () => {
  const { account, isActive } = useWeb3React();
  const connectionType = localStorage.getItem('web3-connection-type');

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
        <Menu isLazy direction="rtl">
          <MenuButton>{account}</MenuButton>
          <MenuList>
            <MenuItem onClick={disconnect}>Disconnect</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
};
