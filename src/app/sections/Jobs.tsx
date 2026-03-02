import React from "react";
import { motion } from "framer-motion";
import { SplitString } from "../utils/SplitString";
import ButtonPrimary from "../components/ButtonPrimary";
import Image from "next/image";
import { useTheme } from "next-themes";

const Jobs: React.FC = () => {
  const { theme } = useTheme();
  const text1 = SplitString("AGI Alpha Jobs");
  const text2 = SplitString("First Deployment Component");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <section className="py-20 sm:py-25 px-[20px] bg-white dark:bg-[#030303] overflow-hidden">
      <div className="mx-auto max-w-7xl flex md:flex-row flex-col justify-center items-center gap-5">
        {/* Section Header */}
        <div className="w-full mb-16">
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
            className="mb-8 font-degular-thin text-[40px] leading-[35px] sm:text-[50px] sm:leading-[45px] text-text/70 tracking-wide"
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
            className="mb-8 text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide"
          >
            The first component of the AGI Alpha ecosystem to be deployed is AGI
            Jobs
          </motion.p>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <ButtonPrimary text="Coming Soon" width={130} />
          </motion.div>
        </div>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full flex justify-center md:justify-end"
        >
          {theme === "light" && (
            <Image
              src={"/jobs-cover.jpg"}
              width={600}
              height={600}
              className="rounded-2xl"
              alt="jobs-cover"
            />
          )}
          {theme !== "light" && (
            <Image
              src={"/jobs-cover-dark.jpg"}
              width={600}
              height={600}
              className="rounded-2xl"
              alt="jobs-cover"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Jobs;
