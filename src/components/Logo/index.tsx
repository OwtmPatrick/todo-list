import { Box } from '@chakra-ui/react';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';

export const Logo = () => (
  <Box
    as="a"
    href="/"
    w={{ base: 100, lg: 150 }}
    position={{ lg: 'absolute' }}
    top={{ lg: '50%' }}
    left={{ lg: '50%' }}
    transform={{ lg: 'translate(-50%, -50%)' }}
    cursor="pointer"
    _hover={{ opacity: '0.7' }}
    transition="opacity .2s"
  >
    <LogoIcon />
  </Box>
);
