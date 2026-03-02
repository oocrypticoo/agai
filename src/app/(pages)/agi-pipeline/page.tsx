"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import Footer from "@/app/sections/Footer";
import { Download, Brain, Zap, Upload } from "lucide-react";

const MetaAgentPipeline: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("α-AGI MARK");
  const text2 = SplitString("Foresight DEX");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const pipelineSteps = [
    {
      number: "01",
      title: "AGI Alpha Discovery",
      description:
        "α-AGI Insight identifies trillion-dollar rupture points across sectors poised for AGI disruption.",
      icon: Download,
      animationDelay: "0s",
    },
    {
      number: "02",
      title: "Nova-Seed Generation",
      description:
        "Cryptosealed stellar spores containing foresight genomes and self-forging FusionPlans are minted as ERC-721 tokens.",
      icon: Brain,
      animationDelay: "0.5s",
    },
    {
      number: "03",
      title: "Market Crystallization",
      description:
        "α-AGI MARK transforms green-flamed Nova-Seeds into tradeable futures through validator-driven risk oracles.",
      icon: Zap,
      animationDelay: "1s",
    },
    {
      number: "04",
      title: "Sovereign Deployment",
      description:
        "Bloomed Nova-Seeds become α-AGI Sovereign enterprises, autonomous blockchain-based businesses at global scale.",
      icon: Upload,
      animationDelay: "1.5s",
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
          {/* Section header */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <motion.h1
              className="font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide"
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
            <motion.h1
              className="mb-8 font-degular-thin text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-text/70 tracking-wide"
              style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.02, delayChildren: 0.8 }}
            >
              {text2.map((char: string, key: number) => (
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
              className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide"
            >
              The on-chain agora where nascent futures crystallize. Algorithmic
              market-maker, validator-driven risk oracle, and bonding-curve
              issuance transform Nova-Seeds into self-financing launchpads.
            </motion.p>
          </div>

          {/* Pipeline Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8">
            {pipelineSteps.map((step, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index / 3 }}
                key={index}
              >
                <div className="relative">
                  <div className="relative z-10 text-center">
                    {/* Animated Circle Icon */}
                    <div className="relative mx-auto mb-6 sm:mb-8">
                      <div className="relative w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 mx-auto">
                        {/* Pulse rings */}
                        <div className="absolute inset-0 border-2 border-gray-300 dark:border-white/30 rounded-full animate-mega-pulse opacity-25"></div>
                        <div
                          className="absolute inset-0 border border-gray-300 dark:border-white/30 rounded-full animate-mega-pulse opacity-25"
                          style={{ animationDelay: "1s" }}
                        ></div>

                        {/* Main circle - Glassmorphism */}
                        <div className="absolute inset-2 bg-gray-100 dark:bg-white/5 backdrop-blur-xl border-2 border-gray-200 dark:border-black/30 rounded-full flex items-center justify-center shadow-2xl">
                          <step.icon
                            size={24}
                            className="text-gray-700 dark:text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                          />
                        </div>
                      </div>

                      {/* Step number - Glassmorphism */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-100 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white rounded-full flex items-center justify-center text-sm font-degular-medium shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-text leading-relaxed font-degular tracking-wide max-w-xs mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Processing Flow Visualization - Glassmorphism */}
          {/* <div
          className="bg-gray-50 backdrop-blur-xl border border-gray-200 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 animate-slide-up dark:bg-[#F5F5F5]/5 dark:backdrop-blur-xl dark:border-[#F5F5F5]/10 transition-colors duration-300"
          style={{ animationDelay: "2s" }}
        >
          <div className="text-center mb-16 sm:mb-20">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-degular text-gray-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
              Real-Time Processing Flow
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-white/80 font-degular tracking-wide max-w-2xl mx-auto transition-colors duration-300">
              Watch data transform seamlessly within our meta-agent intelligence
              pipeline
            </p>
          </div>

          <div
            className="relative flex items-center justify-center mb-12 sm:mb-16"
            style={{ minHeight: "500px" }}
          >
            <div className="relative z-20">
              <div className="w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 bg-gray-100 dark:bg-black/30 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-2xl animate-central-pulse transition-colors duration-300">
                <Brain
                  size={28}
                  className="text-gray-700 dark:text-white sm:w-8 sm:h-8 lg:w-10 lg:h-10 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-56 sm:w-64 lg:w-72 h-56 sm:h-64 lg:h-72 border border-dashed border-gray-300 rounded-full animate-orbital-counter opacity-60"></div>

              <div className="absolute w-80 sm:w-96 lg:w-[28rem] h-80 sm:h-96 lg:h-[28rem] border border-dashed border-gray-300 rounded-full animate-orbital-clockwise opacity-50"></div>

              <div className="absolute w-[26rem] sm:w-[30rem] lg:w-[36rem] h-[26rem] sm:h-[30rem] lg:h-[36rem] border border-dashed border-gray-300 rounded-full animate-orbital-clockwise-slow opacity-40"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-56 sm:w-64 lg:w-72 h-56 sm:h-64 lg:h-72 animate-orbital-counter">
                <div
                  className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#6D28D9] backdrop-blur-xl rounded-full opacity-90 shadow-lg"
                  style={{ boxShadow: "0 0 12px rgba(109, 40, 217, 0.6)" }}
                ></div>
                <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 w-2.5 h-2.5 bg-[#6D28D9]/80 backdrop-blur-xl rounded-full opacity-70"></div>
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#6D28D9]/60 backdrop-blur-xl rounded-full opacity-60"></div>
                <div className="absolute top-1/2 -left-1.5 transform -translate-y-1/2 w-2.5 h-2.5 bg-[#6D28D9]/70 backdrop-blur-xl rounded-full opacity-80"></div>
              </div>

              <div className="absolute w-80 sm:w-96 lg:w-[28rem] h-80 sm:h-96 lg:h-[28rem] animate-orbital-clockwise">
                <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-[#6D28D9]/60 backdrop-blur-xl rounded-full opacity-80"></div>
                <div
                  className="absolute top-1/4 -right-1.5 transform -translate-y-1/2 w-2 h-2 bg-[#6D28D9] backdrop-blur-xl rounded-full opacity-90"
                  style={{ boxShadow: "0 0 8px rgba(109, 40, 217, 0.4)" }}
                ></div>
                <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 w-3 h-3 bg-[#6D28D9]/50 backdrop-blur-xl rounded-full opacity-75"></div>
                <div className="absolute top-3/4 -right-1.5 transform -translate-y-1/2 w-2 h-2 bg-[#6D28D9]/40 backdrop-blur-xl rounded-full opacity-60"></div>
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-[#6D28D9]/70 backdrop-blur-xl rounded-full opacity-85"></div>
                <div className="absolute top-3/4 -left-1.5 transform -translate-y-1/2 w-2 h-2 bg-[#6D28D9]/50 backdrop-blur-xl rounded-full opacity-70"></div>
                <div className="absolute top-1/2 -left-1.5 transform -translate-y-1/2 w-2.5 h-2.5 bg-[#6D28D9]/40 backdrop-blur-xl rounded-full opacity-65"></div>
                <div className="absolute top-1/4 -left-1.5 transform -translate-y-1/2 w-2 h-2 bg-[#6D28D9]/70 backdrop-blur-xl rounded-full opacity-80"></div>
              </div>

              <div className="absolute w-[26rem] sm:w-[30rem] lg:w-[36rem] h-[26rem] sm:h-[30rem] lg:h-[36rem] animate-orbital-clockwise-slow">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#6D28D9]/40 backdrop-blur-xl rounded-full opacity-60"></div>
                <div className="absolute top-1/6 -right-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#6D28D9]/30 backdrop-blur-xl rounded-full opacity-50"></div>
                <div className="absolute top-1/3 -right-1 transform -translate-y-1/2 w-2 h-2 bg-[#6D28D9]/60 backdrop-blur-xl rounded-full opacity-70"></div>
                <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#6D28D9]/40 backdrop-blur-xl rounded-full opacity-55"></div>
                <div className="absolute top-2/3 -right-1 transform -translate-y-1/2 w-2 h-2 bg-[#6D28D9]/50 backdrop-blur-xl rounded-full opacity-65"></div>
                <div className="absolute top-5/6 -right-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#6D28D9]/30 backdrop-blur-xl rounded-full opacity-50"></div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#6D28D9]/40 backdrop-blur-xl rounded-full opacity-60"></div>
                <div className="absolute top-5/6 -left-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#6D28D9]/60 backdrop-blur-xl rounded-full opacity-75"></div>
                <div className="absolute top-2/3 -left-1 transform -translate-y-1/2 w-2 h-2 bg-[#6D28D9]/50 backdrop-blur-xl rounded-full opacity-65"></div>
                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#6D28D9]/40 backdrop-blur-xl rounded-full opacity-55"></div>
                <div className="absolute top-1/3 -left-1 transform -translate-y-1/2 w-2 h-2 bg-[#6D28D9]/30 backdrop-blur-xl rounded-full opacity-50"></div>
                <div className="absolute top-1/6 -left-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#6D28D9]/40 backdrop-blur-xl rounded-full opacity-60"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-12 sm:mb-16">
            <div className="flex items-center space-x-3 bg-gray-100 backdrop-blur-xl rounded-full px-6 py-3 border border-gray-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-degular tracking-widest">
                Processing Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-2xl mx-auto">
            <div
              className="text-center animate-counter-up"
              style={{ animationDelay: "2.5s" }}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-degular-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                <span className="counter-value">2.4</span>ms
              </div>
              <div className="text-gray-600 dark:text-white/80 text-xs sm:text-sm font-degular tracking-widest transition-colors duration-300">
                Processing Time
              </div>
            </div>
            <div
              className="text-center animate-counter-up"
              style={{ animationDelay: "2.7s" }}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-degular-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                <span className="counter-value">99.8</span>%
              </div>
              <div className="text-gray-600 dark:text-white/80 text-xs sm:text-sm font-degular tracking-widest transition-colors duration-300">
                Accuracy Rate
              </div>
            </div>
            <div
              className="text-center animate-counter-up"
              style={{ animationDelay: "2.9s" }}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-degular-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                <span className="counter-value">1.2</span>M
              </div>
              <div className="text-gray-600 dark:text-white/80 text-xs sm:text-sm font-degular tracking-widest transition-colors duration-300">
                Operations/sec
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MetaAgentPipeline;
