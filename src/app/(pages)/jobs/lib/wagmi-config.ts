import { createConfig, http, fallback } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected({
      // Target MetaMask specifically — prevents Cosmos wallets (Leap, Keplr) that
      // inject into window.ethereum from causing stack overflows in wagmi's EVM calls.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      target(): any {
        if (typeof window === 'undefined') return undefined;
        const eth = window.ethereum as any;
        // Multi-provider array (EIP-5749): pick MetaMask when multiple wallets coexist
        if (Array.isArray(eth?.providers)) {
          const mm = eth.providers.find((p: any) => p.isMetaMask);
          if (mm) return { id: 'metaMask', name: 'MetaMask', provider: mm };
        }
        // Single provider — only bind if it's actually MetaMask
        if (eth?.isMetaMask) return { id: 'metaMask', name: 'MetaMask', provider: eth };
        return undefined;
      },
    }),
  ],
  transports: {
    [mainnet.id]: fallback([
      http('https://dawn-black-breeze.quiknode.pro/7b4b95c9661170c630aa301578da9ac7efb81079/'),
      http('https://eth.llamarpc.com'),
      http('https://ethereum-rpc.publicnode.com'),
      http('https://1rpc.io/eth'),
    ]),
  },
  ssr: true,
});
