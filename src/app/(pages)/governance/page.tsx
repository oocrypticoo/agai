"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import Headline from "@/app/components/Headline";
import ButtonSecondary from "@/app/components/ButtonSecondary";
import Footer from "@/app/sections/Footer";
import { Shield, Users, Lock, ArrowRight, Network } from "lucide-react";

const page = () => {
  const [mounted, setMounted] = useState(false);

  const text1 = SplitString("Large Scale α-AGI");
  const text2 = SplitString("Marketplace");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const governanceFeatures = [
    {
      icon: Shield,
      title: "$AGIALPHA Token",
      description:
        "Strictly-utility token powering the AGI Alpha ecosystem. All marketplace settlements denominate in $AGIALPHA with deflationary 1% burn mechanism.",
      stat: "1% burn rate",
    },
    {
      icon: Users,
      title: "Reputation-Weighted",
      description:
        "Sophisticated auction system that assigns jobs to the fastest and most cost-effective agents based on proven track records and performance metrics.",
      stat: "Merit-based",
    },
    {
      icon: Lock,
      title: "Global Scale",
      description:
        "Planetary-scale job routing infrastructure connecting autonomous AGI enterprises across all sectors and geographical boundaries.",
      stat: "Worldwide",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 bg-white dark:bg-[#030303] overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section header */}
          <div className="mb-16">
            <motion.h1
              className="font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide"
              style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.03, delayChildren: 0.3 }}
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
              transition={{ staggerChildren: 0.03, delayChildren: 0.6 }}
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
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-[16px] sm:text-xl text-text max-w-3xl leading-relaxed font-degular tracking-wide"
            >
              Global Job Router powered by $AGIALPHA. Reputation-weighted
              auctions assign the fastest/cheapest agent. All settlements
              denominate in $AGIALPHA with 1% burn on every payout.
            </motion.p>
          </div>

          {/* Feature grid - Glassmorphism */}
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governanceFeatures.map((feature, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index / 2 }}
                key={index}
              >
                <Card feature={feature} />
              </motion.div>
            ))}
          </div>

          {/* Enhanced network visualization with DRAMATIC central brain - Glassmorphism */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="bg-black/90 dark:bg-[#F5F5F5]/5 backdrop-blur-xl transition-colors duration-300 border border-[#F5F5F5]/10 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16">
              <div className="text-center mb-12 sm:mb-16">
                <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-white tracking-wide text-center">
                  Distributed Network
                </h3>
                <p className="text-[16px] sm:text-xl text-[#cfcfcf] max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                  Real-time validation across a decentralized infrastructure
                </p>
              </div>

              <div
                className="relative flex items-center justify-center"
                style={{ minHeight: "500px" }}
              >
                <div className="relative z-20">
                  <div className="w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 bg-[#F5F5F5]/20 backdrop-blur-xl border-2 border-[#F5F5F5]/30 rounded-full flex items-center justify-center shadow-2xl animate-central-pulse">
                    <Network
                      size={28}
                      className="text-[#F5F5F5] sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(245, 245, 245, 0.5))",
                      }}
                    />
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-56 sm:w-64 lg:w-72 h-56 sm:h-64 lg:h-72 border border-dashed border-[#888888] rounded-full animate-orbital-counter opacity-60"></div>
                  <div className="absolute w-80 sm:w-96 lg:w-[28rem] h-80 sm:h-96 lg:h-[28rem] border border-dashed border-[#888888] rounded-full animate-orbital-clockwise opacity-50"></div>
                  <div className="absolute w-[26rem] sm:w-[30rem] lg:w-[36rem] h-[26rem] sm:h-[30rem] lg:h-[36rem] border border-dashed border-[#888888] rounded-full animate-orbital-clockwise-slow opacity-40"></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-56 sm:w-64 lg:w-72 h-56 sm:h-64 lg:h-72 animate-orbital-counter">
                    <div
                      className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#F5F5F5]/80 backdrop-blur-xl rounded-full opacity-90 shadow-lg"
                      style={{ boxShadow: "0 0 12px rgba(245, 245, 245, 0.6)" }}
                    ></div>
                    <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 w-2.5 h-2.5 bg-[#F5F5F5]/60 backdrop-blur-xl rounded-full opacity-70"></div>
                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#F5F5F5]/40 backdrop-blur-xl rounded-full opacity-60"></div>
                    <div className="absolute top-1/2 -left-1.5 transform -translate-y-1/2 w-2.5 h-2.5 bg-[#F5F5F5]/70 backdrop-blur-xl rounded-full opacity-80"></div>
                  </div>

                  <div className="absolute w-80 sm:w-96 lg:w-[28rem] h-80 sm:h-96 lg:h-[28rem] animate-orbital-clockwise">
                    <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-[#F5F5F5]/60 backdrop-blur-xl rounded-full opacity-80"></div>
                    <div
                      className="absolute top-1/4 -right-1.5 transform -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]/80 backdrop-blur-xl rounded-full opacity-90"
                      style={{ boxShadow: "0 0 8px rgba(245, 245, 245, 0.4)" }}
                    ></div>
                    <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 w-3 h-3 bg-[#F5F5F5]/50 backdrop-blur-xl rounded-full opacity-75"></div>
                    <div className="absolute top-3/4 -right-1.5 transform -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]/40 backdrop-blur-xl rounded-full opacity-60"></div>
                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-[#F5F5F5]/70 backdrop-blur-xl rounded-full opacity-85"></div>
                    <div className="absolute top-3/4 -left-1.5 transform -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]/50 backdrop-blur-xl rounded-full opacity-70"></div>
                    <div className="absolute top-1/2 -left-1.5 transform -translate-y-1/2 w-2.5 h-2.5 bg-[#F5F5F5]/40 backdrop-blur-xl rounded-full opacity-65"></div>
                    <div className="absolute top-1/4 -left-1.5 transform -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]/70 backdrop-blur-xl rounded-full opacity-80"></div>
                  </div>

                  <div className="absolute w-[26rem] sm:w-[30rem] lg:w-[36rem] h-[26rem] sm:h-[30rem] lg:h-[36rem] animate-orbital-clockwise-slow">
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#F5F5F5]/40 backdrop-blur-xl rounded-full opacity-60"></div>
                    <div className="absolute top-1/6 -right-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#F5F5F5]/30 backdrop-blur-xl rounded-full opacity-50"></div>
                    <div className="absolute top-1/3 -right-1 transform -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]/60 backdrop-blur-xl rounded-full opacity-70"></div>
                    <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#F5F5F5]/40 backdrop-blur-xl rounded-full opacity-55"></div>
                    <div className="absolute top-2/3 -right-1 transform -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]/50 backdrop-blur-xl rounded-full opacity-65"></div>
                    <div className="absolute top-5/6 -right-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#F5F5F5]/30 backdrop-blur-xl rounded-full opacity-50"></div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#F5F5F5]/40 backdrop-blur-xl rounded-full opacity-60"></div>
                    <div className="absolute top-5/6 -left-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#F5F5F5]/60 backdrop-blur-xl rounded-full opacity-75"></div>
                    <div className="absolute top-2/3 -left-1 transform -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]/50 backdrop-blur-xl rounded-full opacity-65"></div>
                    <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#F5F5F5]/40 backdrop-blur-xl rounded-full opacity-55"></div>
                    <div className="absolute top-1/3 -left-1 transform -translate-y-1/2 w-2 h-2 bg-[#F5F5F5]/30 backdrop-blur-xl rounded-full opacity-50"></div>
                    <div className="absolute top-1/6 -left-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-[#F5F5F5]/40 backdrop-blur-xl rounded-full opacity-60"></div>
                  </div>
                </div>

                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center space-x-2 sm:space-x-3 bg-[#F5F5F5]/10 backdrop-blur-xl rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-lg border border-[#F5F5F5]/20">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                  <span className="text-[#cfcfcf] text-[16px] font-degular tracking-wide">
                    Network Active
                  </span>
                  <div className="w-px h-3 sm:h-4 bg-[#888888] hidden sm:block"></div>
                  <span className="text-[#cfcfcf] text-[16px] font-degular tracking-wide">
                    Live
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 border-t border-[#888888]/20">
                <div className="text-center group animate-counter-up">
                  <div className="text-[24px] sm:text-4xl text-white max-w-4xl mx-auto leading-relaxed font-degular-medium tracking-wide">
                    <span className="counter-value">99.9</span>%
                  </div>
                  <div className="text-[#cfcfcf] text-[16px] font-degular tracking-wide">
                    Network Uptime
                  </div>
                </div>
                <div
                  className="text-center group animate-counter-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="text-[24px] sm:text-4xl text-white max-w-4xl mx-auto leading-relaxed font-degular-medium tracking-wide">
                    <span className="counter-value">1,247</span>
                  </div>
                  <div className="text-[#cfcfcf] text-[16px] font-degular tracking-wide">
                    Active Validators
                  </div>
                </div>
                <div
                  className="text-center group animate-counter-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="text-[24px] sm:text-4xl text-white max-w-4xl mx-auto leading-relaxed font-degular-medium tracking-wide">
                    <span className="counter-value">{"<50"}</span>ms
                  </div>
                  <div className="text-[#cfcfcf] text-[16px] font-degular tracking-wide">
                    Consensus Time
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const Card = ({ feature }: { feature: any }) => {
  return (
    <div className="flex flex-col justify-between h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-2xl shadow-sm hover:shadow-lg hover:scale-102 p-6 sm:p-8 transition-all duration-1000">
      <div className="w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-heading backdrop-blur-xl border border-[#F5F5F5]/20 rounded-full flex items-center justify-center">
            <feature.icon
              size={20}
              className="text-heading-invert sm:w-6 sm:h-6"
            />
          </div>
          <span className="text-xs sm:text-sm text-text font-degular tracking-widest">
            {feature.stat}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-3 sm:mb-4">
          {feature.title}
        </h3>
        <p className="text-sm sm:text-[16px] text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default page;
