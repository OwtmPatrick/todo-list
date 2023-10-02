import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { Routes } from '../../navigation/Routes';

export const Logo: FC<{ wrapperProps?: BoxProps }> = ({ wrapperProps }) => (
  <Box
    position={{ lg: 'absolute' }}
    top={{ lg: '50%' }}
    left={{ lg: '50%' }}
    transform={{ lg: 'translate(-50%, -50%)' }}
    cursor="pointer"
    _hover={{ opacity: '0.7' }}
    transition="opacity .2s"
    {...wrapperProps}
  >
    <Link to={Routes.HOME}>
      <LogoIcon />
    </Link>
  </Box>
);
