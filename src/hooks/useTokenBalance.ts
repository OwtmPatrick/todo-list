import { useAccount, useReadContract, useToken } from 'wagmi';
import { ethers } from 'ethers';
import abi from '../constants/abis/ERC20.json';

export const useTokenBalance = (tokenAddress: `0x${string}`) => {
  const { address } = useAccount();
  const {
    data: balance,
    isFetching: isSFetchingBalance,
    refetch
  } = useReadContract({
    address: tokenAddress,
    abi,
    functionName: 'balanceOf',
    args: [address]
  });

  const { data: token, isFetching: isSFetchingToken } = useToken({ address: tokenAddress });
  const isFetching = isSFetchingBalance || isSFetchingToken;

  return {
    isFetching,
    balance: isFetching ? undefined : ethers.utils.formatUnits(balance as number, token!.decimals),
    refetch
  };
};
