"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import Footer from "@/app/sections/Footer";
import { PLATFORM_CONFIG } from "../lib/demo-data";
import { shortenAddress } from "../lib/format";
import DemoBanner from "../components/DemoBanner";
import JobsSubNav from "../components/JobsSubNav";

const OpsConsolePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const config = PLATFORM_CONFIG;

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
            Ops Console
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-text font-degular max-w-2xl mx-auto"
          >
            Platform safety controls, parameters, roles, and treasury — read-only in demo mode.
          </motion.p>
        </div>

        <DemoBanner />
        <JobsSubNav />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Safety Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/5 dark:bg-white/5"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#805abe]" />
              <h2 className="text-lg font-bold font-degular text-heading">
                Safety Controls
              </h2>
            </div>
            <dl className="space-y-4 text-sm font-degular">
              <div className="flex items-center justify-between">
                <dt className="text-text">Platform Status</dt>
                <dd>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-degular-medium ${
                      config.paused
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        config.paused ? "bg-red-400" : "bg-green-400"
                      }`}
                    />
                    {config.paused ? "Paused" : "Active"}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text">Emergency Pause</dt>
                <dd className="text-heading font-degular-medium opacity-50">
                  Disabled (demo)
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Parameters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/5 dark:bg-white/5"
          >
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-[#805abe]" />
              <h2 className="text-lg font-bold font-degular text-heading">
                Parameters
              </h2>
            </div>
            <dl className="space-y-4 text-sm font-degular">
              <div className="flex justify-between">
                <dt className="text-text">Quorum</dt>
                <dd className="text-heading font-degular-medium">
                  {config.quorum}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text">Required Approvals</dt>
                <dd className="text-heading font-degular-medium">
                  {config.requiredApprovals}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text">Review Period</dt>
                <dd className="text-heading font-degular-medium">
                  {config.reviewPeriodDays} days
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/5 dark:bg-white/5"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-[#805abe]" />
              <h2 className="text-lg font-bold font-degular text-heading">
                Roles
              </h2>
            </div>
            <div className="space-y-3">
              {config.roles.map((r) => (
                <div
                  key={r.address}
                  className="flex items-center justify-between text-sm font-degular"
                >
                  <div>
                    <p className="text-heading font-degular-medium">
                      {r.label}
                    </p>
                    <p className="text-xs text-text">
                      {shortenAddress(r.address)}
                    </p>
                  </div>
                  <span className="text-xs text-[#805abe] font-degular-medium capitalize">
                    {r.role}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Treasury */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/5 dark:bg-white/5"
          >
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-5 h-5 text-[#805abe]" />
              <h2 className="text-lg font-bold font-degular text-heading">
                Treasury
              </h2>
            </div>
            <dl className="space-y-4 text-sm font-degular">
              <div className="flex justify-between">
                <dt className="text-text">Address</dt>
                <dd className="text-heading font-degular-medium">
                  {shortenAddress(config.treasuryAddress)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text">Balance</dt>
                <dd className="text-heading font-degular-medium">
                  {config.treasuryBalanceEth} ETH
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OpsConsolePage;
