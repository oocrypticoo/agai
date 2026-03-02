import React from "react";
import { motion } from "framer-motion";
import { SplitString } from "../utils/SplitString";
import { ArrowRight, Brain, Network, Settings2 } from "lucide-react";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";

const AGINetwork = () => {
  const text1 = SplitString("The $AGI Network today");

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
    },
    {
      icon: Settings2,
      title: "JOBS",
      description:
        "Beyond-Human Foresight. Where human foresight reaches its limits, α‑AGI Insight sees beyond, identifying sectors poised for AGI disruption.",
    },
    {
      icon: Network,
      title: "PROTOCOL",
      description:
        "Beyond-Human Foresight. Where human foresight reaches its limits, α‑AGI Insight sees beyond, identifying sectors poised for AGI disruption.",
    },
  ];

  return (
    <section id="agi-network" className="py-20 sm:py-25 px-[20px] bg-black overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          className="mb-20 font-degular-medium text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-white tracking-wide"
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
        <div className="mb-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
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
        <div className="w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ButtonPrimary
              text="Open Dashboard"
              Icon={ArrowRight}
              invert={true}
              width={150}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ feature }: { feature: any }) => {
  return (
    <div className="flex justify-center h-full border border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-8 hover:scale-102 transition-all duration-1000 cursor-pointer">
      <div className="w-full">
        <h3 className="text-xl sm:text-2xl font-degular-medium text-white tracking-wide mb-3 sm:mb-4 text-center">
          {feature.title}
        </h3>
        <div className="flex justify-center mb-4 sm:mb-6">
          <feature.icon className="text-white size-12" />
        </div>
        <p className="text-sm sm:text-[16px] text-[#cfcfcf] leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide text-center">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default AGINetwork;
