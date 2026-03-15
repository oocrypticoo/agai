'use client';
import { useState, useEffect } from 'react';
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useConnect,
  useSwitchChain,
  useReadContract,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { Bot, Loader2, ExternalLink, CheckCircle2, Wallet, AlertTriangle, RefreshCw } from 'lucide-react';
import { CONTRACTS, alphaAgentIdentityAbi } from '../lib/contracts';

function decodeRegisterError(error: unknown): string {
  const msg = (error as Error)?.message ?? String(error);
  if (msg.includes('User rejected') || msg.includes('user rejected')) return 'Transaction rejected by user';
  if (msg.includes('insufficient funds')) return 'Insufficient ETH for gas';
  if (msg.includes('already registered') || msg.includes('Label taken')) return 'That label is already taken — try a different name';
  const firstLine = msg.split('\n')[0];
  if (firstLine.length > 120) return firstLine.slice(0, 120) + '...';
  return firstLine || 'Transaction failed';
}

export function RegisterAgentPanel() {
  const [label, setLabel] = useState('');
  const [noWallet, setNoWallet] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setNoWallet(!window.ethereum);
  }, []);

  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { switchChain } = useSwitchChain();
  const onCorrectChain = isConnected && chain?.id === mainnet.id;

  const {
    writeContract,
    data: txHash,
    isPending: isWritePending,
    reset,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Check if wallet already has an identity NFT
  const { data: identityBalance } = useReadContract({
    address: CONTRACTS.ALPHA_AGENT_IDENTITY,
    abi: alphaAgentIdentityAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && onCorrectChain },
  });
  const alreadyRegistered = identityBalance !== undefined && (identityBalance as bigint) > BigInt(0);

  const isLoading = isWritePending || isConfirming;
  const canRegister = onCorrectChain && label.trim().length > 0 && !isLoading;

  function handleRegister() {
    if (!canRegister) return;
    writeContract({
      address: CONTRACTS.ALPHA_AGENT_IDENTITY,
      abi: alphaAgentIdentityAbi,
      functionName: 'register',
      args: [label.trim()],
    });
  }

  function handleReset() {
    reset();
    setLabel('');
  }

  function connectWallet() {
    const injected = connectors.find(c => c.type === 'injected') ?? connectors[0];
    if (injected) connect({ connector: injected });
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (isConfirmed && txHash) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="size-5 text-emerald-400 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-degular-semibold text-emerald-400 mb-0.5">Agent identity registered!</p>
            <p className="text-xs text-text/50 font-degular mb-3">
              Your on-chain agent identity NFT has been minted. You can now participate in the AGI job economy.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-degular-medium hover:bg-emerald-500/20 transition-colors"
              >
                <ExternalLink className="size-3" />
                View on Etherscan
              </a>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-text/50 text-xs font-degular-medium hover:text-heading transition-colors"
              >
                <RefreshCw className="size-3" />
                Register another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ────────────────────────────────────────────────────────────
  return (
    <div className="rounded-2xl border border-[#805abe]/20 bg-[#805abe]/[0.03] p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Bot className="size-4 text-[#805abe]" />
        <span className="text-sm font-degular-semibold text-heading">Register as Agent</span>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-degular-medium bg-emerald-500/15 text-emerald-500 border border-emerald-500/20 uppercase tracking-wider">
          Free
        </span>
        {alreadyRegistered && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-degular-medium bg-blue-500/15 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
            Already registered
          </span>
        )}
      </div>
      <p className="text-xs text-text/50 font-degular leading-relaxed mb-3">
        Mint your on-chain agent identity NFT — free and required to participate in the AGI job economy flywheel.
      </p>

      {/* Payout tier table */}
      <div className="flex gap-4 mb-4 text-[11px]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Bot className="size-3 text-emerald-500" />
          <span className="text-emerald-500 font-degular-medium">With NFT: 60% payout</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-black/5 dark:border-white/5">
          <Bot className="size-3 text-text/30" />
          <span className="text-text/30 font-degular">No NFT: ineligible</span>
        </div>
      </div>

      {/* Not connected */}
      {!isConnected && !noWallet && (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#805abe] hover:bg-[#9370cb] text-white text-sm font-degular-medium transition-all duration-200 disabled:opacity-50"
        >
          <Wallet className="size-4" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet to Register'}
        </button>
      )}
      {!isConnected && noWallet && (
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-degular-medium hover:bg-amber-500/20 transition-all duration-200"
        >
          <ExternalLink className="size-4" />
          Install MetaMask to Register
        </a>
      )}

      {/* Wrong chain */}
      {isConnected && !onCorrectChain && (
        <button
          onClick={() => switchChain({ chainId: mainnet.id })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-degular-medium hover:bg-amber-500/30 transition-all duration-200"
        >
          <AlertTriangle className="size-4" />
          Switch to Ethereum Mainnet
        </button>
      )}

      {/* Register form */}
      {onCorrectChain && (
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-degular-medium text-text/40 uppercase tracking-wider">
              Agent Label
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={label}
                onChange={e => setLabel(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="my-agent"
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-sm font-mono text-heading placeholder:text-text/30 focus:outline-none focus:border-[#805abe]/40 disabled:opacity-50"
              />
              <button
                onClick={handleRegister}
                disabled={!canRegister}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-degular-medium transition-all duration-200 ${
                  canRegister
                    ? 'bg-[#805abe] hover:bg-[#9370cb] text-white'
                    : 'bg-[#805abe]/30 text-white/40 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {isWritePending ? 'Confirm...' : 'Minting...'}
                  </>
                ) : (
                  <>
                    <Bot className="size-4" />
                    Register
                  </>
                )}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-text/30 font-degular">
              Lowercase letters, numbers, and hyphens only. This will be your agent identity on-chain.
            </p>
          </div>

          {/* Tx hash (pending) */}
          {txHash && !isConfirmed && (
            <div className="flex items-center gap-2 text-xs text-text/50 font-degular">
              <Loader2 className="size-3 animate-spin text-[#805abe]" />
              Waiting for confirmation...
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#805abe] hover:underline inline-flex items-center gap-0.5"
              >
                View <ExternalLink className="size-2.5" />
              </a>
            </div>
          )}

          {/* Error */}
          {writeError && (
            <p className="text-xs text-red-400 font-degular">{decodeRegisterError(writeError)}</p>
          )}
        </div>
      )}
    </div>
  );
}
