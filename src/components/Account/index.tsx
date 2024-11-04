import { Box, Menu, MenuButton, MenuList, MenuItem, HStack, Text } from '@chakra-ui/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Icon } from '../Icon';
import { shortAddress } from '../../utils';

export const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Box display="flex" alignItems="center" h={{ base: '40px', lg: '48px' }}>
      <Menu>
        <MenuButton padding="10px 12px" background="white" borderRadius="40px">
          <HStack gap="8px">
            <Text color="green.200" fontSize={{ base: '12px', lg: '16px' }}>
              {shortAddress(address!)}
            </Text>
            <Icon name="logout" />
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem background="white" onClick={() => disconnect()}>
            Disconnect
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
