import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { ConnectionType, getConnection, tryActivateConnector } from './web3/connections';
import { LocalStorageKeys } from './constants/localStorage';

import './App.css';

export const App = () => {
  useEffect(() => {
    const connectionType = localStorage.getItem(LocalStorageKeys.WEB3_CONNECTION_TYPE);

    if (connectionType) {
      const { connector } = getConnection(connectionType as ConnectionType);
      tryActivateConnector(connector);
    }
  }, []);

  return (
    <>
      <Header />

      <Box as="main" flexGrow="1" />

      <Footer />
    </>
  );
};
