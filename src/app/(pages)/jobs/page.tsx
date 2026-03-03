"use client";
import React, { useEffect, useState } from "react";
import { SplitString } from "@/app/utils/SplitString";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";
import { Briefcase, Search, Settings, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import DemoBanner from "./components/DemoBanner";
import JobsSubNav from "./components/JobsSubNav";
import { TERMS_AND_CONDITIONS } from "./lib/terms";

const Jobs: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [showDisclosure, setShowDisclosure] = useState(false);
  const text1 = SplitString("AGI Job Manager");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-heading-invert">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-degular text-heading leading-tight">
            <motion.span
              initial="hidden"
              animate="reveal"
              transition={{ staggerChildren: 0.02 }}
            >
              {text1.map((char, index) => (
                <motion.span
                  key={index}
                  variants={charVariants}
                  transition={{ duration: 0.5 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="-mt-1 text-sm sm:text-base tracking-widest uppercase text-text font-mono"
          >
            &gt; Sovereign Ops Console
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 text-lg sm:text-xl text-text font-degular max-w-2xl mx-auto"
          >
            Institutional dApp for escrow lifecycle, dispute governance, and
            safety-first operations.
          </motion.p>
        </div>

        <DemoBanner />
        <JobsSubNav />

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Create Job */}
          <button
            onClick={() => setShowDisclosure(true)}
            className="border border-black/10 dark:border-white/10 rounded-2xl p-8 hover:border-[#805abe]/30 hover:bg-[#805abe]/15 transition-colors duration-300 block text-left w-full"
          >
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="size-6 text-[#805abe]" />
              <h2 className="text-xl font-bold font-degular text-heading">
                Create Job
              </h2>
            </div>
            <p className="text-text font-degular text-sm leading-relaxed">
              Wallet required. Simulation-first.
            </p>
          </button>

          {/* Browse Jobs */}
          <Link
            href="/jobs/ledger"
            className="border border-black/10 dark:border-white/10 rounded-2xl p-8 hover:border-[#805abe]/30 hover:bg-[#805abe]/15 transition-colors duration-300 block"
          >
            <div className="flex items-center gap-3 mb-3">
              <Search className="size-6 text-[#805abe]" />
              <h2 className="text-xl font-bold font-degular text-heading">
                Browse Jobs
              </h2>
            </div>
            <p className="text-text font-degular text-sm leading-relaxed">
              6 total ids observed
            </p>
          </Link>

          {/* Platform Config */}
          <Link
            href="/jobs/ops"
            className="border border-black/10 dark:border-white/10 rounded-2xl p-8 hover:border-[#805abe]/30 hover:bg-[#805abe]/15 transition-colors duration-300 block"
          >
            <div className="flex items-center gap-3 mb-3">
              <Settings className="size-6 text-[#805abe]" />
              <h2 className="text-xl font-bold font-degular text-heading">
                Platform Config
              </h2>
            </div>
            <p className="text-text font-degular text-sm leading-relaxed">
              Quorum 2 · approvals 2
            </p>
          </Link>
        </motion.div>
      </div>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showDisclosure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            onClick={() => setShowDisclosure(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-black/10 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-[#805abe]" />
                  <h2 className="text-xl font-bold font-degular text-heading">
                    Terms &amp; Conditions
                  </h2>
                </div>
                <button
                  onClick={() => setShowDisclosure(false)}
                  className="text-text hover:text-heading transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable terms */}
              <div className="flex-1 px-8 py-6 min-h-0">
                <textarea
                  readOnly
                  value={TERMS_AND_CONDITIONS}
                  className="w-full h-full resize-none bg-black/5 dark:bg-white/5 rounded-lg p-4 text-xs sm:text-sm text-text font-mono leading-relaxed border border-black/10 dark:border-white/10 focus:outline-none"
                />
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-8 py-6 border-t border-black/10 dark:border-white/10 shrink-0">
                <button
                  onClick={() => setShowDisclosure(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-text hover:text-heading font-degular-medium text-sm transition-colors duration-300"
                >
                  Decline
                </button>
                <button
                  onClick={() => setShowDisclosure(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#805abe] hover:bg-[#b44ace] text-white font-degular-medium text-sm transition-colors duration-300"
                >
                  Accept &amp; Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Jobs;
