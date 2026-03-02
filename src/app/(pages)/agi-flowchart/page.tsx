"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import Headline from "@/app/components/Headline";
import Footer from "@/app/sections/Footer";

const page: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  const text1 = SplitString("α-AGI Flowchart");
  const text2 = SplitString(
    "The first component of the AGI Alpha ecosystem to be deployed is AGI Jobs"
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
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-[#030303] overflow-hidden">
        <div className="mx-auto max-w-7xl relative">
          {/* Section Header */}
          <div className="w-full flex flex-col items-center mb-10 sm:mb-24">
            <motion.h1
              className="mb-2 font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide text-center"
              style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.04 }}
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
              className="max-w-[800px] w-full font-degular-thin text-[30px] leading-[30px] sm:text-[40px] sm:leading-[40px] text-text/70 tracking-wide text-center"
              style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.015, delayChildren: 0.4 }}
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
          </div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-15 sm:mb-20 w-full flex justify-center items-center"
          >
            <Image
              src={"/diagram-architecture.png"}
              width={700}
              height={700}
              alt="architecture"
            />
          </motion.div>

          {/* Flow Summary */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-2xl shadow-sm hover:shadow-lg text-white px-5 py-8 sm:p-16 transition-all duration-1000">
              <div className="text-center mb-12">
                <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
                  Continuous Value Flow
                </h3>
                <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                  The α-AGI ecosystem operates as a self-reinforcing flywheel,
                  where each component amplifies the next, creating exponential
                  value generation through Meta-Agentic orchestration.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 sm:gap-8">
                {[
                  { value: "∞", label: "Recursive Cycles", suffix: "" },
                  { value: "12", label: "Core Components", suffix: "" },
                  { value: "24/7", label: "Autonomous Operation", suffix: "" },
                  { value: "5%", label: "Burn Rate", suffix: "" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-[24px] sm:text-4xl text-heading max-w-4xl mx-auto leading-relaxed font-degular-medium tracking-wide">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="text-text text-[16px] font-degular tracking-wide">
                      {stat.label}
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
