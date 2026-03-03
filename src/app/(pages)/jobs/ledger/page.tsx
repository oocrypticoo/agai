"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";
import { DEMO_JOBS } from "../lib/demo-data";
import DemoBanner from "../components/DemoBanner";
import JobsSubNav from "../components/JobsSubNav";
import JobTable from "../components/JobTable";

const LedgerPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-heading-invert">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold font-degular text-heading"
          >
            Jobs Ledger
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-text font-degular max-w-2xl mx-auto"
          >
            Browse all observed job contracts on the sovereign ledger.
          </motion.p>
        </div>

        <DemoBanner />
        <JobsSubNav />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <JobTable jobs={DEMO_JOBS} />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LedgerPage;
