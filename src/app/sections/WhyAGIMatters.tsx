import React from "react";
import { motion } from "framer-motion";
import { SplitString } from "../utils/SplitString";
import { useTheme } from "next-themes";

const WhyAGIMatters = () => {
  const { theme } = useTheme();
  const text1 = SplitString("$AGIALPHA, the fuel powering the Alpha Protocol");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <section className="relative py-20 sm:py-25 px-[20px] bg-[#0A0A0A] dark:bg-black overflow-hidden z-10">
      <div className="mx-auto max-w-7xl">
        <div className="w-full flex lg:flex-row flex-col justify-center items-center gap-15 lg:gap-0">
          <div className="w-full">
            <motion.h1
              className="mb-8 font-degular-medium text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-white tracking-wide"
              style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.02 }}
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
              className="mb-10 text-[16px] md:text-[18px] text-[#cfcfcf] font-degular leading-relaxed tracking-wide"
            >
              Every time an AI Agent completes a job on the AGI Alpha network,
              it turns into $AGIALPHA. This means more protocol activity
              = more $AGIALPHA demand. The token’s value is directly tied to
              adoption, not hype
            </motion.p>
            <div className="w-full flex sm:flex-row flex-col sm:items-center gap-2 sm:gap-3">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <button
                  style={{ width: "140px" }}
                  className={`group px-[15px] py-[5px] bg-white text-black flex items-center justify-center gap-1 text-[15px] font-degular-medium !rounded-full cursor-pointer transition-all duration-500 !outline-none`}
                >
                  View on Explorer
                </button>
              </motion.div>
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <button
                  style={{ width: "140px" }}
                  className="group px-[15px] py-[3px] flex items-center justify-center gap-1 border-2 border-white !rounded-full text-white hover:bg-white hover:text-black text-[14px] font-degular-medium cursor-pointer transition-all duration-500 !outline-none"
                >
                  Buy $AGIALPHA
                </button>
              </motion.div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div>
              {theme === "light" && (
                <video
                  className="z-100 pointer-events-none"
                  muted
                  loop
                  playsInline
                  webkit-playsinline="true"
                  autoPlay
                  style={{
                    mixBlendMode: "screen",
                  }}
                >
                  <source src={"/logo-video.mp4"} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {theme !== "light" && (
                <video
                  className="z-100 pointer-events-none"
                  muted
                  loop
                  playsInline
                  webkit-playsinline="true"
                  autoPlay
                  style={{
                    mixBlendMode: "screen",
                  }}
                >
                  <source src={"/logo-video.mp4"} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAGIMatters;
