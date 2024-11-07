import React from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import IUniswapV3PoolArtifact from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { ethers } from 'ethers';
import { Pool } from '@uniswap/v3-sdk';
import { Token, ChainId } from '@uniswap/sdk-core';
import SwapRouterAbi from '../constants/abis/SwapRouter.json';
import { usePoolState } from './usePoolState';
import { ROUTER_ADDRESS, WAVAX_ADDRESS, DAI_ADDRESS } from '../constants/contracts';

const POOL_ADDRESS = '0xD399718256C5206D9586e866169dBdf131193e02';

export const useSwap = () => {
  const { address } = useAccount();
  const { state, isFetching: isFetchingPoolState } = usePoolState();
  const { writeContractAsync, isPending: isPendingSwap } = useWriteContract();

  const { data: fee, isFetching: isFetchingFees } = useReadContract({
    address: POOL_ADDRESS,
    abi: IUniswapV3PoolArtifact.abi,
    functionName: 'fee'
  });

  const swap = async (amount: number) => {
    // use if you want to swap from native AVAX
    // await deposit(amount);

    const parsedAmount = ethers.utils.parseUnits(amount.toString(), 18);

    const params = {
      tokenIn: WAVAX_ADDRESS,
      tokenOut: DAI_ADDRESS,
      fee,
      recipient: address,
      amountIn: parsedAmount,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
    };

    return writeContractAsync({
      abi: SwapRouterAbi,
      address: ROUTER_ADDRESS,
      functionName: 'exactInputSingle',
      args: [Object.values(params)]
    });
  };

  const getTokenPrice = () =>
    React.useMemo(() => {
      if (isFetchingPoolState || isFetchingFees) return undefined;

      const tokenA = new Token(ChainId.AVALANCHE, WAVAX_ADDRESS, 18);
      const tokenB = new Token(ChainId.AVALANCHE, DAI_ADDRESS, 18);

      const pool = new Pool(
        tokenA,
        tokenB,
        fee as number,
        state.sqrtPriceX96.toString(),
        (state.liquidity as number).toString(),
        state.tick
      );

      return pool.token0Price.toFixed(2);
    }, [isFetchingPoolState]);

  return { swap, getTokenPrice, isPendingSwap };
};

export default useSwap;
