import { Chain } from 'wagmi'
 
export const fireChain = {
  id: 997,
  name: '5ireChain',
  network: 'avalanche',
  nativeCurrency: {
    decimals: 18,
    name: '5ireChain',
    symbol: '5ire',
  },
  rpcUrls: {
    public: { http: ['https://rpc-testnet.5ire.network'] },
    default: { http: ['https://rpc-testnet.5ire.network'] },
  },
  blockExplorers: {
    etherscan: { name: '5ire Explorer', url: 'https://explorer.5ire.network' },
    default: { name: '5ire Explorer', url: 'https://explorer.5ire.network' },
    },
} as const satisfies Chain