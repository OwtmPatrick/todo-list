import { useBalance, useAccount } from 'wagmi';
import { ethers, providers, BigNumber } from 'ethers';
import { useState, useEffect, ChangeEvent } from 'react';
import {
  HStack,
  Stack,
  Input,
  Button,
  Center,
  Card,
  CardBody,
  CardHeader,
  Text
} from '@chakra-ui/react';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { useEthersProvider } from '../../hooks/useEthersProvider';
import { useSwap } from '../../hooks/useSwap';
import { Icon } from '../Icon';
// import { Field } from '@/components/ui/field';

export const SwapCard = () => {
  //   const { address, connector } = useAccount();
  const [amount, setAmount] = useState('');
  //   const [token1Value, setToken2Value] = useState('');
  //   const [amountIn, setAmountIn] = useState(0.1); // 0.1 WBTC

  useEffect(() => {
    console.log('sawp card');
  }, []);

  const { getQuote, swap } = useSwap();

  const handleTokenAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;

    if (/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  const handleSwap = async () => {
    try {
      console.log('swap');
      const res = await swap(0.001);

      console.log('res;l ', res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Center>
      <Stack gap="4" w="100%" maxW={500}>
        <Card>
          <CardHeader>
            <HStack gap={2} justify="space-between">
              <HStack gap={2}>
                <Icon name="avax" />
                <Text>WAVAX</Text>
              </HStack>
              <Text>1111.1</Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <Input
              placeholder="Enter amount"
              variant="subtle"
              size="lg"
              value={amount}
              onChange={handleTokenAmountChange}
            />
          </CardBody>
        </Card>
        <Card variant="subtle">
          <CardHeader>
            <HStack gap={2} justify="space-between">
              <HStack gap={2}>
                <Icon name="dai" />
                <Text>DAI</Text>
              </HStack>
              <Text>55555</Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <Input variant="subtle" size="lg" disabled />
          </CardBody>
        </Card>
        <Button
          colorScheme="green"
          color="white"
          background="green.200"
          size="lg"
          onClick={handleSwap}
        >
          Swap
        </Button>
      </Stack>
    </Center>
  );
};
