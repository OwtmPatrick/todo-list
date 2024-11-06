import { useState, ChangeEvent } from 'react';
import { HStack, Stack, Input, Button, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { useSwap } from '../../hooks/useSwap';
import { Icon } from '../Icon';
import { WAVAX_ADDRESS, DAI_ADDRESS } from '../../constants/contracts';
import { round } from '../../utils';

export const SwapCard = () => {
  const [amount, setAmount] = useState('');
  const wavaxAmount = useTokenBalance(WAVAX_ADDRESS);
  const daiAmount = useTokenBalance(DAI_ADDRESS);

  const { swap } = useSwap();

  //   console.log(getQuote());

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
    <Stack gap="4" w="100%" maxW={500}>
      <Card>
        <CardHeader>
          <HStack gap={2} justify="space-between">
            <HStack gap={2}>
              <Icon name="avax" />
              <Text>WAVAX</Text>
            </HStack>
            <Text>{round(wavaxAmount)}</Text>
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
            <Text>{round(daiAmount)}</Text>
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
  );
};
