"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SplitString } from "../utils/SplitString";
import { useTheme } from "next-themes";

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1 = SplitString("AGI Ascension");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force all attributes at the DOM level for iOS Safari
    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "auto";

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    // Try immediately, and also retry when video data is ready
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    // Also retry on first user interaction as a last resort
    const onInteraction = () => {
      tryPlay();
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
    };
    document.addEventListener("touchstart", onInteraction, { passive: true });
    document.addEventListener("click", onInteraction);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
    };
  }, []);

  return (
    <section className="w-full min-h-screen px-[20px] pt-[150px] pb-[50px] bg-white dark:bg-transparent lg:pt-0 lg:pb-0 flex items-center overflow-hidden">
      <div className="mx-auto max-w-7xl w-full flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          <motion.h1
            className="mb-2 font-degular-medium text-[60px] leading-[55px] sm:text-[90px] sm:leading-[85px] text-heading tracking-wide"
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
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mb-10 w-full"
          >
            <span className="font-degular text-[30px] leading-[25px] sm:text-[40px] sm:leading-[35px] tracking-wide text-heading/80">
              The Ultimate Alpha Signal Engine
            </span>
          </motion.div>
        </div>
        <div className="w-full lg:w-[50%] relative">
          {/* Inline src instead of <source> for better mobile autoplay compat */}
          <video
            ref={videoRef}
            className="lg:absolute lg:-top-80 scale-130 lg:scale-120 pointer-events-none"
            src="/hero.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            style={{
              mixBlendMode: theme === "light" ? "difference" : "screen",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
