import { useReadContract } from 'wagmi';
import IUniswapV3PoolArtifact from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { POOL_ADDRESS } from '../constants/contracts';

export const usePoolState = () => {
  const { data: liquidity, isFetching: isFetchingLiquidity } = useReadContract({
    address: POOL_ADDRESS,
    abi: IUniswapV3PoolArtifact.abi,
    functionName: 'liquidity'
  });

  const { data: slot0, isFetching: isFetchingSlot0 } = useReadContract({
    address: POOL_ADDRESS,
    abi: IUniswapV3PoolArtifact.abi,
    functionName: 'slot0'
  });

  const isFetching = isFetchingLiquidity || isFetchingSlot0;

  return {
    isFetching,
    state: isFetching
      ? {}
      : {
          liquidity,
          // TODO: fix types
          sqrtPriceX96: (slot0 as any)[0],
          tick: (slot0 as any)[1]
        }
  };
};
