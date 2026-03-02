"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import Footer from "@/app/sections/Footer";

const page = () => {
  const [mounted, setMounted] = useState(false);

  const text1 = SplitString("AGI Insight - Reaching Beyond Human Foresight");
  const text2 = SplitString("Precision Forecasting");
  const text3 = SplitString("First Mover Advantage");
  const text4 = SplitString(
    "AGI Architect - Foundational Operational Blueprint"
  );
  const text5 = SplitString("The Marketplace");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const features = [
    {
      title: "α-AGI Marketplace",
      description:
        "Decentralized global platform matching strategic AGI tasks with optimal execution.",
    },
    {
      title: "α-AGI Jobs",
      description:
        "Autonomous missions precisely targeting identified inefficiencies.",
    },
    {
      title: "α-AGI Agents",
      description:
        "Adaptive, selfoptimizing intelligent agents executing α-Jobs, yielding immediate economic returns.",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="w-full px-[20px] py-25 sm:py-40 bg-white dark:bg-[#030303] min-h-screen flex justify-center items-center overflow-hidden">
        <div className="max-w-7xl w-full h-full flex flex-col gap-20 sm:gap-40">
          <div className="w-full h-full flex flex-col sm:flex-row justify-center gap-15 sm:gap-5">
            <div className="w-full sm:w-[47%] h-full flex flex-col gap-10">
              <div>
                <motion.h1
                  className="mb-[5px] max-w-[500px] w-full text-[28px] leading-[30px] sm:text-[35px] sm:leading-[35px] font-degular-medium text-heading tracking-wide"
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ staggerChildren: 0.01 }}
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-[16px] sm:text-[18px] text-text font-degular leading-tight tracking-wide"
                >
                  Humanity stands at the precipice of history’s most profound
                  economic transformation. αAGI Insight identifies those sectors
                  poised for imminent disruption by Artificial General
                  Intelligence (AGI). With rigorously validated projections
                  estimating economic opportunities today’s strategic
                  anticipation unlocks extraordinary economic advantages
                  tomorrow.
                </motion.p>
              </div>
              <div>
                <motion.h1
                  className="mb-[5px] text-[28px] leading-[30px] sm:text-[35px] sm:leading-[35px] font-degular-medium text-heading tracking-wide"
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ staggerChildren: 0.01, delayChildren: 0.5 }}
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="text-[16px] sm:text-[18px] text-text font-degular leading-tight tracking-wide"
                >
                  Identify and proactively engage critical sectors before AGI
                  disruption.
                </motion.p>
              </div>
              <div>
                <motion.h1
                  className="mb-[5px] text-[28px] leading-[30px] sm:text-[35px] sm:leading-[35px] font-degular-medium text-heading tracking-wide"
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ staggerChildren: 0.01, delayChildren: 1 }}
                >
                  {text3.map((char: string, key: number) => (
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="text-[16px] sm:text-[18px] text-text font-degular leading-tight tracking-wide"
                >
                  Maximize returns through strategic foresight and superior
                  positioning. A static demo is available via GitHub Pages.
                  See Quick Deployment for guidance on building the docs and
                  publishing your own copy.
                </motion.p>
              </div>
            </div>
            <div className="w-full sm:w-[53%] flex justify-center items-center">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Image
                  src={"/diagram-architecture.png"}
                  width={500}
                  height={500}
                  alt="diagram"
                />
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-2xl shadow-sm hover:shadow-lg text-white py-8 px-5 sm:p-16 transition-all duration-1000">
              <div className="flex flex-col items-center gap-7">
                <h3 className="max-w-[600px] w-full text-3xl lg:text-5xl font-degular-medium tracking-wide text-heading text-center">
                  AGI Sovereign - Autonomous Economic Transformation
                </h3>
                <p className="text-[16px] sm:text-xl font-degular tracking-wide text-text max-w-5xl mx-auto leading-relaxed text-center">
                  MetaAgentic at global scale. αAGI Sovereign represents a
                  revolutionary class of autonomous, blockchainbased enterprises
                  deploying advanced MetaAgentic frameworks. Through evolving
                  swarms of intelligent agents, these enterprises systematically
                  identify and transform global inefficiencies into measurable
                  economic value (“$AGIALPHA”), fundamentally reshaping market
                  dynamics and capture previously unreached alpha opportunities.
                </p>
              </div>
            </div>
          </motion.div>
          <div className="w-full flex flex-col items-center gap-10">
            <motion.h1
              className="mb-5 font-degular text-[40px] sm:text-[60px] leading-[40px] sm:leading-[70px] text-heading tracking-wide text-center"
              style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.04, delayChildren: 0.5 }}
            >
              {text5.map((char: string, key: number) => (
                <motion.span
                  key={key}
                  transition={{ duration: 0.5 }}
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full mb-16">
              {features.map((feature, index) => (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index / 2 }}
                  key={index}
                >
                  <Card key={`marketplace-${index}`} feature={feature} />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="w-full h-full flex flex-col sm:flex-row justify-center gap-14 sm:gap-5">
            <div className="w-full sm:w-[53%] flex justify-center sm:justify-start items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Image
                  src={"/diagram.png"}
                  width={500}
                  height={500}
                  alt="diagram"
                />
              </motion.div>
            </div>
            <div className="w-full sm:w-[47%] h-full flex flex-col gap-10">
              <div>
                <motion.h1
                  className="mb-[5px] max-w-[500px] w-full text-[28px] leading-[30px] sm:text-[35px] sm:leading-[35px] font-degular-medium text-heading tracking-wide"
                  initial="hidden"
                  whileInView="reveal"
                  transition={{ staggerChildren: 0.01 }}
                >
                  {text4.map((char: string, key: number) => (
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-[30px] text-[16px] sm:text-[18px] text-text font-degular leading-tight tracking-wide"
                >
                  Empowering MetaAgents with strategic infrastructure. At the
                  core of αAGI Ascension is αAGI Architect — the foundational
                  operational framework for scalable global deployment. Rooted
                  in the “MultiAgent AI DAO” model, αAGI Architect delivers
                  immediate, scalable, and adaptive infrastructure ensuring
                  continuous strategic evolution.
                </motion.p>
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="list-disc mb-[30px] text-[16px] sm:text-[18px] text-text font-degular leading-tight tracking-wide"
                >
                  <li>
                    Robust feedback loops driving continuous refinement between
                    Sovereign operations and Architect infrastructure.
                  </li>
                  <li>
                    Engineered for rapid global scalability and strategic
                    responsiveness.
                  </li>
                </motion.ul>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-[22px] font-degular-medium text-heading"
                >
                  Strategic Edge:
                </motion.h2>
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="list-disc mb-[30px] text-[16px] sm:text-[18px] text-text font-degular leading-tight tracking-wide"
                >
                  <li>
                    Decentralized autonomy ensures superior agility and
                    resilience.
                  </li>
                  <li>
                    Validated methodologies ensure consistent economic
                    leadership.
                  </li>
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const Card = ({ feature }: { feature: any }) => {
  return (
    <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-2xl shadow-sm hover:shadow-lg px-6 py-10 sm:p-8 hover:scale-102 transition-all duration-1000 flex flex-col items-center">
      <h3 className="text-2xl sm:text-3xl font-degular-medium text-heading tracking-wide mb-3 sm:mb-4">
        {feature.title}
      </h3>

      <p className="text-sm sm:text-[16px] text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide text-center">
        {feature.description}
      </p>
    </div>
  );
};

export default page;
