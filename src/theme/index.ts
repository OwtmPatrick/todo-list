import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      50: '#F0F5F5',
      100: '#676767',
      200: '#959596',
      300: '#ABB6B7',
      400: '#CDD2DD'
    },
    green: {
      200: '#08D899'
    }
  },
  fonts: {
    body: `'Manrope', sans-serif`
  },
  sizes: {
    container: '1340px'
  }
});
