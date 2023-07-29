# decentralized-donation
This is a decentralized donation web app. It uses the sepolia testnet. Please get sepolia testnet tokens to test the contract from [sepolia faucet](https://sepoliafaucet.com/)_
Its features are-
  - Login/Signup through OTP delivered to the phone number for the admins
  - JWT tokens
  - Creating a funding contract
  - Funding and withdrawing from the contract through the frontend
    
# How to run the app-
## Step 0 - Add a .env file in the server directory with the following format. In the mongo uri create a cluster with mongo and add that here-
```
NODE_ENV=development
PORT=5000
MONGO_URI=
JWT_SECRET= jwtSecret
```
## Step 1- Install the dependencies (node version > 16)
```
cd mernPart && npm install
```

```
cd client && npm install
```

```
cd .. && cd server && npm install
```
## Step 2 - Run the app
While in the directory mernPart-
```
npm run dev
```

# How to deploy the contract and start accepting donations
## Step 0 - Add a .env file in the contract directory with the following format and in the private key section add your account's private key.
```
SEPOLIA_RPC_URL = https://eth-sepolia.g.alchemy.com/v2/kLlSgWn31V_kgHEFZy13x_WMWMOBoE1n
PRIVATE_KEY = 
ETHERSCAN_API_KEY = 9PKFJCQ1WXGV9QWZTZGUA71W9A547INEYW
COINMARKETCAP_API_KEY = 
```
## Step 1 - Install the dependencies (node version > 16)
```
cd contract && yarn install
```

## Step 2 - Deploying the contract 
```
yarn hardhat deploy --network sepolia
```

## Step 3 - Add the contract address-
The console will show the contract address of your deployed contract. Now copy this contract address and paste it in the mernPart/client/src/components/constants.js.

