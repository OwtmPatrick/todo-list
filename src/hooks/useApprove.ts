import { ethers } from 'ethers';
import { useReadContract, useWriteContract } from 'wagmi';
import erc20Abi from '../constants/abis/ERC20.json';

const WAVAX_ADDRESS = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';
const WAVAX_DECIMALS = 18;

export const useApprove = (address: string, contractAddress: string) => {
  const {
    data: allowance,
    isFetching,
    refetch
  } = useReadContract({
    address: WAVAX_ADDRESS,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contractAddress]
  });

  const {
    isPending: isPendingApproving,
    isSuccess: isApproved,
    writeContractAsync
  } = useWriteContract();

  const approve = async (amount: number) => {
    const parsedAmount = ethers.utils.parseUnits(amount.toFixed(6).toString(), WAVAX_DECIMALS);

    return writeContractAsync({
      abi: erc20Abi,
      address: WAVAX_ADDRESS,
      functionName: 'approve',
      args: [contractAddress, parsedAmount]
    });
  };

  return {
    isFetching,
    allowance: isFetching
      ? undefined
      : ethers.utils.formatUnits(allowance as number, WAVAX_DECIMALS),
    approve,
    isPendingApproving,
    isApproved,
    refetch
  };
};
