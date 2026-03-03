"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";
import { DEMO_SCENARIOS } from "../lib/demo-data";
import DemoBanner from "../components/DemoBanner";
import JobsSubNav from "../components/JobsSubNav";

const ACTOR_COLORS: Record<string, string> = {
  employer: "bg-blue-500/10 text-blue-400",
  agent: "bg-yellow-500/10 text-yellow-400",
  arbiter: "bg-purple-500/10 text-purple-400",
  admin: "bg-gray-500/10 text-gray-400",
};

const DemoScenariosPage: React.FC = () => {
  const router = useRouter();
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
            Demo Scenarios
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-text font-degular max-w-2xl mx-auto"
          >
            Pre-built scenarios illustrating each stage of the escrow lifecycle.
          </motion.p>
        </div>

        <DemoBanner />
        <JobsSubNav />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-5xl mx-auto overflow-x-auto"
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider">
                  #
                </th>
                <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider">
                  Scenario
                </th>
                <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider">
                  Actor
                </th>
                <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider hidden sm:table-cell">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody>
              {DEMO_SCENARIOS.map((scenario, index) => (
                <motion.tr
                  key={scenario.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                  onClick={() => router.push(`/jobs/${scenario.jobId}`)}
                  className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="py-4 text-sm font-degular text-text">
                    {scenario.id}
                  </td>
                  <td className="py-4">
                    <p className="text-sm font-degular-medium text-heading">
                      {scenario.title}
                    </p>
                    <p className="text-xs text-text font-degular mt-0.5 max-w-[300px]">
                      {scenario.description}
                    </p>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-degular-medium capitalize ${
                        ACTOR_COLORS[scenario.actor] || "text-text"
                      }`}
                    >
                      {scenario.actor}
                    </span>
                  </td>
                  <td className="py-4 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {scenario.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs font-degular text-text border border-black/10 dark:border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DemoScenariosPage;
