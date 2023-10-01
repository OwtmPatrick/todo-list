import { Box, Flex } from '@chakra-ui/react';
import { Logo } from '../../components/Logo';
import { Wallet } from '../../components/Wallet';

export const Header = () => (
  <Box
    as="header"
    borderBottom={{ lg: '1px' }}
    borderColor={{ lg: 'gray.400' }}
    backdropFilter="blur(8px)"
  >
    <Flex
      alignItems="center"
      justifyContent={{ base: 'space-between', lg: 'flex-end' }}
      gap="2"
      maxW="container"
      m="0 auto"
      p="20px"
      position="relative"
    >
      <Logo wrapperProps={{ w: { base: 100, lg: 150 } }} />
      <Wallet />
    </Flex>
  </Box>
);
