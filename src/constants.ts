// src/constants.ts

// 1. Your NEW Deployed Contract Addresses
export const ESUSU_ADDRESS = "0x6b3e578FDdfF8c4aa1F0CA6A916bb7B8D4EA0880";
export const MOCK_USDC_ADDRESS = "0xee268f4ff160150312485a008dE2cC121107E209";

// 2. DeFi Esusu ABI (Updated with 'joinCircle' and 'maxMembers')
export const ESUSU_ABI = [
  { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_maxMembers", "type": "uint256" }], "name": "createCircle", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_circleId", "type": "uint256" }], "name": "joinCircle", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_circleId", "type": "uint256" }], "name": "getCircleDetails", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "max", "type": "uint256" }, { "internalType": "uint256", "name": "currentCount", "type": "uint256" }, { "internalType": "bool", "name": "active", "type": "bool" }, { "internalType": "uint256", "name": "round", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_circleId", "type": "uint256" }], "name": "contributeToCircle", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_lockDurationSeconds", "type": "uint256" }], "name": "depositPersonal", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdrawPersonal", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "nextCircleId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "personalVaults", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "unlockTime", "type": "uint256" }, { "internalType": "bool", "name": "exists", "type": "bool" }], "stateMutability": "view", "type": "function" }
] as const;

// 3. ERC20 ABI (Standard)
export const ERC20_ABI = [
  { "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" }
] as const;