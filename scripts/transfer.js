const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;

  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const [signer] = await hre.ethers.getSigners();

  const contractAddress = "0x2834C058AcCfE6B858Ef79134605488d782FAa75";

  const contractFactory = await hre.ethers.getContractFactory("TokenERC20");
  const contract = contractFactory.attach(contractAddress);

  const transaction = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData("transfer", ["0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1", "1"]), 0);

  await transaction.wait();

  console.log("Transaction Response: ", transaction);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});