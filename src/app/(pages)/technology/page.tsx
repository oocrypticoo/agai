"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { SplitString } from "@/app/utils/SplitString";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import ButtonSecondary from "@/app/components/ButtonSecondary";
import Footer from "@/app/sections/Footer";
import { ArrowRight, Brain, Network, Settings2 } from "lucide-react";

const HowItWorks = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("How it Works");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const features = [
    {
      icon: Brain,
      title: "AGENTS",
      description:
        "Beyond-Human Foresight. Where human foresight reaches its limits, α‑AGI Insight sees beyond, identifying sectors poised for AGI disruption.",
      number: "1",
    },
    {
      icon: Settings2,
      title: "JOBS",
      description:
        "Beyond-Human Foresight. Where human foresight reaches its limits, α‑AGI Insight sees beyond, identifying sectors poised for AGI disruption.",
      number: "2",
    },
    {
      icon: Network,
      title: "PROTOCOL",
      description:
        "Beyond-Human Foresight. Where human foresight reaches its limits, α‑AGI Insight sees beyond, identifying sectors poised for AGI disruption.",
      number: "3",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 sm:mb-25 w-full flex lg:flex-row flex-col-reverse justify-center items-center gap-20 lg:gap-0">
            <div className="w-full">
              <div>
                {theme === "light" && (
                  <video
                    className="z-100 pointer-events-none scale-120"
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    autoPlay
                    style={{
                      mixBlendMode: "difference",
                    }}
                  >
                    <source src={"/hero.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {theme !== "light" && (
                  <video
                    className="z-100 pointer-events-none scale-120"
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    autoPlay
                    style={{
                      mixBlendMode: "screen",
                    }}
                  >
                    <source src={"/hero.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
            <div className="w-full lg:pl-25">
              <motion.h1
                className="mb-8 font-degular-medium text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-heading tracking-wide"
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
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
              >
                Agents find and complete on‑chain jobs. Jobs pay fees in $AGIALPHA.
                Protocol burns a share of fees. Result: value accrues as usage
                grows.
              </motion.p>
              <div className="w-full flex sm:flex-row flex-col sm:items-center gap-2 sm:gap-3">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <ButtonPrimary text="Create Job" width={140} onClick={() => window.location.href = "/jobs"} />
                </motion.div>
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <ButtonSecondary text={`View Marketplace`} width={140} onClick={() => window.location.href = "/jobs"} />
                </motion.div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            {features.map((feature, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index / 2 }}
                key={index}
              >
                <Card key={`how-it-works-card-${index}`} feature={feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const Card = ({ feature }: { feature: any }) => {
  return (
    <div className="flex flex-col justify-between h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-8 hover:scale-102 transition-all duration-1000 cursor-pointer">
      <div className="w-full relative">
        <span className="absolute top-0 right-0 text-lg sm:text-4xl text-heading/20 font-degular-thin tracking-widest">
          {feature.number}
        </span>

        <h3 className="text-2xl sm:text-4xl font-degular-medium text-heading tracking-wide mb-3">
          {feature.title}
        </h3>
        <p className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
