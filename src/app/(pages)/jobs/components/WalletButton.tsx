'use client';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { Wallet, LogOut, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WalletButton() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [connectError, setConnectError] = useState('');

  const wrongNetwork = isConnected && chain?.id !== mainnet.id;

  useEffect(() => {
    if (error) {
      setConnectError(error.message.includes('rejected') ? 'Rejected' : 'Connection failed');
      const t = setTimeout(() => { setConnectError(''); reset(); }, 3000);
      return () => clearTimeout(t);
    }
  }, [error, reset]);

  function handleConnect() {
    setConnectError('');
    // Prefer EIP-6963 MetaMask (io.metamask) — uses a direct provider reference
    // that bypasses window.ethereum proxy chains from Cosmos wallet extensions.
    // Falls back to any injected provider, then first available connector.
    const connector =
      connectors.find(c => c.id === 'io.metamask') ??
      connectors.find(c => c.type === 'injected') ??
      connectors[0];
    if (connector) connect({ connector });
  }

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleConnect}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#805abe] hover:bg-[#9370cb] text-white text-sm font-degular-medium transition-all duration-300 disabled:opacity-50"
        >
          <Wallet className="size-4" />
          {isPending ? 'Confirm in wallet...' : 'Connect Wallet'}
        </button>
        {connectError && (
          <span className="text-red-400 text-xs font-degular-medium">{connectError}</span>
        )}
      </div>
    );
  }

  if (wrongNetwork) {
    return (
      <button
        onClick={() => switchChain({ chainId: mainnet.id })}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-degular-medium hover:bg-amber-500/30 transition-all duration-300"
      >
        <AlertTriangle className="size-4" />
        Switch to Mainnet
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] text-sm">
        <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-text font-mono text-xs">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
      <div className="px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] text-xs text-text font-degular">
        {chain?.name ?? 'Unknown'}
      </div>
      <button
        onClick={() => disconnect()}
        className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] text-text hover:text-red-400 hover:border-red-400/30 transition-all duration-300"
        title="Disconnect"
      >
        <LogOut className="size-3.5" />
      </button>
    </div>
  );
}
