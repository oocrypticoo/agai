'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/app/sections/Footer';

const AGIALPHA = '0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA';
const POOL = '0x4b54f2736c729220aa14c06636dd5c92a85d69a5';

// Uniswap app URL pre-filled to swap ETH → AGIALPHA
const UNISWAP_SWAP_URL = `https://app.uniswap.org/swap?outputCurrency=${AGIALPHA}&chain=ethereum`;

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

          {/* Uniswap embed via iframe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] overflow-hidden"
          >
            <iframe
              src={`https://app.uniswap.org/swap?outputCurrency=${AGIALPHA}&chain=ethereum&theme=dark`}
              width="100%"
              height="660"
              className="border-0"
              title="Uniswap Swap"
              allow="clipboard-write"
            />
          </motion.div>

          {/* Fallback link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center"
          >
            <a
              href={UNISWAP_SWAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#805abe] hover:bg-[#9370cb] text-white text-sm font-degular-medium transition-all duration-300"
            >
              <ArrowRightLeft className="size-4" />
              Open in Uniswap
              <ExternalLink className="size-3.5 opacity-60" />
            </a>
            <p className="mt-3 text-xs text-text/40 font-degular">
              If the widget doesn&apos;t load, use the button above to swap directly on Uniswap.
            </p>
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
