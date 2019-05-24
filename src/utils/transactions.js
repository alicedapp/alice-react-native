import ethers from 'ethers';
import { loadWallet } from '../model/wallet';

let transactionSpeed;


(async () => {
  transactionSpeed = await fetch('https://ethgasstation.info/json/ethgasAPI.json');
})();

export const contractInteraction = async (ContractAddress, abi, functionCall, obj) => {

  const provider = ethers.providers.getDefaultProvider();

  const contract = new ethers.Contract(ContractAddress, abi, provider);
  console.log(contract);

  const wallet = await loadWallet();

  const contractWithSigner = contract.connect(wallet);

  const tx = await contractWithSigner[functionCall]({...obj});

  console.log(tx.hash);
  if (tx.hash) {

  }

  const txConfirm = await tx.wait();
}

export const contractInteractionWithVar = async (ContractAddress, abi, functionCall, var1) => {

  const provider = ethers.providers.getDefaultProvider();

  const contract = new ethers.Contract(ContractAddress, abi, provider);
  console.log(contract);

  const wallet = await loadWallet();

  const contractWithSigner = contract.connect(wallet);

  const tx = await contractWithSigner[functionCall](var1);

  console.log(tx.hash);
  if (tx.hash) {

  }

  const txConfirm = await tx.wait();
}
