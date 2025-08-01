# Deployment Guide for Plume Network

This guide will help you deploy your TokenFactory contract to the Plume network and set up the necessary environment variables.

## Prerequisites

1. **Wallet Setup**: You need a wallet with some ETH on Plume network for gas fees
2. **Private Key**: Your wallet's private key for deployment
3. **Node.js and npm**: Make sure you have Node.js installed

## Step 1: Get Plume ETH

First, you need some ETH on the Plume network for gas fees:

1. Visit the [Plume Faucet](https://faucet.plume.network/) or use the Thirdweb faucet
2. Connect your wallet and request test ETH
3. Wait for the ETH to arrive in your wallet

## Step 2: Set Up Environment Variables

### For Hardhat (in `hardhat/.env`):

```bash
# Your wallet's private key (without 0x prefix)
PRIVATE_KEY=18f5e2e1ad41a5ac675c636ac2cfaa8f7f50573d0692e51eba36a56c58c00f29

# Optional: Mainnet RPC URL for forking
MAINNET_RPC_URL=your_mainnet_rpc_url_here

# Plume RPC URL (already configured in hardhat.config.js)
PLUME_RPC_URL=https://rpc.plume.org
```

### For Frontend (in `frontend/.env`):

```bash
# This will be filled after deployment
REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address_here

# Plume RPC URL
REACT_APP_RPC_URL=https://plume-rpc.thirdweb.com

# Your Moralis API key (for blockchain data)
REACT_APP_X_API_KEY=your_moralis_api_key_here
```

## Step 3: Deploy the Contract

1. **Navigate to the hardhat directory**:
   ```bash
   cd hardhat
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Deploy to Plume network**:
   ```bash
   npx hardhat run scripts/deploy.js --network plume
   ```

4. **Copy the contract address** from the output and add it to your `frontend/.env` file:
   ```bash
   REACT_APP_CONTRACT_ADDRESS=0x... # The address from deployment output
   ```

## Step 4: Verify Deployment

You can verify your contract deployment by:

1. **Check the deployment output** - it should show the contract address
2. **View on Plume Explorer** - visit [Plume Explorer](https://explorer.plume.network/) and search for your contract address
3. **Test the contract** - run your frontend application to ensure it connects properly

## Step 5: Run Your Application

1. **Start the frontend**:
   ```bash
   cd frontend
   npm start
   ```

2. **Connect your wallet** to the application
3. **Test the functionality** - try creating a token or buying tokens

## Troubleshooting

### Common Issues:

1. **"Insufficient funds"**: Make sure you have enough ETH on Plume network
2. **"Invalid private key"**: Ensure your private key is correct and doesn't include the 0x prefix
3. **"Contract not found"**: Verify the contract address in your frontend .env file
4. **"Network not found"**: Make sure you're connected to Plume network in your wallet

### Getting Help:

- Check the [Plume Network documentation](https://docs.plume.network/)
- Visit the [Thirdweb documentation](https://portal.thirdweb.com/) for Plume integration
- Check the Hardhat console output for detailed error messages

## Security Notes

- **Never commit your `.env` files** to version control
- **Keep your private key secure** and never share it
- **Use a dedicated wallet** for testing, not your main wallet
- **Verify contract addresses** before using them in production 