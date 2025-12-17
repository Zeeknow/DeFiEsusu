# 🛡️ DeFi Esusu

> **Protect your capital. Preserve your community.**

## 📖 Introduction
On **January 1st, 2026**, a new fiscal reality hits Nigeria. The government has proposed a policy to tax **10% of the total annual credit** on every individual's bank account, deducted automatically in the first month of the following year.

For millions of citizens, friends, and business owners, this creates a critical problem: **holding funds in traditional bank accounts now carries a direct 10% penalty.**

**DeFi Esusu** is the decentralized answer to this challenge.

We are bringing the age-old African tradition of **Esusu (Thrift/Ajo)** to the blockchain. By pooling funds in a decentralized smart contract rather than a personal bank account, you can:
1.  **Avoid Unnecessary "Credit" Flags:** Funds are held on-chain, not in a bank ledger that triggers tax events.
2.  **Maintain Privacy:** Your savings circle is visible only to members, not centralized auditors.
3.  **Automate Trust:** Smart contracts handle the payout rotation, eliminating the need for a human treasurer who might be pressured by regulations.

Whether you are a group of friends saving for rent, or colleagues avoiding the 2026 tax sweep, DeFi Esusu restores your financial autonomy.

---

## 🌟 Key Features

### 1. 🔄 Decentralized Esusu Circles (Group Savings)
Create or join rotating savings groups that operate purely on smart contract logic.
* **Create & Share:** One user starts a circle (e.g., "50 USDC Monthly") and shares the unique **Circle ID** with trusted friends.
* **Automated Rotation:** The contract tracks the "Round" and automatically payouts the full pool to the current recipient.
* **Zero-Knowledge Participation:** Users join via Wallet Address, keeping their real-world identity decoupled from their savings.

### 2. 🏦 Personal Vault (Time-Locked Savings)
For individuals who want to save alone without exposing funds to annual credit limits.
* **Flexible Locking:** Users can deposit funds and set a specific lock duration (e.g., 3 months, 1 year).
* **Yield Simulation:** (Optional) Smart contracts simulate yield accrual for loyal savers.
* **24/7 Availability:** Unlike banks that may freeze accounts during audits, your Vault is always accessible via your private key.

### 3. ⚠️ Early Withdrawal Penalty (The "Discipline Protocol")
To discourage impulsive spending and mimic the discipline of fixed deposits:
* **The Rule:** Funds are locked until the `UnlockTime` expires.
* **The Exception:** Users *can* withdraw early in an emergency.
* **The Cost:** A strict **2% Penalty Fee** is charged on the principal if withdrawn before the unlock date. This fee is routed to the platform's treasury (or redistributed to the Esusu community).

---

## ⚙️ How It Works (The 2026 Evasion Strategy)

1.  **Deposit:** Instead of leaving idle cash in a bank account (where it contributes to "Total Annual Credit"), users convert Naira to **USDC** and deposit into a DeFi Esusu Circle or Vault.
2.  **Save:** The smart contract holds the assets securely on the BlockDAG network.
3.  **Withdraw:** When the cycle completes (or the tax window passes), users withdraw directly to their wallet or P2P exchange, bypassing the cumulative credit calculations of traditional banking.


### 3. 🧪 Built-in Test Ecosystem
* **Mock USDC:** Includes a custom USDC token so users can test without real money.

* **👨‍⚖️ For Judges:** To save you time, we have prepared a pre-funded Demo Wallet with BDAG and Mock USDC.

* **Private Key:** 0x701621132cae3d06f0748c697d7c6800448804499592a87be6b47d704ba4e496

* **Mock USDC Contract Address:** 0xee268f4ff160150312485a008dE2cC121107E209

* **Note:** This is a burner wallet strictly for testing purposes.
---

## 🛠️ Tech Stack

* **Blockchain:** BlockDAG (EVM Compatible)
* **Smart Contracts:** Solidity (v0.8.20)
* **Framework:** Hardhat
* **Frontend:** Next.js (React), TypeScript
* **Styling:** Tailwind CSS
* **Web3 Integration:** RainbowKit, Wagmi, Viem

---

## 🛠️ Project Structure

```bash
defi-esusu-evm/
├── contracts/               # Solidity Smart Contracts
│   ├── DeFiEsusu.sol        # Main logic (Circles & Vaults)
│   └── MockUSDC.sol         # Fake token for testing
├── scripts/
│   └── deploy.ts            # Deployment script
├── frontend/                # Next.js Frontend Application
│   ├── src/pages/           # UI Views
│   ├── src/constants.ts     # Contract Addresses & ABIs
│   └── tailwind.config.js   # Styling Config
└── hardhat.config.ts        # Blockchain Network Config