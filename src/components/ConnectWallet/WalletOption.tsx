import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Connector } from 'wagmi';

export const WalletOption = ({
  connector,
  onClick
}: {
  connector: Connector;
  onClick: () => void;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button variant="outline" disabled={!ready} colorScheme="teal" w="100%" onClick={onClick}>
      {connector.name}
    </Button>
  );
};
