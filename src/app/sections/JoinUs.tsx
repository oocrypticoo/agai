import React from "react";
import { motion } from "framer-motion";
import { SplitString } from "../utils/SplitString";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { ArrowRight, Handshake } from "lucide-react";

const JoinUs = () => {
  const text1 = SplitString("Partner with Us");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <section className="py-20 sm:py-30 px-[20px] bg-white dark:bg-[#030303] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="w-full flex md:flex-row flex-col justify-center items-end gap-10 md:gap-0">
          <div className="w-full">
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
              className="text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
            >
              Loreim ipsum sit amet lorem ipsum sit ametlorem ipsum sit
              ametlorem ipsum sit ametlorem ipsum sit ametlorem ipsum sit
              ametlorem ipsum sit ametlorem ipsum sit ametlorem ipsum sit
              ametlorem ipsum sit ametlorem ipsum sit ametlorem ipsum sit
              amelorem ipsum sit ametlorem ipsum sit amet
            </motion.p>
          </div>
          <div className="w-full flex md:justify-end md:items-end">
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ButtonPrimary
                text="Partner with Us"
                Icon={Handshake}
                width={150}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
