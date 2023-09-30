import { ChakraProvider } from '@chakra-ui/react';
import { Header } from './layout/Header';
import { theme } from './theme';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />

    <main>
      <h1>Content</h1>
    </main>

    <footer>footer</footer>
  </ChakraProvider>
);
