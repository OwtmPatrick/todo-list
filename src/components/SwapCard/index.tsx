import { useBalance, useAccount } from 'wagmi';
import { ethers, providers, BigNumber } from 'ethers';
import { useState } from 'react';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { useEthersProvider } from '../../hooks/useEthersProvider';
import { useSwap } from '../../hooks/useSwap';

const daiContractAddress = '0xd586e7f844cea2f87f50152665bcbc2c279d8d70';

export const SwapCard = () => {
  const { address, connector } = useAccount();
  const [inputToken, setInputToken] = useState('0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'); // WBTC
  const [outputToken, setOutputToken] = useState('0xdAC17F958D2ee523a2206206994597C13D831ec7'); // USDT
  const [amountIn, setAmountIn] = useState(0.1); // 0.1 WBTC

  const { getQuote, swap } = useSwap();

  //   console.log(useTokenBalance(daiContractAddress));
  console.log('quote: ', getQuote());
  //   console.log(new ethers.providers.JsonRpcProvider());
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
    <div>
      <input
        type="text"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
        placeholder="Input Token"
      />
      <input
        type="number"
        value={amountIn}
        onChange={(e) => setAmountIn(e.target.value as any)}
        placeholder="Amount In"
      />
      <input
        type="text"
        value={outputToken}
        onChange={(e) => setOutputToken(e.target.value)}
        placeholder="Output Token"
      />
      <button type="button" onClick={handleSwap}>
        Swap
      </button>
    </div>
  );
};
