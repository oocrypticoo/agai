"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import { DonutChartDark, DonutChartLight } from "@/app/components/DonutChart";
import Footer from "@/app/sections/Footer";

const page = () => {
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();
  const text1 = SplitString("α-AGI Tokenomics");

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
      <section className="w-full py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="mx-auto max-w-7xl w-full">
          <motion.h1
            className="mb-16 font-degular text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] md:text-[80px] md:leading-[90px] text-heading tracking-wide text-center"
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
          {theme === "light" && <DonutChartLight />}
          {theme === "dark" && <DonutChartDark />}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
