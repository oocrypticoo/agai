'use client';
import React, { useMemo, type ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// Use env-configurable RPC to avoid rate-limiting on the public endpoint.
// Set NEXT_PUBLIC_SOLANA_RPC in .env.local (e.g. a Helius or QuickNode URL).
const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://rpc.ankr.com/solana';

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
