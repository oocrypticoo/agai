import { createConfig, http, fallback } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet],
  // Plain injected() preserves EIP-6963 multi-provider discovery.
  // MetaMask (v11+) announces via EIP-6963 as 'io.metamask', giving it a direct
  // provider reference that bypasses window.ethereum proxy chains (Leap, etc.).
  connectors: [injected()],
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
