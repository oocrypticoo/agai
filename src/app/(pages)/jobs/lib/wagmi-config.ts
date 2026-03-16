import { createConfig, http, fallback } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet],
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
