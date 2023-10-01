import { Box, Flex, Text } from '@chakra-ui/react';
import { Logo } from '../../components/Logo';
import { Navigation } from '../../components/Navigation';
import { Socials } from '../../components/Socials';

export const Footer = () => (
  <Box
    as="footer"
    backgroundColor={{ base: 'white', lg: 'gray.50' }}
    borderTop={{ lg: '1px' }}
    borderColor={{ lg: 'gray.400' }}
  >
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'center', lg: 'flex-start' }}
      justifyContent="space-between"
      maxW="container"
      m="0 auto"
      p="0 20px"
      paddingTop="50px"
      position="relative"
    >
      <Logo wrapperProps={{ w: { base: 120, lg: 150 } }} />
      <Navigation />
      <Socials />
    </Flex>
    <Box p="0 20px" paddingTop="30px" paddingBottom="40px">
      <Text textAlign="center" color="gray.200" fontSize="14px" fontFamily="Inter, sans-serif">
        ©2022 All rights reserved. Powered by SFXDX
      </Text>
    </Box>
  </Box>
);
