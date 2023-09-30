import { Box, Flex, Button } from '@chakra-ui/react';
import { Logo } from '../../components/Logo';

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
      <Logo />
      <Button
        h={{ base: '40px', lg: '48px' }}
        p={{ lg: '0 32px' }}
        colorScheme="green"
        color="white"
        background="green.200"
        fontSize={{ lg: '18px' }}
      >
        Connect wallet
      </Button>
    </Flex>
  </Box>
);
