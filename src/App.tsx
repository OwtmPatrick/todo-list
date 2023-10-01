import { Box } from '@chakra-ui/react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

import './App.css';

export const App = () => (
  <>
    <Header />

    <Box as="main" flexGrow="1" />

    <Footer />
  </>
);
