import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import IUniswapV3PoolArtifact from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { ethers } from 'ethers';
import { Pool } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import SwapRouterAbi from '../constants/abis/SwapRouter.json';
import { useWAVAX } from './useWAVAX';

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

const ROUTER_ADDRESS = '0xbb00FF08d01D300023C629E8fFfFcb65A5a578cE';

export const useSwap = () => {
  //   const provider = useProvider();
  //   const { data: signer } = useSigner();
  const { address } = useAccount();
  const { data, error, writeContract } = useWriteContract({
    // onSettled: (data, error) => {}
  });
  const { approve } = useWAVAX();
  console.log('data', data, error);
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

  const { data: fee } = useReadContract({
    address: POOL_ADDRESS,
    abi: IUniswapV3PoolArtifact.abi,
    functionName: 'fee'
  });

  const { data: liquidity } = useReadContract({
    address: POOL_ADDRESS,
    abi: IUniswapV3PoolArtifact.abi,
    functionName: 'liquidity'
  });

  const { data: slot0 } = useReadContract({
    address: POOL_ADDRESS,
    abi: IUniswapV3PoolArtifact.abi,
    functionName: 'slot0'
  });

  //   console.log('token0: ', token0, token1, fee);
  //   const { data: balance, isSuccess: isSuccessBalance } = useReadContract({
  //     address: tokenAddress,
  //     abi,
  //     functionName: 'balanceOf',
  //     args: [address]
  //   });
  //   const routerContract = useWriteContract({
  //     address: ROUTER_ADDRESS,
  //     abi: ISwapRouterArtifact.abi
  //   });
  //   const { approve, deposit } = useWETH();

  const swap = async (amount: number) => {
    // if (!routerContract) throw new Error('Router contract has not been initialized');

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

  const getQuote = async (amount: number) => {
    // console.log('pool immutables: ', getPoolImmutables());
    // console.log('pool state: ', getPoolState());
    const immutables = getPoolImmutables();
    const state = getPoolState();
    // const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState()]);
    const tokenA = new Token(43114, immutables.token0, UNI_DECIMALS);
    const tokenB = new Token(43114, immutables.token1, WETH_DECIMALS);

    // console.log('tokenA: ', tokenA);
    // console.log('tokenB: ', tokenB);

    const pool = new Pool(
      tokenA,
      tokenB,
      immutables.fee,
      state.sqrtPriceX96.toString(),
      state.liquidity.toString(),
      state.tick
    );

    // console.log('pool: ', pool);
    // console.log('outputAmount: ', pool.token0Price.toFixed(2));

    const outputAmount = amount * parseFloat(pool.token0Price.toFixed(2));

    return outputAmount;
  };

  // @ts-ignore
  const getPoolImmutables = (): Immutables => ({ token0, token1, fee });

  const getPoolState = (): State => ({
    // @ts-ignore
    liquidity,
    // @ts-ignore
    sqrtPriceX96: slot0[0],
    // @ts-ignore
    tick: slot0[1]
  });

  return { swap, getQuote };
};

export default useSwap;
