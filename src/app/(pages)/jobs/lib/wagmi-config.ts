import { createConfig, http, fallback, createStorage } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// Custom storage that intercepts the 'wagmi.injected.connected' key at READ time.
// wagmi's injected connector checks this key in isAuthorized() before calling
// window.ethereum.request(). By returning null when a non-MetaMask wallet controls
// window.ethereum, isAuthorized() returns false immediately — no window.ethereum call.
//
// This is checked at useEffect time (when reconnect fires), NOT at module init time,
// so it correctly detects Leap even though extensions inject asynchronously.
// MetaMask always exposes window.ethereum._metamask; Leap/Keplr do not.
const storage = createStorage({
  storage: typeof window !== 'undefined' ? {
    getItem(key: string) {
      if (key === 'wagmi.injected.connected') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const eth = (window as any).ethereum;
        if (!eth?._metamask) return null; // Non-MetaMask provider → block reconnect
      }
      return localStorage.getItem(key);
    },
    setItem: localStorage.setItem.bind(localStorage),
    removeItem: localStorage.removeItem.bind(localStorage),
  } : undefined,
});

export const config = createConfig({
  chains: [mainnet],
  // Plain injected() preserves EIP-6963 multi-provider discovery.
  // MetaMask (v11+) announces via EIP-6963 as 'io.metamask', giving it a direct
  // provider reference that bypasses window.ethereum proxy chains (Leap, etc.).
  connectors: [injected()],
  storage,
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
