"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Award, Calendar, MapPin, Briefcase } from "lucide-react";
import { SplitString } from "@/app/utils/SplitString";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import Footer from "@/app/sections/Footer";
import { useRouter } from "nextjs-toploader/app";
import ButtonSecondary from "@/app/components/ButtonSecondary";

const VincentBio: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("Vincent Boucher");
  const text2 = SplitString("AI Pioneer & Meta-Agentic Architect");
  const text3 = SplitString("Key Achievements");

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="mx-auto max-w-7xl relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h1
              className="mb-2 font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide"
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
              className="font-degular-thin text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-text/70 tracking-wide"
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
          </div>
          {/* Biography Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="max-w-7xl mx-auto mb-16"
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-2xl shadow-sm hover:shadow-lg py-8 px-5 sm:p-16 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                {/* Profile Info */}
                <div className="lg:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                    <div className="h-14 w-14 sm:w-16 sm:h-16 shrink-0 bg-heading rounded-2xl flex items-center justify-center">
                      <User size={28} className="text-heading-invert" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-degular-semibold tracking-wide text-heading">
                        Vincent Boucher
                      </h3>
                      <p className="text-xl font-degular tracking-wide text-text">
                        President of MONTREAL.AI
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 text-[16px] sm:text-lg font-degular tracking-wide text-text leading-relaxed">
                    <p>
                      <strong>Born in Québec City in July 1973</strong>, Vincent
                      Boucher’s early years were marked by instability; Quebec
                      media later profiled him as a precocious, self-driven
                      student who set his sights on science from a young age.
                      Despite the absence of formal education, Vincent taught
                      himself advanced physics, chemistry, and music. Vincent
                      completed bachelor degrees in Chemistry and Theoretical
                      Physics at Université Laval in just six weeks, later
                      earning graduate degrees in Aerospace Engineering and
                      Government Policy.
                    </p>
                    <p>
                      From 2000 to 2003, Vincent worked at the Canadian Space
                      Agency, contributing to advanced aerospace research. He
                      left in 2003 to pursue artificial intelligence
                      independently, founding Montréal.AI. During this period,
                      limited computing power constrained his theoretical
                      progress toward Artificial General Intelligence (AGI). The
                      release of the NVIDIA Tesla K80 GPU in 2014 marked a
                      turning point, enabling him to train deep neural networks
                      and advance his AGI research. Over the following years,
                      Vincent focused on hybrid AI models, reinforcement
                      learning, few-shot learning, and quantum-AI intersections.
                      Through Montréal.AI and Québec.AI, he published early
                      white papers on dynamic learning systems and championed AI
                      alignment and governance. He emphasized a
                      systems-theoretic and ethically grounded approach to
                      machine intelligence.
                    </p>
                    <p>
                      From 2019 onward, Vincent positioned Montréal.AI as a
                      global platform for AGI thought leadership, hosting
                      seminars, sharing research, and advocating for
                      decentralized, value-aligned development. His current work
                      centers on self-supervised learning, AI safety,
                      interpretability, and long-term alignment. Vincent’s
                      life—from institutional hardship to pioneering AI
                      research—reflects a rare blend of intellectual
                      self-discipline and ethical vision, making him one of the
                      most unconventional figures in the pursuit of AGI.
                    </p>
                  </div>

                  <div className="mt-8">
                    <ButtonPrimary
                      text="Read Extended Biography"
                      width={180}
                      onClick={() => router.push("/full-biography")}
                    />
                  </div>
                </div>
                {/* Key Stats */}
                <div className="space-y-8">
                  <div className="border border-gray-300 dark:bg-[#222222] dark:border-white/20 shadow-sm rounded-2xl p-8 transition-all duration-500">
                    <div className="flex items-center space-x-3 mb-6">
                      <MapPin size={20} className="text-heading" />
                      <span className="text-lg font-degular-semibold tracking-wide text-heading">
                        Quebec City, Canada
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mb-6">
                      <Calendar size={20} className="text-heading" />
                      <span className="text-lg font-degular-semibold tracking-wide text-heading">
                        Born 1973
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase size={20} className="text-heading" />
                      <span className="text-lg font-degular-semibold tracking-wide text-heading">
                        Canadian Space Agency
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-degular-bold text-heading mb-2">
                      21+
                    </div>
                    <div className="text-text font-degular-medium tracking-wide">
                      Years Leading AI Innovation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievement Timeline */}
          <div>
            <motion.h1
              className="mb-[60px] font-degular text-[40px] sm:text-[60px] leading-[40px] sm:leading-[70px] text-heading tracking-wide text-center"
              style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.04, delayChildren: 0.5 }}
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
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

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-8 sm:p-16 hover:scale-102 transition-all duration-1000 cursor-pointer">
                <div className="text-center mb-12 centered-content">
                  <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
                    Vincent Boucher - AI Pioneer
                  </h3>
                  <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                    President of MONTREAL.AI and QUEBEC.AI since 2003, reshaped
                    the AI landscape by dominating the OpenAI Gym with his AI
                    Agents in 2016 (#1 worldwide). In 2017, he unveiled the
                    groundbreaking "Multi-Agent AI DAO" blueprint.
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { year: "2003", achievement: "MONTREAL.AI Founded" },
                    { year: "2016", achievement: "OpenAI Gym #1 Worldwide" },
                    {
                      year: "2017",
                      achievement: "Multi-Agent AI DAO Blueprint",
                    },
                    { year: "2024", achievement: "α-AGI Meta-Agentic Release" },
                  ].map((milestone, index) => (
                    <div key={index} className="text-center relative">
                      <div className="text-[24px] sm:text-4xl text-heading max-w-4xl mx-auto leading-relaxed font-degular-medium tracking-wide">
                        {milestone.year}
                      </div>
                      <div className="text-text text-[16px] font-degular tracking-wide">
                        {milestone.achievement}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
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

export default VincentBio;
