'use client';
import React, { useMemo, useState, useEffect, type ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// Proxy Solana RPC through our API route to avoid CORS/rate-limit issues.
// Override with NEXT_PUBLIC_SOLANA_RPC if you have a dedicated endpoint.
function getSolanaRpc() {
  if (process.env.NEXT_PUBLIC_SOLANA_RPC) return process.env.NEXT_PUBLIC_SOLANA_RPC;
  if (typeof window !== 'undefined') return `${window.location.origin}/api/solana-rpc`;
  return 'https://api.mainnet-beta.solana.com'; // SSR fallback
}

export function SolanaProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const endpoint = useMemo(() => getSolanaRpc(), [mounted]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
