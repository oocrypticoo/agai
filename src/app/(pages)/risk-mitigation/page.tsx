"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";

const page = () => {
  const [mounted, setMounted] = useState(false);

  const riskMitigations = [
    {
      risk: "Validator Bottleneck",
      solution: "Automated validation for 80% of routine tasks",
      severity: "High",
      status: "Mitigated",
    },
    {
      risk: "Economic Imbalance",
      solution: "Dynamic burn rates and progressive staking",
      severity: "Medium",
      status: "Monitored",
    },
    {
      risk: "Agent Concentration",
      solution: "Reputation decay and diversity incentives",
      severity: "Medium",
      status: "Active",
    },
    {
      risk: "System Attacks",
      solution: "Circuit breakers and multi-sig governance",
      severity: "Critical",
      status: "Protected",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-8 sm:p-16 transition-all duration-1000 cursor-pointer">
              <div className="text-center mb-16 centered-content">
                <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
                  Risk Mitigation Matrix
                </h3>
                <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                  Proactive safeguards against system failures and attacks
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {riskMitigations.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-[#222222] rounded-2xl p-5 sm:p-8 relative h-full"
                  >
                    <div className="flex sm:flex-row flex-col gap-4 sm:gap-0 items-start justify-between mb-4">
                      <h4 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide">
                        {item.risk}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-degular-medium bg-gray-200 dark:bg-[#1a1a1a] text-heading tracking-widest`}
                        >
                          {item.severity}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-degular-medium bg-gray-200 dark:bg-[#1a1a1a] text-heading tracking-widest`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-[18px] text-text leading-relaxed font-degular tracking-wide">
                      {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
