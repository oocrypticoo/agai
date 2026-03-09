'use client';
import React, { useMemo, type ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// Proxy Solana RPC through our API route to avoid CORS/rate-limit issues.
// Override with NEXT_PUBLIC_SOLANA_RPC if you have a dedicated endpoint.
const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC || '/api/solana-rpc';

export function SolanaProvider({ children }: { children: ReactNode }) {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <ConnectionProvider endpoint={SOLANA_RPC}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
