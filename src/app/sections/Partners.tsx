import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SplitString } from "../utils/SplitString";
import "swiper/css";
import "swiper/css/pagination";

const Partners = () => {
  const { theme } = useTheme();
  const text1 = SplitString("Partners & Integrations");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const trusteesLight = [
    "/openai-white.png",
    "/deepseek-white.png",
    "/openai-white.png",
    "/deepseek-white.png",
    "/openai-white.png",
    "/deepseek-white.png",
    "/openai-white.png",
    "/deepseek-white.png",
    "/openai-white.png",
    "/deepseek-white.png",
    "/openai-white.png",
    "/deepseek-white.png",
    "/openai-white.png",
    "/deepseek-white.png",
    "/openai-white.png",
    "/deepseek-white.png",
  ];

  const trusteesDark = [
    "/openai-black.png",
    "/deepseek-black.png",
    "/openai-black.png",
    "/deepseek-black.png",
    "/openai-black.png",
    "/deepseek-black.png",
    "/openai-black.png",
    "/deepseek-black.png",
    "/openai-black.png",
    "/deepseek-black.png",
    "/openai-black.png",
    "/deepseek-black.png",
    "/openai-black.png",
    "/deepseek-black.png",
    "/openai-black.png",
    "/deepseek-black.png",
  ];

  return (
    <section className="py-20 px-[20px] bg-[#FAFAFA] dark:bg-[#030303] overflow-hidden border-y border-black/20 dark:border-none">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          className="mb-24 font-degular text-[40px] leading-[35px] sm:text-[50px] sm:leading-[45px] text-heading tracking-wide text-center"
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
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={120}
        speed={1000}
        autoplay={{
          delay: 800,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {theme === "light" &&
          trusteesDark.map((trustee, key) => (
            <SwiperSlide key={`trustee-dark-${key}`} style={{ width: "auto" }}>
              <Image src={trustee} width={150} height={150} alt={trustee} />
            </SwiperSlide>
          ))}
        {theme === "dark" &&
          trusteesLight.map((trustee, key) => (
            <SwiperSlide key={`trustee-light-${key}`} style={{ width: "auto" }}>
              <Image src={trustee} width={150} height={150} alt={trustee} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Partners;
