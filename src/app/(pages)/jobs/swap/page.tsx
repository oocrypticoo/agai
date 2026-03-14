'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ArrowRightLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/app/sections/Footer';

const AGIALPHA = '0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA';
const POOL = '0x4b54f2736c729220aa14c06636dd5c92a85d69a5';
const UNISWAP_SWAP_URL = `https://app.uniswap.org/swap?outputCurrency=${AGIALPHA}&chain=ethereum`;

// Intercept window.ethereum.request and strip explicit gasPrice / EIP-1559 fee fields
// so MetaMask falls back to its own Market estimate instead of "Site suggested".
function useMarketGas() {
  useEffect(() => {
    const eth = (window as unknown as { ethereum?: { request: (a: unknown) => Promise<unknown> } }).ethereum;
    if (!eth) return;

    const original = eth.request.bind(eth);

    eth.request = async (args: unknown) => {
      const a = args as { method: string; params?: Array<Record<string, unknown>> };
      if (a.method === 'eth_sendTransaction' && Array.isArray(a.params) && a.params[0]) {
        const tx = { ...a.params[0] };
        // Strip site-suggested gas so MetaMask uses Market
        delete tx.gasPrice;
        delete tx.maxFeePerGas;
        delete tx.maxPriorityFeePerGas;
        return original({ ...a, params: [tx] });
      }
      return original(args);
    };

    return () => {
      eth.request = original;
    };
  }, []);
}

function UniswapWidget() {
  useMarketGas();

  const src = `${UNISWAP_SWAP_URL}&theme=dark`;

  return (
    <div className="rounded-2xl border border-[#805abe]/20 bg-[#805abe]/5 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#805abe]/15">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="size-4 text-[#805abe]" />
          <span className="text-sm font-degular-medium text-heading">Swap ETH → AGIALPHA</span>
        </div>
        <a
          href={UNISWAP_SWAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-degular-medium text-[#805abe] border border-[#805abe]/20 hover:bg-[#805abe]/10 transition-colors"
        >
          <ExternalLink className="size-3" />
          Open in new tab
        </a>
      </div>

      {/* Iframe — no sandbox so MetaMask can inject */}
      <iframe
        src={src}
        height="660"
        width="100%"
        style={{ border: 'none', display: 'block' }}
        title="Uniswap swap widget"
        allow="clipboard-write; web-share"
      />
    </div>
  );
}

export default function SwapPage() {
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
            Swap for AGIALPHA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-text font-degular max-w-2xl mx-auto"
          >
            Buy AGIALPHA directly on Ethereum with ETH via Uniswap V3. No bridging required.
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">

          {/* Uniswap widget embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <UniswapWidget />
          </motion.div>

          {/* Pool info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-6"
          >
            <h2 className="text-sm font-degular-medium text-heading tracking-wide mb-4">Pool Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Pool Type</span>
                <p className="text-sm font-degular-medium text-heading mt-0.5">Uniswap V3 Concentrated</p>
              </div>
              <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Pair</span>
                <p className="text-sm font-degular-medium text-heading mt-0.5">AGIALPHA / WETH</p>
              </div>
              <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Network</span>
                <p className="text-sm font-degular-medium text-heading mt-0.5">Ethereum Mainnet</p>
              </div>
              <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3">
                <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Price Range</span>
                <p className="text-sm font-degular-medium text-heading mt-0.5">$0.00327 — $0.50</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
              <div>
                <p className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium mb-1">Pool Address</p>
                <a
                  href={`https://etherscan.io/address/${POOL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-text/50 hover:text-[#805abe] font-mono transition-colors"
                >
                  {POOL}
                  <ExternalLink className="size-3" />
                </a>
              </div>
              <div>
                <p className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium mb-1">AGIALPHA Token</p>
                <a
                  href={`https://etherscan.io/token/${AGIALPHA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-text/50 hover:text-[#805abe] font-mono transition-colors"
                >
                  {AGIALPHA}
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Why swap vs bridge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="rounded-2xl border border-[#805abe]/20 bg-[#805abe]/5 p-6"
          >
            <h2 className="text-sm font-degular-medium text-heading tracking-wide mb-2">Swap vs Bridge</h2>
            <p className="text-sm text-text/60 font-degular tracking-wide">
              <strong className="text-heading">Swap (recommended)</strong> — Buy AGIALPHA directly with ETH on Ethereum. One transaction, no bridging, tokens are ready to use immediately for job bonds and escrow.
            </p>
            <p className="text-sm text-text/60 font-degular tracking-wide mt-2">
              <strong className="text-heading">Bridge</strong> — Transfer existing Solana AGIALPHA to Ethereum via deBridge, then convert through MinterVault. Two chains, multiple steps.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
