"use client";
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
              adoption, not hype. Available on Ethereum and Solana, and bridgeable
              between chains via deBridge.
            </motion.p>
            {/* Token Addresses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8 space-y-3"
            >
              <div>
                <span className="block text-[12px] font-degular-medium text-white/40 uppercase tracking-widest mb-1">
                  Ethereum
                </span>
                <a
                  href="https://etherscan.io/token/0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] font-mono text-white/70 hover:text-white transition-colors break-all"
                >
                  0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA
                </a>
              </div>
              <div>
                <span className="block text-[12px] font-degular-medium text-white/40 uppercase tracking-widest mb-1">
                  Solana
                </span>
                <a
                  href="https://solscan.io/token/tWKHzXd5PRmxTF5cMfJkm2Ua3TcjwNNoSRUqx6Apump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] font-mono text-white/70 hover:text-white transition-colors break-all"
                >
                  tWKHzXd5PRmxTF5cMfJkm2Ua3TcjwNNoSRUqx6Apump
                </a>
              </div>
            </motion.div>

            <div className="w-full flex sm:flex-row flex-col sm:items-center gap-2 sm:gap-3">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <a
                  href="https://etherscan.io/token/0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "140px" }}
                  className={`group px-[15px] py-[5px] bg-white text-black flex items-center justify-center gap-1 text-[15px] font-degular-medium !rounded-full cursor-pointer transition-all duration-500 !outline-none`}
                >
                  View on Explorer
                </a>
              </motion.div>
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <a
                  href="https://app.uniswap.org/swap?outputCurrency=0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA&chain=ethereum"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "160px" }}
                  className="group px-[15px] py-[3px] flex items-center justify-center gap-1.5 border-2 border-white !rounded-full text-white hover:bg-white hover:text-black text-[14px] font-degular-medium cursor-pointer transition-all duration-500 !outline-none"
                >
                  <svg width="14" height="14" viewBox="0 0 256 417" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M127.961 0L125.166 9.5V285.168L127.961 287.958L255.923 212.32L127.961 0Z" fill="currentColor" fillOpacity="0.6"/>
                    <path d="M127.962 0L0 212.32L127.962 287.959V154.158V0Z" fill="currentColor"/>
                    <path d="M127.961 312.187L126.386 314.107V412.306L127.961 416.905L255.999 236.587L127.961 312.187Z" fill="currentColor" fillOpacity="0.6"/>
                    <path d="M127.962 416.905V312.187L0 236.587L127.962 416.905Z" fill="currentColor"/>
                  </svg>
                  Buy on Ethereum
                </a>
              </motion.div>
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <a
                  href="https://jup.ag/?sell=So11111111111111111111111111111111111111112&buy=tWKHzXd5PRmxTF5cMfJkm2Ua3TcjwNNoSRUqx6Apump"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "160px" }}
                  className="group px-[15px] py-[3px] flex items-center justify-center gap-1.5 border-2 border-white !rounded-full text-white hover:bg-white hover:text-black text-[14px] font-degular-medium cursor-pointer transition-all duration-500 !outline-none"
                >
                  <svg width="14" height="14" viewBox="0 0 397 312" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M64.6 237.9C67.3 235.2 71 233.6 74.9 233.6H391.2C397 233.6 399.9 240.6 395.8 244.7L333 307.5C330.3 310.2 326.6 311.8 322.7 311.8H6.4C0.6 311.8 -2.3 304.8 1.8 300.7L64.6 237.9Z" fill="currentColor"/>
                    <path d="M64.6 4.3C67.4 1.6 71.1 0 74.9 0H391.2C397 0 399.9 7 395.8 11.1L333 73.9C330.3 76.6 326.6 78.2 322.7 78.2H6.4C0.6 78.2 -2.3 71.2 1.8 67.1L64.6 4.3Z" fill="currentColor"/>
                    <path d="M333 120.3C330.3 117.6 326.6 116 322.7 116H6.4C0.6 116 -2.3 123 1.8 127.1L64.6 189.9C67.3 192.6 71 194.2 74.9 194.2H391.2C397 194.2 399.9 187.2 395.8 183.1L333 120.3Z" fill="currentColor"/>
                  </svg>
                  Buy on Solana
                </a>
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
