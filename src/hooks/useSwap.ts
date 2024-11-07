import React from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import IUniswapV3PoolArtifact from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { ethers } from 'ethers';
import { Pool } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import SwapRouterAbi from '../constants/abis/SwapRouter.json';
import { useApprove } from './useApprove';
import { usePoolState } from './usePoolState';
import { ROUTER_ADDRESS } from '../constants/contracts';

interface Immutables {
  token0: string;
  token1: string;
  fee: number;
}

interface State {
  liquidity: ethers.BigNumber;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
}

const WETH_DECIMALS = 18;
const UNI_DECIMALS = 18;
// AVAX - DAI.e
const POOL_ADDRESS = '0xD399718256C5206D9586e866169dBdf131193e02';

export const useSwap = () => {
  const { address } = useAccount();
  const { state, isFetching: isFetchingPoolState } = usePoolState();
  const { data, error, writeContract } = useWriteContract({
    // onSettled: (data, error) => {}
  });
  const { approve } = useApprove(address!, ROUTER_ADDRESS);
  //   console.log('data', data, error);
  const { data: token0 } = useReadContract({
    address: POOL_ADDRESS,
    abi: IUniswapV3PoolArtifact.abi,
    functionName: 'token0'
  });

  const { data: token1 } = useReadContract({
    address: POOL_ADDRESS,
    abi: IUniswapV3PoolArtifact.abi,
    functionName: 'token1'
  });

  const { data: fee, isFetching: isFetchingFees } = useReadContract({
    address: POOL_ADDRESS,
    abi: IUniswapV3PoolArtifact.abi,
    functionName: 'fee'
  });

  const swap = async (amount: number) => {
    // use if you want to swap from native AVAX
    // await deposit(amount);
    await approve(ROUTER_ADDRESS, amount);

    const immutables = await getPoolImmutables();

    const parsedAmount = ethers.utils.parseUnits(amount.toString(), UNI_DECIMALS);

    const params = {
      tokenIn: immutables.token0,
      tokenOut: immutables.token1,
      fee: immutables.fee,
      recipient: address,
      //   deadline: Math.floor(Date.now() / 1000) + 60 * 10,
      amountIn: parsedAmount,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
    };

    console.log('params: ', params, Object.values(params));

    return writeContract({
      //   abi: ISwapRouterArtifact.abi,
      abi: SwapRouterAbi,
      address: ROUTER_ADDRESS,
      functionName: 'exactInputSingle',
      args: [Object.values(params)]
    });
  };

  const getTokenPrice = () =>
    React.useMemo(() => {
      if (isFetchingPoolState || isFetchingFees) return undefined;

      const immutables = getPoolImmutables();
      const tokenA = new Token(43114, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', UNI_DECIMALS);
      const tokenB = new Token(43114, '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70', WETH_DECIMALS);

      const pool = new Pool(
        tokenA,
        tokenB,
        immutables.fee,
        state.sqrtPriceX96.toString(),
        (state.liquidity as number).toString(),
        state.tick
      );

      return pool.token0Price.toFixed(2);
    }, [isFetchingPoolState]);

  // @ts-ignore
  const getPoolImmutables = (): Immutables => ({ token0, token1, fee });

  return { swap, getTokenPrice };
};

export default useSwap;
