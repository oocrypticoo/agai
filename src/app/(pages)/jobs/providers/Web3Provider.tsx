'use client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../lib/wagmi-config';
import { useState, type ReactNode } from 'react';

// Clear wagmi's persisted connection if a Cosmos wallet (Leap, Keplr) has hijacked
// window.ethereum. Without this, wagmi's auto-reconnect calls window.ethereum.request()
// which routes through Leap's buggy EVM proxy, causing a stack overflow on page refresh.
// MetaMask always exposes window.ethereum._metamask; wallets faking isMetaMask don't.
function clearLeapConflict() {
  if (typeof window === 'undefined') return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eth = window.ethereum as any;
    const isCosmosWallet = eth?.isLeap || eth?.isKeplr;
    const isFakingMetaMask = eth?.isMetaMask && !eth?._metamask;
    if (isCosmosWallet || isFakingMetaMask) {
      // wagmi prefixes all storage keys with 'wagmi.' (see createStorage.js)
      // 'wagmi.injected.connected' is the critical one: if set, isAuthorized() calls
      // window.ethereum.request() which routes through Leap's proxy → stack overflow.
      localStorage.removeItem('wagmi.store');
      localStorage.removeItem('wagmi.injected.connected');
      localStorage.removeItem('wagmi.recentConnectorId');
    }
  } catch { /* storage unavailable */ }
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  // Runs synchronously before WagmiProvider mounts and triggers reconnect
  clearLeapConflict();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
