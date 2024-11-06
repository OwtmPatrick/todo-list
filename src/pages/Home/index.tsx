import { Box, Center } from '@chakra-ui/react';
import { Container as SwapCard } from '../../components/SwapCard';

export const Home = () => (
  <Box as="main" flexGrow="1" w="100%" maxW="container" m="0 auto" p="100px 20px">
    <Center>
      <SwapCard />
    </Center>
  </Box>
);
