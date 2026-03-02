"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import Headline from "@/app/components/Headline";
import Footer from "@/app/sections/Footer";
import { ArrowRight, Infinity, ChevronRight } from "lucide-react";

const page = () => {
  const [mounted, setMounted] = useState(false);

  const text1 = SplitString("AGI Alpha");
  const text2 = SplitString("Opportunity");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const steps = [
    {
      number: "01",
      title: "First Mover Advantage",
      description:
        "α-AGI Insight discovers AGI Alpha opportunities before markets recognize them, creating unprecedented competitive advantages.",
    },
    {
      number: "02",
      title: "Wealth Singularities",
      description:
        "When α-AGI Nova-Seeds bloom, latent wealth singularities incandesce and old economic equilibria unravel completely.",
    },
    {
      number: "03",
      title: "Global Realignment",
      description:
        "α-AGI Sovereign enterprises strategically realign global economic structures through Meta-Agentic mastery at scale.",
    },
    {
      number: "04",
      title: "Economic Epoch",
      description:
        "Propelling humanity into an entirely new economic epoch powered by autonomous, self-evolving AGI enterprises.",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto relative">
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
              The Greatest Alpha Opportunity Ever. Capturing a share of the
              projected USD $15 quadrillion shift driven by AGI.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
            {/* Simplified flywheel visualization */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div
                className="flex items-center justify-center animate-scale-in order-2 lg:order-1"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="relative w-72 sm:w-80 lg:w-96 h-72 sm:h-80 lg:h-96">
                  {/* Central hub - Glassmorphism */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gray-100 backdrop-blur-xl border border-gray-200 rounded-full flex items-center justify-center shadow-2xl z-10">
                    <Infinity
                      size={20}
                      className="text-gray-700 animate-pulse-slow sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                    />
                  </div>

                  {/* Rotating outer ring */}
                  <div className="absolute inset-0 border-2 border-gray-300/50 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-4 sm:inset-6 lg:inset-8 border border-gray-300 rounded-full animate-spin-reverse"></div>

                  {/* Pulse rings */}
                  <div className="absolute inset-0 border border-gray-300/50 rounded-full animate-pulse-ring"></div>
                  <div
                    className="absolute inset-0 border border-gray-300/50 rounded-full animate-pulse-ring"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  {/* Orbiting chevrons - flowing directional indicators */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-orbit">
                      <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gray-100 backdrop-blur-xl border border-gray-200 rounded-lg flex items-center justify-center shadow-lg transform rotate-90">
                        <ChevronRight
                          size={14}
                          className="text-gray-700 sm:w-4 sm:h-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ animationDelay: "5s" }}
                  >
                    <div className="animate-orbit">
                      <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gray-100 backdrop-blur-xl border border-gray-200 rounded-lg flex items-center justify-center shadow-lg transform rotate-90">
                        <ChevronRight
                          size={14}
                          className="text-gray-700 sm:w-4 sm:h-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ animationDelay: "10s" }}
                  >
                    <div className="animate-orbit">
                      <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gray-100 backdrop-blur-xl border border-gray-200 rounded-lg flex items-center justify-center shadow-lg transform rotate-90">
                        <ChevronRight
                          size={14}
                          className="text-gray-700 sm:w-4 sm:h-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ animationDelay: "15s" }}
                  >
                    <div className="animate-orbit">
                      <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gray-100 backdrop-blur-xl border border-gray-200 rounded-lg flex items-center justify-center shadow-lg transform rotate-90">
                        <ChevronRight
                          size={14}
                          className="text-gray-700 sm:w-4 sm:h-4"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Flowing data streams - curved paths */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Curved flow paths */}
                      <path
                        d="M 20,50 Q 50,20 80,50 Q 50,80 20,50"
                        fill="none"
                        stroke="rgb(156, 163, 175)"
                        strokeWidth="0.5"
                        strokeDasharray="2,4"
                        className="animate-data-stream opacity-30"
                      />
                      <path
                        d="M 30,30 Q 70,30 70,70 Q 30,70 30,30"
                        fill="none"
                        stroke="rgb(156, 163, 175)"
                        strokeWidth="0.5"
                        strokeDasharray="2,4"
                        className="animate-data-stream opacity-20"
                        style={{ animationDelay: "2s" }}
                      />
                    </svg>
                  </div>

                  {/* Background dots */}
                  <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-400 rounded-full animate-float"></div>
                  <div
                    className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full animate-float"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>
            </motion.div>

            {/* Steps */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 order-1 lg:order-2">
              {steps.map((step, index) => (
                <motion.div key={index}>
                  <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index / 4 }}
                    className="flex items-start space-x-4 sm:space-x-6"
                  >
                    <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-heading backdrop-blur-xl border border-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-heading-invert font-degular text-sm sm:text-md">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-2 sm:mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[16px] text-text leading-relaxed font-degular tracking-wide">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Simple metrics */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="mt-16 sm:mt-20 lg:mt-24 bg-gray-50 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 sm:p-12 animate-slide-up dark:bg-[#F5F5F5]/5 dark:backdrop-blur-xl dark:border-[#F5F5F5]/10">
              <div className="text-center mb-8 sm:mb-12">
                <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
                  Flywheel Impact
                </h3>
                <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                  Continuous improvement metrics showing exponential growth
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {[
                  { value: "347%", label: "Performance Gain" },
                  { value: "2.4M", label: "Daily Operations" },
                  { value: "99.9%", label: "System Efficiency" },
                  { value: "156x", label: "Speed Improvement" },
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-[24px] sm:text-4xl text-heading max-w-4xl mx-auto leading-relaxed font-degular-medium tracking-wide">
                      {metric.value}
                    </div>
                    <div className="text-text text-[16px] font-degular tracking-wide">
                      {metric.label}
                    </div>
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
