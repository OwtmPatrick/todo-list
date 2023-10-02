import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';

export const Logo: FC<{ wrapperProps?: BoxProps }> = ({ wrapperProps }) => (
  <Box
    as="a"
    href="/"
    position={{ lg: 'absolute' }}
    top={{ lg: '50%' }}
    left={{ lg: '50%' }}
    transform={{ lg: 'translate(-50%, -50%)' }}
    cursor="pointer"
    _hover={{ opacity: '0.7' }}
    transition="opacity .2s"
    {...wrapperProps}
  >
    <LogoIcon />
  </Box>
);
