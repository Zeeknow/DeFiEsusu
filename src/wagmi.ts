import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { type Chain } from 'wagmi/chains';

// 1. Define the BlockDAG Network
const blockdagChain: Chain = {
  id: 1043, // From your screenshot
  name: 'BlockDAG Awakening',
  nativeCurrency: {
    decimals: 18,
    name: 'BlockDAG',
    symbol: 'BDAG',
  },
  rpcUrls: {
    default: { http: ['https://rpc.awakening.bdagscan.com'] },
    public: { http: ['https://rpc.awakening.bdagscan.com'] },
  },
  blockExplorers: {
    default: { name: 'BlockDAG Scan', url: 'https://awakening.bdagscan.com' },
  },
  testnet: true,
};

// 2. Configure the App
export const config = getDefaultConfig({
  appName: 'DeFi Esusu',
  projectId: 'YOUR_PROJECT_ID', // You can keep this as 'YOUR_PROJECT_ID' for testing
  chains: [blockdagChain],
  transports: {
    [blockdagChain.id]: http(),
  },
  ssr: true, // Server Side Rendering
});