"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import Footer from "@/app/sections/Footer";
import { Eye, Sparkles, Brain, Network, Shield, Coins } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

const WhitePaperOverview: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("α-AGI Components");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const keyComponents = [
    {
      icon: Eye,
      title: "α-AGI Insight",
      subtitle: "Beyond Human Foresight",
      description:
        "Where human foresight reaches its limits, α-AGI Insight sees beyond, identifying sectors poised for AGI disruption.",
      highlight: "Trillion-dollar rupture points",
    },
    {
      icon: Sparkles,
      title: "α-AGI Nova-Seeds",
      subtitle: "Cryptosealed Foresight Spores",
      description:
        "ERC-721 tokens containing foresight genomes and self-forging FusionPlans that crystallize nascent futures.",
      highlight: "Stellar spores of intelligence",
    },
    {
      icon: Network,
      title: "α-AGI MARK",
      subtitle: "Foresight Exchange & Risk Oracle",
      description:
        "On-chain marketplace where nascent futures crystallize into reality through algorithmic market-makers.",
      highlight: "Validator-driven risk oracle",
    },
    {
      icon: Brain,
      title: "α-AGI Sovereign",
      subtitle: "Autonomous Enterprise Transformation",
      description:
        "Revolutionary blockchain-based enterprises deploying Meta-Agentic frameworks at global scale.",
      highlight: "Meta-agentic mastery",
    },
    {
      icon: Shield,
      title: "Large-Scale Marketplace",
      subtitle: "Global Job Router",
      description:
        "Decentralized platform where α-Jobs are matched with optimal AI agents through reputation-weighted auctions.",
      highlight: "Powered by $AGIALPHA",
    },
    {
      icon: Coins,
      title: "$AGIALPHA Token",
      subtitle: "Utility-Only Economy",
      description:
        "Strict utility token enabling seamless value flow with 1% burn mechanism and compliance-friendly structure.",
      highlight: "No equity or ownership rights",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="mb-20 font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide text-center"
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
          {/* Core Components Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16 items-start">
            {keyComponents.map((component, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index / 5 }}
                key={index}
              >
                <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-7 sm:p-10 hover:scale-102 transition-all duration-1000 cursor-pointer flex sm:flex-row flex-col items-start space-x-6 gap-4 sm:gap-0">
                  <div className="w-16 h-16 bg-heading rounded-2xl flex justify-center items-center flex-shrink-0">
                    <component.icon size={28} className="text-heading-invert" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-3">
                        {component.title}
                      </h3>
                      <p className="text-lg text-heading font-degular-medium">
                        {component.subtitle}
                      </p>
                    </div>
                    <p className="text-sm sm:text-[16px] text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
                      {component.description}
                    </p>
                    <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-[#222222] rounded-full px-4 py-2 mt-auto">
                      <div className="w-2 h-2 bg-gray-800 dark:bg-white/60 rounded-full"></div>
                      <span className="text-sm font-degular-medium tracking-wide text-text">
                        {component.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center centered-content">
            <div className="inline-flex flex-col sm:flex-row items-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <ButtonPrimary
                  text="Read Full White Paper"
                  width={180}
                  onClick={() => router.push("/whitepaper")}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WhitePaperOverview;
