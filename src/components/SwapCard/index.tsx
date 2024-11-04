// import { useBalance, useAccount } from 'wagmi';
import { useTokenBalance } from '../../hooks/useTokenBalance';

const daiContractAddress = '0xd586e7f844cea2f87f50152665bcbc2c279d8d70';

export const SwapCard = () => {
  //   const { address } = useAccount();

  console.log(useTokenBalance(daiContractAddress));
  return <div>sc</div>;
};
