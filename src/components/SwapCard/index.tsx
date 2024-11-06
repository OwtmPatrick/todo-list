import { useAccount, useSwitchChain } from 'wagmi';
import { ChainId } from '@uniswap/sdk-core';
import { Stack, Text, Button } from '@chakra-ui/react';
import { SwapCard } from './SwapCard';

export const Container = () => {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  const onChangeNetwork = () => {
    switchChain({ chainId: ChainId.AVALANCHE });
  };

  if (!isConnected) {
    return <Text textStyle="lg">Please connect wallet</Text>;
  }

  if (chainId !== ChainId.AVALANCHE) {
    return (
      <Stack gap={4}>
        <Text textStyle="lg">Please change network to Avalance</Text>

        <Button
          colorScheme="green"
          color="white"
          background="green.200"
          size="lg"
          onClick={onChangeNetwork}
        >
          Change network
        </Button>
      </Stack>
    );
  }

  return <SwapCard />;
};
