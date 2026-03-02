"use client";
import React, { useEffect, useState } from "react";
import { Shield, Zap, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import Footer from "@/app/sections/Footer";

const TokenEconomy: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("α-AGI Utility");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const tokenFeatures = [
    {
      icon: Shield,
      title: "Utility-Only Token",
      description:
        "Strict utility token - a form of prepaid credit that grants access to AGI Alpha Agent network services.",
      highlight: "No equity or ownership rights",
    },
    {
      icon: Zap,
      title: "Advance Payment Mechanism",
      description:
        "Purchasing $AGIALPHA is effectively buying credits for future AI services, funding network development.",
      highlight: "Prepayment for AI capabilities",
    },
    {
      icon: TrendingUp,
      title: "Deflationary Burn Model",
      description:
        "1% burn applied to every job payout, continuously reducing supply and concentrating value.",
      highlight: "1% burn on all transactions",
    },
    {
      icon: Users,
      title: "Network Incentives",
      description:
        "Rewards validators, agents, and early adopters through transparent smart contract mechanisms.",
      highlight: "Merit-based distribution",
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
          {/* Section Header */}
          <motion.h1
            className="mb-8 font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide text-center"
            style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.04, delayChildren: 0.5 }}
          >
            {text1.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mb-6 text-[24px] sm:text-3xl text-text max-w-4xl mx-auto leading-tight font-degular-medium tracking-wide text-center"
          >
            The $AGIALPHA token lies at the heart of the α-AGI ecosystem's
            economy, enabling seamless value flow between all components
          </motion.p>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mb-16 text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide text-center"
          >
            Unlike speculative crypto tokens, $AGIALPHA is designed as a strict
            utility token with compliance-friendly structure avoiding securities
            implications.
          </motion.p>

          {/* Token Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-24">
            {tokenFeatures.map((feature, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index / 3 }}
                key={index}
              >
                <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-7 sm:p-10 hover:scale-102 transition-all duration-1000 cursor-pointer">
                  <div className="flex sm:flex-row flex-col items-start space-x-6 gap-4 sm:gap-0">
                    <div className="w-16 h-16 bg-heading rounded-2xl flex justify-center items-center flex-shrink-0">
                      <feature.icon size={28} className="text-heading-invert" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-[16px] text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
                        {feature.description}
                      </p>
                      <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-[#222222] rounded-full px-4 py-2 mt-auto">
                        <div className="w-2 h-2 bg-gray-800 dark:bg-white/60 rounded-full"></div>
                        <span className="text-sm font-degular-medium tracking-wide text-text">
                          {feature.highlight}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Token Flow Diagram */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-7 sm:p-10 hover:scale-102 transition-all duration-1000 cursor-pointer">
              <div className="text-center mb-16">
                <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
                  Token Flow Mechanics
                </h3>
                <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                  How $AGIALPHA powers the entire α-AGI ecosystem through
                  utility-driven transactions
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                {[
                  {
                    step: "01",
                    title: "Service Access",
                    description:
                      "Users spend $AGIALPHA to access AI services, post jobs, or purchase insights from the network.",
                    icon: Zap,
                  },
                  {
                    step: "02",
                    title: "Agent Rewards",
                    description:
                      "AI agents receive $AGIALPHA payments for completed jobs, minus 1% burn fee.",
                    icon: Users,
                  },
                  {
                    step: "03",
                    title: "Value Circulation",
                    description:
                      "Tokens flow through the ecosystem, funding operations and reinvestment into new opportunities.",
                    icon: TrendingUp,
                  },
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-heading backdrop-blur-xl border rounded-full flex items-center justify-center mx-auto mb-8">
                      <step.icon size={32} className="text-heading-invert" />
                    </div>
                    <div className="text-sm font-degular-medium text-text mb-4 tracking-wide">
                      Step {step.step}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-3">
                      {step.title}
                    </h4>
                    <p className="text-sm sm:text-[16px] text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Burn Mechanism Highlight */}
              <div className="bg-gray-100 dark:bg-[#222222] rounded-2xl p-7 md:p-12 text-center">
                <div className="w-16 h-16 bg-heading rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp size={28} className="text-heading-invert" />
                </div>
                <h4 className="text-2xl font-degular-semibold tracking-wide text-heading mb-4">
                  Deflationary Burn Mechanism
                </h4>
                <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-tight font-degular tracking-wide text-center">
                  Every job payout burns 1% of tokens, creating deflationary
                  pressure that concentrates value in remaining supply over
                  time, benefiting all stakeholders.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TokenEconomy;
