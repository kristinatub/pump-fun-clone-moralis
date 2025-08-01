const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying TokenFactory contract to Plume network...");

  // Get the contract factory
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  
  // Deploy the contract
  const tokenFactory = await TokenFactory.deploy();
  
  // Wait for deployment to complete
  await tokenFactory.waitForDeployment();
  
  // Get the deployed contract address
  const contractAddress = await tokenFactory.getAddress();
  
  console.log("TokenFactory deployed to:", contractAddress);
  console.log("\nAdd this address to your frontend/.env file:");
  console.log(`REACT_APP_CONTRACT_ADDRESS=${contractAddress}`);
  
  return contractAddress;
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 