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
            className="border border-black/10 dark:border-white/10 rounded-2xl p-8 bg-white/5 dark:bg-white/5 hover:border-[#805abe]/30 transition-colors duration-300 block text-left w-full"
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
            className="border border-black/10 dark:border-white/10 rounded-2xl p-8 bg-white/5 dark:bg-white/5 hover:border-[#805abe]/30 transition-colors duration-300 block"
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
            className="border border-black/10 dark:border-white/10 rounded-2xl p-8 bg-white/5 dark:bg-white/5 hover:border-[#805abe]/30 transition-colors duration-300 block"
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

      {/* Disclosure Modal */}
      <AnimatePresence>
        {showDisclosure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={() => setShowDisclosure(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setShowDisclosure(false)}
                className="absolute top-4 right-4 text-text hover:text-heading transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-[#805abe]" />
                <h2 className="text-xl font-bold font-degular text-heading">
                  Disclosure
                </h2>
              </div>

              <div className="space-y-4 text-sm text-text font-degular leading-relaxed mb-8">
                <p>
                  By proceeding, you acknowledge and accept that protocol fees
                  generated by the AGIJobManager smart contract shall accrue to
                  the contract owner (the &ldquo;Operator&rdquo;). The Operator
                  is the entity that has deployed the smart contract and is
                  entitled to receive such fees in consideration for operating
                  the platform infrastructure.
                </p>
                <p>
                  In the present deployment, the Operator is identified as{" "}
                  <span className="font-degular-bold text-heading">
                    club.agi.eth
                  </span>
                  . This entity serves as the contract owner and sole
                  beneficiary of protocol fee revenue.
                </p>
                <p>
                  If the foregoing fee structure is not suitable for your
                  intended use case, you or any third party may independently
                  deploy and operate the smart contract under separate ownership,
                  subject to the terms of the applicable open-source license.
                </p>
              </div>

              <div className="flex gap-3">
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
