"use client";
import React, { useEffect, useState } from "react";
import { SplitString } from "@/app/utils/SplitString";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";
import { Briefcase, Search, Settings } from "lucide-react";
import Link from "next/link";
import DemoBanner from "./components/DemoBanner";
import JobsSubNav from "./components/JobsSubNav";

const Jobs: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("AGIJobManager ·");
  const text2 = SplitString("Sovereign Ops Console");

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
            <br />
            <motion.span
              initial="hidden"
              animate="reveal"
              transition={{ staggerChildren: 0.02, delayChildren: 0.3 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#805abe] to-[#b44ace]"
            >
              {text2.map((char, index) => (
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
          <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8 bg-white/5 dark:bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="size-6 text-[#805abe]" />
              <h2 className="text-xl font-bold font-degular text-heading">
                Create Job
              </h2>
            </div>
            <p className="text-text font-degular text-sm leading-relaxed">
              Wallet required. Simulation-first.
            </p>
          </div>

          {/* Browse Jobs */}
          <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8 bg-white/5 dark:bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Search className="size-6 text-[#805abe]" />
              <h2 className="text-xl font-bold font-degular text-heading">
                Browse Jobs
              </h2>
            </div>
            <p className="text-text font-degular text-sm leading-relaxed mb-3">
              6 total ids observed
            </p>
            <Link
              href="/jobs/ledger"
              className="text-[#805abe] hover:text-[#b44ace] font-degular-medium text-sm underline underline-offset-2 transition-colors duration-300"
            >
              Open jobs ledger
            </Link>
          </div>

          {/* Platform Config */}
          <div className="border border-black/10 dark:border-white/10 rounded-2xl p-8 bg-white/5 dark:bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="size-6 text-[#805abe]" />
              <h2 className="text-xl font-bold font-degular text-heading">
                Platform Config
              </h2>
            </div>
            <p className="text-text font-degular text-sm leading-relaxed mb-3">
              Quorum 2 · approvals 2
            </p>
            <Link
              href="/jobs/ops"
              className="text-[#805abe] hover:text-[#b44ace] font-degular-medium text-sm underline underline-offset-2 transition-colors duration-300"
            >
              Open ops console
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
