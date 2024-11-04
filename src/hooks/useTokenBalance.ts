import { useAccount, useReadContract, useToken } from 'wagmi';
import { ethers } from 'ethers';
import abi from '../utils/abis/ERC20.json';

export const useTokenBalance = (tokenAddress: `0x${string}`) => {
  const { address } = useAccount();
  const { data: balance, isSuccess: isSuccessBalance } = useReadContract({
    address: tokenAddress,
    abi,
    functionName: 'balanceOf',
    args: [address]
  });

  const { data: token, isSuccess: isSuccessToken } = useToken({ address: tokenAddress });

  if (isSuccessBalance && isSuccessToken) {
    return ethers.utils.formatUnits(balance as number, token.decimals);
  }

  return 0;
};
