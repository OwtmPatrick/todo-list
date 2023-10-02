import { HStack, Button, Image, Text } from '@chakra-ui/react';
import { ConnectionType, getConnection, tryActivateConnector } from '../../web3/connections';
import { ConnectButtonTitle } from '../../constants/connectButton';
import { LocalStorageKeys } from '../../constants/localStorage';
import { repoName } from '../../constants/config';

export const Option = ({
  connectionType,
  img,
  onClose
}: {
  connectionType: ConnectionType;
  img: string;
  onClose: () => void;
}) => {
  const onClick = async () => {
    const activation = await tryActivateConnector(getConnection(connectionType).connector);
    if (!activation) {
      // TODO: handle error
      return;
    }
    localStorage.setItem(LocalStorageKeys.WEB3_CONNECTION_TYPE, connectionType);
    onClose();
  };

  return (
    <Button variant="outline" colorScheme="teal" w="100%" onClick={onClick}>
      <HStack w="100%" justifyContent="center">
        <Image
          src={`${window.location.origin}/${repoName}${img}`}
          width={25}
          height={25}
          borderRadius="3px"
        />
        <Text>{ConnectButtonTitle[connectionType]}</Text>
      </HStack>
    </Button>
  );
};
