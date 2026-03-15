'use client';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { Wallet, LogOut, AlertTriangle, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

function decodeConnectError(error: unknown): string {
  const msg = (error as Error)?.message ?? String(error);
  if (msg.includes('rejected') || msg.includes('User rejected')) return 'Rejected';
  if (msg.includes('already pending')) return 'Check your wallet — a request is pending';
  if (
    msg.includes('Connector not found') ||
    msg.includes('Provider not found') ||
    msg.includes('No provider')
  ) return 'No wallet found';
  return 'Connection failed';
}

export function WalletButton() {
  const { address, isConnected, isConnecting, isReconnecting, chain } = useAccount();
  const { connect, connectors, isPending, error, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [connectError, setConnectError] = useState('');
  const [noWallet, setNoWallet] = useState(false);

  const wrongNetwork = isConnected && chain?.id !== mainnet.id;
  const loading = isConnecting || isReconnecting;

  // Detect if any injected wallet exists on the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setNoWallet(!window.ethereum);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const msg = decodeConnectError(error);
      setConnectError(msg);
      if (msg === 'No wallet found') setNoWallet(true);
      const t = setTimeout(() => { setConnectError(''); reset(); }, 4000);
      return () => clearTimeout(t);
    }
  }, [error, reset]);

  function handleConnect() {
    setConnectError('');
    if (noWallet) return; // handled by UI below
    const injected = connectors.find(c => c.type === 'injected') ?? connectors[0];
    if (injected) {
      connect({ connector: injected });
    } else {
      setNoWallet(true);
    }
  }

  if (!isConnected && !loading) {
    if (noWallet) {
      return (
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-degular-medium hover:bg-amber-500/20 transition-all duration-300"
        >
          <ExternalLink className="size-4" />
          Install MetaMask
        </a>
      );
    }

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

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#805abe]/30 bg-[#805abe]/10 text-[#805abe] text-sm font-degular-medium">
        <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Connecting...
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
