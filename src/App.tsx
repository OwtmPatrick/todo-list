import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConnectionType, getConnection, tryActivateConnector } from './web3/connections';
import { LocalStorageKeys } from './constants/localStorage';
import { router } from './navigation/router';

import './App.css';

export const App = () => {
  useEffect(() => {
    const connectionType = localStorage.getItem(LocalStorageKeys.WEB3_CONNECTION_TYPE);

    if (connectionType) {
      const { connector } = getConnection(connectionType as ConnectionType);
      tryActivateConnector(connector);
    }
  }, []);

  return <RouterProvider router={router} />;
};
