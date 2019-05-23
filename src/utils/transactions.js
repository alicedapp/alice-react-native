import ethers from 'ethers';
import { loadWallet } from '../model/wallet';

export const contractInteraction = async (ContractAddress, abi, functionCall, value) => {

  const transactionSpeed = await fetch('https://ethgasstation.info/json/ethgasAPI.json');
  const provider = ethers.providers.getDefaultProvider();

  const contract = new ethers.Contract(ContractAddress, abi, provider);
  console.log(contract);

  const wallet = await loadWallet();

  const contractWithSigner = contract.connect(wallet);
  console.log('contract function: ', contractWithSigner[functionCall]())
  // const tx = await contractWithSigner.deposit;

  const tx = await contractWithSigner[functionCall]({value: parseInt(value*10e17)})

  console.log(tx.hash);
  if (tx.hash) {

  }

  const txConfirm = await tx.wait();
}
