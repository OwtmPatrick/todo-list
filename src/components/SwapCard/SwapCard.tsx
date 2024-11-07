import { useState, ChangeEvent, useMemo } from 'react';
import { HStack, Stack, Input, Button, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { useSwap } from '../../hooks/useSwap';
import { Icon } from '../Icon';
import { WAVAX_ADDRESS, DAI_ADDRESS, ROUTER_ADDRESS } from '../../constants/contracts';
import { round } from '../../utils';
import { useApprove } from '../../hooks/useApprove';

export const SwapCard = () => {
  const { address } = useAccount();
  const { allowance } = useApprove(address!, ROUTER_ADDRESS);
  const [amountTokenIn, setAmountTokenIn] = useState('');
  const { balance: wavaxBalance } = useTokenBalance(WAVAX_ADDRESS);
  const { balance: daiBalance } = useTokenBalance(DAI_ADDRESS);

  const { getTokenPrice, swap } = useSwap();
  const tokenPrice = getTokenPrice();

  const amountTokenOut = useMemo(() => {
    if (!tokenPrice || !amountTokenIn) return '';

    return (Number(amountTokenIn) * Number(tokenPrice)).toFixed(2);
  }, [amountTokenIn, tokenPrice]);

  const buttonTitle = useMemo((): string => {
    if (!allowance || !amountTokenIn) return 'Swap';

    if (Number(amountTokenIn) > Number(allowance)) {
      return 'Approve';
    }

    return 'Swap';
  }, [allowance, amountTokenIn]);

  const isButtonDisabled = useMemo((): boolean => {
    if (!wavaxBalance) return true;

    return Number(wavaxBalance) < Number(amountTokenIn);
  }, [wavaxBalance, amountTokenIn]);

  const handleTokenAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;

    if (/^([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(value) || value === '') {
      setAmountTokenIn(value);
    }
  };

  const setMaxAmount = () => {
    if (wavaxBalance) {
      setAmountTokenIn(wavaxBalance!);
    }
  };

  const handleSwap = async () => {
    try {
      await swap(Number(amountTokenIn));
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
            <HStack gap={2}>
              <Button
                colorScheme="green"
                color="white"
                background="green.200"
                size="xs"
                onClick={setMaxAmount}
              >
                max
              </Button>
              <Text>{wavaxBalance ? round(wavaxBalance!) : 0}</Text>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Input
            placeholder="Enter amount"
            variant="subtle"
            size="lg"
            value={amountTokenIn}
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
            <Text>{daiBalance ? round(daiBalance!) : 0}</Text>
          </HStack>
        </CardHeader>
        <CardBody>
          <Input variant="subtle" size="lg" value={amountTokenOut} disabled />
        </CardBody>
      </Card>
      <Button
        colorScheme="green"
        color="white"
        background="green.200"
        size="lg"
        onClick={handleSwap}
        isDisabled={isButtonDisabled}
      >
        {buttonTitle}
      </Button>
    </Stack>
  );
};
