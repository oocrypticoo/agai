'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightLeft, ArrowLeft, ArrowDown, ExternalLink, Loader2,
  CheckCircle2, Wallet, Info,
} from 'lucide-react';
import Link from 'next/link';
import { useAccount, useConnect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import Footer from '@/app/sections/Footer';
import { SolanaProvider } from './SolanaProvider';
import {
  CONTRACTS, erc20Abi, minterVaultAbi, SOLANA_MINT,
} from '../lib/contracts';

// AGIALPHA on Solana has 6 decimals
const SOL_TOKEN_DECIMALS = 6;
// deBridge chain IDs
const ETH_CHAIN_ID = 1;
const SOLANA_CHAIN_ID = 7565164;
// deBridge dePort fee structure
const DEBRIDGE_FIXED_FEE_SOL = 0.03;   // Protocol fee in SOL
const DEBRIDGE_TRANSFER_FEE_BPS = 4;   // 4 bps = 0.04% of token amount

// Fee calculation result
interface BridgeFeeInfo {
  fixedFeeSol: number;       // Fixed fee in SOL
  transferFeeTokens: number; // Transfer fee in AGIALPHA
  receiveAmount: number;     // Final amount after transfer fee
}

// ── Inner component (needs Solana wallet context) ─────────────────────────────

function BridgeInner() {
  const [mounted, setMounted] = useState(false);
  const [bridgeAmount, setBridgeAmount] = useState('10000');
  const [depositAmount, setDepositAmount] = useState('');

  // Solana AGIALPHA balance
  const [solBalance, setSolBalance] = useState<bigint | null>(null);
  const [solBalanceLoading, setSolBalanceLoading] = useState(false);

  // Fee calculation
  const [feeInfo, setFeeInfo] = useState<BridgeFeeInfo | null>(null);
  const [feeLoading, setFeeLoading] = useState(false);

  // Bridge state
  const [bridgeError, setBridgeError] = useState('');

  // Wallets
  const { address: ethAddress, isConnected: ethConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { publicKey: solPublicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => { setMounted(true); }, []);

  // ── Fetch Solana SPL token balance ──────────────────────────────────────

  const fetchSolBalance = useCallback(async () => {
    if (!solPublicKey) {
      setSolBalance(null);
      return;
    }
    setSolBalanceLoading(true);
    try {
      const mint = new PublicKey(SOLANA_MINT);

      // Use getTokenAccountsByOwner — more reliable than getAccount on ATA
      const response = await connection.getTokenAccountsByOwner(solPublicKey, { mint });

      if (response.value.length > 0) {
        // Parse token amount from account data
        // SPL token account data: first 32 bytes = mint, next 32 = owner, next 8 = amount (LE u64)
        const data = response.value[0].account.data;
        const amount = data.readBigUInt64LE(64);
        setSolBalance(amount);
      } else {
        setSolBalance(BigInt(0));
      }
    } catch (err) {
      console.error('Failed to fetch Solana balance:', err);
      // Don't set to 0 on 403/network error so user sees "Error" not "0"
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('403') || msg.includes('forbidden')) {
        setSolBalance(null);  // Will show "RPC error" in UI
        setBridgeError('Solana RPC returned 403. Set NEXT_PUBLIC_SOLANA_RPC in .env.local with a Helius/QuickNode endpoint.');
      } else {
        setSolBalance(BigInt(0));
      }
    } finally {
      setSolBalanceLoading(false);
    }
  }, [solPublicKey, connection]);

  useEffect(() => { fetchSolBalance(); }, [fetchSolBalance]);

  // ── Calculate deBridge fees when amount changes ───────────────────────
  // dePort fee: 0.03 SOL protocol fee + 4 bps (0.04%) transfer fee on token amount

  useEffect(() => {
    const amountNum = parseFloat(bridgeAmount);
    if (!amountNum || amountNum <= 0) {
      setFeeInfo(null);
      return;
    }
    const transferFee = amountNum * DEBRIDGE_TRANSFER_FEE_BPS / 10000;
    setFeeInfo({
      fixedFeeSol: DEBRIDGE_FIXED_FEE_SOL,
      transferFeeTokens: transferFee,
      receiveAmount: amountNum - transferFee,
    });
    setFeeLoading(false);
  }, [bridgeAmount]);

  // ── Token reads (Ethereum) ──────────────────────────────────────────────

  const { data: bridgedBalance, refetch: refetchBridged } = useReadContract({
    address: CONTRACTS.AGIALPHA_BRIDGED,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: ethAddress ? [ethAddress] : undefined,
    query: { enabled: !!ethAddress, refetchInterval: 15000 },
  });

  const { data: officialBalance, refetch: refetchOfficial } = useReadContract({
    address: CONTRACTS.AGIALPHA_OFFICIAL,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: ethAddress ? [ethAddress] : undefined,
    query: { enabled: !!ethAddress, refetchInterval: 15000 },
  });

  const { data: vaultAllowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACTS.AGIALPHA_BRIDGED,
    abi: erc20Abi,
    functionName: 'allowance',
    args: ethAddress ? [ethAddress, CONTRACTS.MINTER_VAULT] : undefined,
    query: { enabled: !!ethAddress, refetchInterval: 15000 },
  });

  // ── Write: Approve bridged tokens → MinterVault ────────────────────────

  const { writeContract: approveWrite, data: approveHash, isPending: isApproving } = useWriteContract();
  const { isLoading: isApproveConfirming, isSuccess: approveConfirmed } = useWaitForTransactionReceipt({ hash: approveHash });

  // ── Write: depositExact on MinterVault ──────────────────────────────────

  const { writeContract: depositWrite, data: depositHash, isPending: isDepositing } = useWriteContract();
  const { isLoading: isDepositConfirming, isSuccess: depositConfirmed } = useWaitForTransactionReceipt({ hash: depositHash });

  useEffect(() => {
    if (approveConfirmed) refetchAllowance();
  }, [approveConfirmed, refetchAllowance]);

  useEffect(() => {
    if (depositConfirmed) {
      refetchBridged();
      refetchOfficial();
      refetchAllowance();
    }
  }, [depositConfirmed, refetchBridged, refetchOfficial, refetchAllowance]);

  // ── Derived ─────────────────────────────────────────────────────────────

  const depositParsed = useMemo(() => {
    try { return depositAmount ? parseUnits(depositAmount, 6) : BigInt(0); }
    catch { return BigInt(0); }
  }, [depositAmount]);

  const needsApproval = useMemo(() => {
    if (!vaultAllowance || depositParsed === BigInt(0)) return true;
    return depositParsed > (vaultAllowance as bigint);
  }, [vaultAllowance, depositParsed]);

  // Human-readable Solana balance
  const solBalanceFormatted = solBalance !== null
    ? Number(solBalance) / (10 ** SOL_TOKEN_DECIMALS)
    : null;

  // ── deBridge widget URL ─────────────────────────────────────────────────
  // The deBridge dePort SDK doesn't have a registered bridge for this token,
  // so we use the deBridge app with pre-filled parameters for the bridge tx.

  const deBridgeUrl = useMemo(() => {
    const amt = bridgeAmount && parseFloat(bridgeAmount) > 0 ? bridgeAmount : '';
    const params = new URLSearchParams({
      inputChain: SOLANA_CHAIN_ID.toString(),
      outputChain: ETH_CHAIN_ID.toString(),
      inputCurrency: SOLANA_MINT,
      outputCurrency: CONTRACTS.AGIALPHA_BRIDGED,
      ...(amt ? { amount: amt.toString() } : {}),
      ...(ethAddress ? { address: ethAddress } : {}),
    });
    return `https://app.debridge.finance/deport?${params.toString()}`;
  }, [bridgeAmount, ethAddress]);

  // ── Preset handlers ─────────────────────────────────────────────────────

  function setPreset(pct: number) {
    if (solBalanceFormatted === null || solBalanceFormatted === 0) return;
    const val = pct === 100
      ? solBalanceFormatted
      : Math.floor(solBalanceFormatted * pct / 100);
    setBridgeAmount(val.toString());
  }

  // ── Vault handlers ──────────────────────────────────────────────────────

  function handleApprove() {
    if (!depositParsed) return;
    approveWrite({
      address: CONTRACTS.AGIALPHA_BRIDGED,
      abi: erc20Abi,
      functionName: 'approve',
      args: [CONTRACTS.MINTER_VAULT, depositParsed],
    });
  }

  function handleDeposit() {
    if (!depositParsed || !ethAddress) return;
    // 1:1 mint after decimal scaling (6 dec → 18 dec), so expected output = amount * 10^12
    // Set minMintOut to 0 for simplicity (no slippage on a 1:1 vault)
    depositWrite({
      address: CONTRACTS.MINTER_VAULT,
      abi: minterVaultAbi,
      functionName: 'depositExact',
      args: [depositParsed, ethAddress, BigInt(0)],
    });
  }

  function handleMaxDeposit() {
    // Use bridged balance (what MinterVault accepts)
    const bal = bridgedBalance as bigint | undefined;
    if (bal !== undefined) {
      setDepositAmount(formatUnits(bal, 6));
    }
  }

  function handleEthConnect() {
    const injected = connectors.find(c => c.type === 'injected') ?? connectors[0];
    if (injected) connect({ connector: injected });
  }

  // ── Guard ───────────────────────────────────────────────────────────────

  if (!mounted) return null;

  // (bridge action handled via deBridge app link)

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-heading-invert">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-text/60 hover:text-heading font-degular-medium transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Jobs
          </Link>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold font-degular text-heading"
          >
            Bridge AGIALPHA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-text font-degular max-w-2xl mx-auto"
          >
            Bridge from Solana to Ethereum via deBridge, then deposit into MinterVault.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">

          {/* ═══ Stage 1 — Bridge via deBridge ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <ArrowRightLeft className="size-5 text-[#805abe]" />
              <h2 className="text-lg font-degular-semibold text-heading">Stage 1 &mdash; Bridge via deBridge</h2>
            </div>

            {/* Wallet connection status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <SolanaWalletCard />
              <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="size-3.5 text-blue-400" />
                  <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Ethereum Wallet</span>
                </div>
                {ethConnected ? (
                  <p className="text-sm font-mono text-emerald-400 truncate">{ethAddress}</p>
                ) : (
                  <button
                    onClick={handleEthConnect}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs text-text/60 hover:text-heading hover:border-[#805abe]/30 hover:bg-[#805abe]/5 font-degular-medium transition-all"
                  >
                    <Wallet className="size-4" />
                    Connect MetaMask
                  </button>
                )}
              </div>
            </div>

            {/* Amount input */}
            <div className="space-y-4">
              <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">You send (Solana)</span>
                  <span className="text-[10px] text-text/30 font-degular-medium">
                    Balance: {!solPublicKey ? 'Connect wallet' : solBalanceLoading ? '...' : solBalanceFormatted !== null ? solBalanceFormatted.toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="number"
                    value={bridgeAmount}
                    onChange={(e) => setBridgeAmount(e.target.value)}
                    className="flex-1 bg-transparent text-2xl font-degular-bold text-heading focus:outline-none tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="10000"
                  />
                  <span className="text-sm text-text/40 font-degular-medium shrink-0">AGIALPHA</span>
                </div>
                {/* Preset buttons — always visible */}
                <div className="flex gap-2 mt-3">
                  {[
                    { label: '10%', pct: 10 },
                    { label: '50%', pct: 50 },
                    { label: 'Max', pct: 100 },
                  ].map(({ label, pct }) => (
                    <button
                      key={label}
                      onClick={() => setPreset(pct)}
                      disabled={!solPublicKey || solBalanceFormatted === null || solBalanceFormatted === 0}
                      className="px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 text-xs text-text/50 hover:text-[#805abe] hover:border-[#805abe]/30 hover:bg-[#805abe]/5 disabled:opacity-30 disabled:cursor-not-allowed font-degular-medium transition-all"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="size-5 text-text/20" />
              </div>

              <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">You receive (Ethereum)</span>
                  <span className="text-[10px] text-text/30 font-degular-medium">dePort bridge</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <p className="flex-1 text-2xl font-degular-bold text-heading tabular-nums">
                    {feeLoading ? (
                      <span className="text-text/30 text-lg">Calculating...</span>
                    ) : feeInfo ? (
                      feeInfo.receiveAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })
                    ) : bridgeAmount && parseFloat(bridgeAmount) > 0 ? (
                      <span className="text-text/30">&mdash;</span>
                    ) : (
                      <span className="text-text/20">&mdash;</span>
                    )}
                  </p>
                  <span className="text-sm text-text/40 font-degular-medium shrink-0">bridged AGIALPHA</span>
                </div>
                {/* Fee breakdown */}
                {feeInfo && (
                  <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-text/40 font-degular-medium flex items-center gap-1">
                        <Info className="size-3" />
                        Transfer fee ({(feeInfo.transferFeeTokens / parseFloat(bridgeAmount) * 100).toFixed(2)}%)
                      </span>
                      <span className="text-text/50 font-mono">−{feeInfo.transferFeeTokens.toLocaleString(undefined, { maximumFractionDigits: 2 })} AGIALPHA</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-text/40 font-degular-medium flex items-center gap-1">
                        <Info className="size-3" />
                        Protocol fee (SOL)
                      </span>
                      <span className="text-text/50 font-mono">{feeInfo.fixedFeeSol.toFixed(4)} SOL</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bridge error */}
            {bridgeError && (
              <div className="mt-4 flex items-start gap-2 text-sm text-red-400 font-degular">
                <span className="shrink-0 mt-0.5">!</span>
                <span className="break-all">{bridgeError}</span>
              </div>
            )}

            {/* Bridge action — opens deBridge app with pre-filled parameters */}
            <div className="mt-6">
              <a
                href={deBridgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#805abe] hover:bg-[#9370cb] text-white text-sm font-degular-medium transition-all duration-300"
              >
                <ArrowRightLeft className="size-4" />
                Bridge to Ethereum
                <ExternalLink className="size-3.5 opacity-60" />
              </a>
              <p className="mt-3 text-xs text-text/40 font-degular">
                Opens deBridge with pre-filled amount and token. Complete the bridge there, then return to deposit below.
              </p>
            </div>
          </motion.div>

          {/* ═══ Stage 2 — MinterVault Deposit ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle2 className="size-5 text-emerald-400" />
              <h2 className="text-lg font-degular-semibold text-heading">Stage 2 &mdash; Deposit to MinterVault</h2>
            </div>

            {!ethConnected ? (
              <div className="text-center py-8">
                <p className="text-sm text-text/60 font-degular mb-4">Connect your Ethereum wallet to deposit bridged tokens.</p>
                <button
                  onClick={handleEthConnect}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#805abe] hover:bg-[#9370cb] text-white text-sm font-degular-medium transition-all duration-300"
                >
                  <Wallet className="size-4" />
                  Connect Wallet
                </button>
              </div>
            ) : (
              <>
                {/* Balance cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-4">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Bridged AGIALPHA</span>
                    <p className="text-lg font-degular-bold text-heading mt-1 tabular-nums">
                      {bridgedBalance !== undefined ? Number(formatUnits(bridgedBalance as bigint, 6)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '...'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-4">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Official AGIALPHA</span>
                    <p className="text-lg font-degular-bold text-heading mt-1 tabular-nums">
                      {officialBalance !== undefined ? Number(formatUnits(officialBalance as bigint, 18)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '...'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-4">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Vault Allowance</span>
                    <p className="text-lg font-degular-bold text-heading mt-1 tabular-nums">
                      {vaultAllowance !== undefined ? Number(formatUnits(vaultAllowance as bigint, 6)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '...'}
                    </p>
                  </div>
                </div>

                {/* Deposit input */}
                <div className="flex items-center gap-3 mb-4">
                  <label className="text-sm text-text/60 font-degular-medium shrink-0">Deposit:</label>
                  <input
                    type="text"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-sm font-mono focus:border-[#805abe]/50 focus:outline-none transition-colors"
                    placeholder="0.0"
                  />
                  <button
                    onClick={handleMaxDeposit}
                    className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 text-xs text-text/60 hover:text-[#805abe] hover:border-[#805abe]/30 transition-all font-degular-medium"
                  >
                    Max
                  </button>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  {needsApproval ? (
                    <button
                      onClick={handleApprove}
                      disabled={isApproving || isApproveConfirming || depositParsed === BigInt(0)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-degular-medium transition-all duration-300"
                    >
                      {(isApproving || isApproveConfirming) && <Loader2 className="size-4 animate-spin" />}
                      {isApproveConfirming ? 'Confirming...' : isApproving ? 'Approve in wallet...' : 'Approve Bridged Tokens'}
                    </button>
                  ) : (
                    <button
                      onClick={handleDeposit}
                      disabled={isDepositing || isDepositConfirming || depositParsed === BigInt(0)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#805abe] hover:bg-[#9370cb] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-degular-medium transition-all duration-300"
                    >
                      {(isDepositing || isDepositConfirming) && <Loader2 className="size-4 animate-spin" />}
                      {isDepositConfirming ? 'Confirming...' : isDepositing ? 'Confirm in wallet...' : 'Deposit to MinterVault'}
                    </button>
                  )}
                </div>

                {approveConfirmed && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400 font-degular">
                    <CheckCircle2 className="size-4" /> Approval confirmed. You can now deposit.
                  </div>
                )}
                {depositConfirmed && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400 font-degular">
                    <CheckCircle2 className="size-4" /> Deposit confirmed! Official AGIALPHA minted to your wallet.
                  </div>
                )}

                {/* Vault address */}
                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5">
                  <p className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium mb-1">MinterVault Contract</p>
                  <a
                    href={`https://etherscan.io/address/${CONTRACTS.MINTER_VAULT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-text/50 hover:text-[#805abe] font-mono transition-colors"
                  >
                    {CONTRACTS.MINTER_VAULT}
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ── Solana wallet card ────────────────────────────────────────────────────────

function SolanaWalletCard() {
  const { publicKey, connected, select, wallets, connect, disconnect } = useWallet();

  return (
    <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 mb-2">
        <Wallet className="size-3.5 text-purple-400" />
        <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Solana Wallet</span>
      </div>
      {connected && publicKey ? (
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-mono text-emerald-400 truncate">{publicKey.toBase58()}</p>
          <button
            onClick={() => disconnect()}
            className="text-[10px] text-text/30 hover:text-red-400 font-degular-medium transition-colors shrink-0"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {wallets.filter(w => w.readyState === 'Installed' && w.adapter.name !== 'MetaMask').length > 0 ? (
            wallets.filter(w => w.readyState === 'Installed' && w.adapter.name !== 'MetaMask').map((w) => (
              <button
                key={w.adapter.name}
                onClick={() => { select(w.adapter.name); connect(); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs text-text/60 hover:text-heading hover:border-[#805abe]/30 hover:bg-[#805abe]/5 font-degular-medium transition-all"
              >
                {w.adapter.icon && (
                  <img src={w.adapter.icon} alt="" className="size-4" />
                )}
                {w.adapter.name}
              </button>
            ))
          ) : (
            <p className="text-xs text-text/40 font-degular">No Solana wallet detected. Install Phantom or Solflare.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Page export (wraps with SolanaProvider) ────────────────────────────────────

export default function BridgePage() {
  return (
    <SolanaProvider>
      <BridgeInner />
    </SolanaProvider>
  );
}
