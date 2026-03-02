"use client";
import React, { useEffect, useState } from "react";
import { Terminal, Sparkles, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import ButtonSecondary from "@/app/components/ButtonSecondary";
import Footer from "@/app/sections/Footer";

const HeroComponent: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("α-AGI");
  const text2 = SplitString(
    "Humanity's Structured Rise to Economic Supremacy via Strategic AGI Mastery"
  );

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        {/* Content */}
        <div className="mb-10 max-w-7xl mx-auto text-center">
          <motion.h1
            className="mb-5 font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide text-center"
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
            className="mb-10 mx-auto max-w-[500px] w-full font-degular-thin text-[30px] leading-[35px] text-text/70 tracking-wide text-center"
            style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.6 }}
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

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="mb-10 max-w-7xl mx-auto h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-10 hover:scale-102 transition-all duration-1000 cursor-pointer">
              <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                "As Columbus braved the seas, we now venture into the vast
                oceans of AGI. The age of AGI exploration has dawned, and the
                horizons are boundless.
                <span className="text-heading font-medium">
                  {" "}
                  Dare to dream, dare to explore.
                </span>
                "
              </p>
              <p className="text-[16px] sm:text-xl text-heading max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                — α-AGI Agent
              </p>
            </div>
          </motion.div>

          {/* Key Stats */}
          <div className="mb-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: "$15Q", label: "Market Opportunity", icon: Sparkles },
              { value: "7", label: "Core Components", icon: Brain },
              { value: "14", label: "Live Demos", icon: Terminal },
              { value: "∞", label: "Potential Impact", icon: Zap },
            ].map((stat, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index / 3 }}
                key={index}
              >
                <div className="text-center relative">
                  <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-10 hover:scale-102 transition-all duration-1000 cursor-pointer flex flex-col justify-center">
                    <div className="w-12 h-12 bg-heading rounded-full flex justify-center items-center mx-auto mb-4">
                      <stat.icon size={20} className="text-heading-invert" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-degular-medium tracking-wide text-heading mb-4">
                      {stat.value}
                    </div>
                    <div className="text-text text-[16px] md:text-xl font-degular tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mb-10 inline-flex flex-col sm:flex-row items-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ButtonPrimary
                text="Explore Repository"
                width={180}
                onClick={() =>
                  window.open("https://github.com/MontrealAI", "_blank")
                }
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="mb-10 max-w-7xl mx-auto h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-10 hover:scale-102 transition-all duration-1000 cursor-pointer">
              <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                "Where human foresight reaches its limits, α-AGI Insight sees
                beyond. Humanity stands at the precipice of history's most
                profound economic transformation."
              </p>
              <p className="text-[16px] sm:text-xl text-heading max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                — META-AGENTIC α-AGI White Paper v0.1.0-alpha
              </p>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="mx-auto max-w-7xl h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-10 hover:scale-102 transition-all duration-1000 cursor-pointer">
            <div className="text-center mb-12 centered-content">
              <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
                Meta-Agentic Definition
              </h3>
              <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                Official and pioneering definition by Vincent Boucher, President
                of MONTREAL.AI
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-[#222222] rounded-2xl p-12">
              <blockquote className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide text-center">
                <span className="font-semibold text-heading">
                  Meta-Agentic (adj.):
                </span>{" "}
                Describes an agent whose primary role is to create, select,
                evaluate, or re-configure other agents and the rules governing
                their interactions, thereby exercising{" "}
                <span className="font-semibold text-heading">
                  second-order agency
                </span>{" "}
                over a population of first-order agents.
              </blockquote>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default HeroComponent;
