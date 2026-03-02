"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { SplitString } from "../utils/SplitString";
import ButtonPrimary from "../components/ButtonPrimary";
import { Award, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import XDynamic from "../components/svg/XDynamic";
import ButtonSecondary from "../components/ButtonSecondary";

const Founder = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const text1 = SplitString("Founder and");
  const text2 = SplitString("Chief Scientist");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const achievements = [
    {
      year: "2003",
      title: "MONTREAL.AI Founded",
      description:
        "Established MONTREAL.AI and QUEBEC.AI, pioneering AI research organizations",
      link: "https://montreal.ai/",
    },
    {
      year: "2016",
      title: "OpenAI Gym #1 Worldwide",
      description:
        "Dominated the OpenAI Gym with AI Agents, achieving #1 ranking globally",
      link: "https://web.archive.org/web/20170929214241/https://gym.openai.com/read-only.html",
    },
    {
      year: "2017",
      title: "Multi-Agent AI DAO Blueprint",
      description:
        'Unveiled groundbreaking "Multi-Agent AI DAO" architectural framework',
      link: "https://www.youtube.com/watch?v=Y4_6aZbVlo4",
    },
    {
      year: "2024",
      title: "α-AGI Meta-Agentic Release",
      description: "Launched the revolutionary Meta-Agentic α-AGI system",
      link: "https://agialpha.com/whitepaper",
    },
  ];

  const socialLinks = [
    { icon: XDynamic, href: "https://x.com/ceobillionaire", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/montrealai",
      label: "LinkedIn",
    },
    { icon: Youtube, href: "https://www.youtube.com/@AGIAlpha", label: "Youtube" },
    { icon: Github, href: "https://github.com/MontrealAI", label: "GitHub" },
  ];

  return (
    <section
      id="founder"
      className="relative py-20 sm:py-25 px-[20px] bg-white dark:bg-black overflow-hidden z-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-15 sm:mb-28 w-full flex lg:flex-row flex-col-reverse justify-center items-center gap-10 lg:gap-0">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 w-full flex justify-center bg-transparent"
          >
              <Image
                style={{
                  boxShadow: theme === "dark" ? "0 4px 100px #4747477b" : "",
                  borderRadius: 20,
                }}
                src={"/vincent-c.png"}
                width={2000}
                height={2000}
                alt="vincent-interview"
                className="scale-103"
  
              />
          </motion.div>
          <div className="w-full lg:pl-15">
            <motion.h1
              className="font-degular-medium text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-heading tracking-wide"
              style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.035 }}
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
              className="mb-5 font-degular-medium text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-heading tracking-wide"
              style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.035 }}
            >
              {text2.map((char: string, key: number) => (
                <motion.span
                  key={key}
                  transition={{ duration: 0.5, delayChildren: 0.5 }}
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
              className="mb-4 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
            >
              <span className="font-semibold text-heading">
                Vincent Boucher
              </span>{" "}
              (b. 1973, Quebec City) rapidly advanced through academia in
              physics and later earned master’s degrees in government policy and
              aerospace engineering. From 2000 to 2002, he contributed to
              research and consulting at the Canadian Space Agency. In 2003, he
              founded{" "}
              <span className="font-semibold text-heading">Montréal.AI</span>, a
              leading AI research hub, and{" "}
              <span className="font-semibold text-heading">Québec.AI</span>,
              aiming to make Quebec a global AI powerhouse by 2030. Recognized
              for deep expertise in deep learning, reinforcement learning, and
              quantum-AI, Boucher gained prominence through technical
              achievements—such as winning OpenAI Gym competition in 2016—and as
              a visionary leader committed to AI innovation and governance.
            </motion.p>
            <div className="w-full flex justify-between sm:items-center gap-3">
              <div className="flex justify-start items-center">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <ButtonPrimary
                    text="View Bio"
                    width={130}
                    onClick={() => router.push("/biography")}
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="shrink-0 flex justify-start items-center gap-1"
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    className="shrink-0 w-8 h-8 bg-heading rounded-full flex items-center justify-center transition-all duration-300 hover:scale-115"
                    aria-label={social.label}
                  >
                    <social.icon
                      className="w-4 h-4 stroke-heading-invert"
                    />
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index / 3 }}
              key={index}
            >
              <AchievementCard
                key={`achievement-${index}`}
                achievement={achievement}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AchievementCard = ({ achievement }: { achievement: any }) => {
  return (
    <div className="flex flex-col justify-between gap-5 h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg px-5 py-7 text-center transition-all duration-1000 hover:scale-102">
      <div className="w-full">
        <div className="w-16 h-16 bg-heading rounded-full flex items-center justify-center mx-auto mb-6">
          <Award size={24} className="text-heading-invert" />
        </div>
        <div className="text-xl font-degular text-text tracking-wide mb-4">
          {achievement.year}
        </div>
        <h4 className="text-[21px] font-degular-semibold text-heading tracking-wide mb-2">
          {achievement.title}
        </h4>
        <p className="font-degular text-text text-[16px] leading-relaxed tracking-wide">
          {achievement.description}
        </p>
      </div>
      <div className="w-full flex justify-center">
        <ButtonSecondary
          text="Learn More"
          width={100}
          onClick={() => window.open(achievement.link, "_blank")}
        />
      </div>
    </div>
  );
};

export default Founder;
