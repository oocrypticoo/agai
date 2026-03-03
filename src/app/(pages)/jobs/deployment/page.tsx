"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileCode } from "lucide-react";
import Footer from "@/app/sections/Footer";
import { CONTRACT_DEPLOYMENTS } from "../lib/demo-data";
import { shortenAddress } from "../lib/format";
import DemoBanner from "../components/DemoBanner";
import JobsSubNav from "../components/JobsSubNav";

const DeploymentPage: React.FC = () => {
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
            Deployment Registry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-text font-degular max-w-2xl mx-auto"
          >
            On-chain contract addresses and compiler configuration.
          </motion.p>
        </div>

        <DemoBanner />
        <JobsSubNav />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTRACT_DEPLOYMENTS.map((contract, index) => (
            <motion.div
              key={contract.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/5 dark:bg-white/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileCode className="w-5 h-5 text-[#805abe]" />
                <h2 className="text-lg font-bold font-degular text-heading">
                  {contract.name}
                </h2>
              </div>
              <dl className="space-y-3 text-sm font-degular">
                <div>
                  <dt className="text-xs text-text mb-0.5">Address</dt>
                  <dd className="text-heading font-mono text-xs bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg truncate">
                    {shortenAddress(contract.address)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text">Network</dt>
                  <dd className="text-heading font-degular-medium">
                    {contract.network}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text">Compiler</dt>
                  <dd className="text-heading font-degular-medium">
                    {contract.compiler}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text">Optimizer</dt>
                  <dd className="text-heading font-degular-medium">
                    {contract.optimizer ? "Enabled" : "Disabled"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text">Runs</dt>
                  <dd className="text-heading font-degular-medium">
                    {contract.runs}
                  </dd>
                </div>
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeploymentPage;
