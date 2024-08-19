
const hre = require("hardhat");

async function main() {

  const contract = await hre.ethers.deployContract("TokenERC20");

  await contract.waitForDeployment();

  console.log(`TokenERC20 deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});