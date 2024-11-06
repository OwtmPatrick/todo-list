import { ethers } from 'ethers';
import { useWriteContract } from 'wagmi';
// import { useCont } from 'wagmi';
import WETHArtifact from '../constants/abis/ERC20.json';

const WAVAX_ADDRESS = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';
const WAVAX_DECIMALS = 18;

export const useWAVAX = () => {
  //   const { data: signer } = useSigner();
  //   const WETHContract = useContract({
  //     address: WAVAX_ADDRESS,
  //     abi: WETHArtifact
  //     // signerOrProvider: signer
  //   });

  const { writeContract } = useWriteContract();
  const deposit = async (amount: number) => {
    // if (!WETHContract) throw new Error('WETH contract has not been initialized');

    const parsedAmount = ethers.utils.parseUnits(amount.toString(), WAVAX_DECIMALS);

    // const txn = await WETHContract.deposit({ value: parsedAmount });
    return writeContract({
      abi: WETHArtifact,
      address: WAVAX_ADDRESS,
      functionName: 'deposit',
      args: [parsedAmount]
      //   value: parsedAmount
    });
  };

  const approve = async (address: string, amount: number) => {
    // if (!WETHContract) throw new Error('WETH contract has not been initialized');

    const parsedAmount = ethers.utils.parseUnits(amount.toString(), WAVAX_DECIMALS);

    console.log('parsedAmount: ', parsedAmount);

    // const txn = WETHContract.approve(address, parsedAmount);
    return writeContract({
      abi: WETHArtifact,
      address: WAVAX_ADDRESS,
      functionName: 'approve',
      args: [address, parsedAmount]
    });
  };

  return { deposit, approve };
};
