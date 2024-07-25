# Lockie

Lockie is a decentralized web3 application built using Next.js, Wagmi, Viem, and Foundry. It allows users to upload question papers to IPFS, store the IPFS hash on the Ethereum Sepolia testnet, and retrieve and view the stored question papers.

## Features

- **Upload Question Papers**: Users can upload question papers, which are stored on IPFS.
- **Store IPFS Hashes**: The IPFS hash of the uploaded question paper is stored on the Ethereum Sepolia testnet.
- **Retrieve and View**: Users can retrieve and view question papers using their index numbers.

## Tech Stack

- **Next.js**: A React framework for server-side rendering and building static web applications.
- **Wagmi**: A collection of React hooks for Ethereum.
- **Viem**: A library for building and interacting with Ethereum DApps.
- **Ethereum Sepolia**: A testnet for Ethereum development.
- **Foundry**: A smart contract development toolkit.
- **IPFS**: A peer-to-peer hypermedia protocol for storing and sharing content.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Foundry installed
- Metamask or another web3 wallet

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/lockie.git
   cd lockie

2. **Install dependencies:**:
   ```bash
   npm install

3. **Set up environment variables**:
Create a .env.local file in the root directory and add your environment variables.
   ```bash
    NEXT_PUBLIC_ALCHEMY_RPC=your-alchemy-project-rpc
    NEXT_PUBLIC_SEPOLIA_PRIVATE_KEY=your-sepolia-private-key
    NEXT_PUBLIC_IPFS_API_URL=your-ipfs-api-url

4. **Compile smart contracts with Foundry:**:
   ```bash
   forge build

5. **Deploy the smart contracts:**:
   ```bash
   forge create --private-key $NEXT_PUBLIC_SEPOLIA_PRIVATE_KEY src/YourContract.sol:YourContract --rpc-url $NEXT_PUBLIC_ALCHEMY_RPC

5. **Running the Application**:

1. **Start the development server:**:
   ```bash
   npm run dev

2. **Open the application:**
   ```bash
   Open http://localhost:3000 in your browser.








