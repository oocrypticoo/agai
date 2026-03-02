"use client";
import React, { useEffect, useState } from "react";
import { SplitString } from "@/app/utils/SplitString";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";
import { Terminal, ExternalLink, Copy } from "lucide-react";

const QuickStart: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("Neural");
  const text2 = SplitString("Initialization");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const quickStartSteps = [
    {
      title: "Clone Repository",
      code: `git clone --branch v0.1.0-alpha https://github.com/MontrealAI/AGI-Alpha-Agent-v0.git
cd AGI-Alpha-Agent-v0
python check_env.py --auto-install`,
      description:
        "Get the stable v0.1.0-alpha release and verify dependencies",
    },
    {
      title: "Quick Launch",
      code: `./quickstart.sh
# or using Docker
docker compose up --build`,
      description: "Launch the α-AGI system locally with one command",
    },
    {
      title: "Run Insight Demo",
      code: `alpha-agi-insight-v1 --episodes 5
# or run directly
python -m alpha_factory_v1.demos.alpha_agi_insight_v1 --episodes 5`,
      description: "Launch the α-AGI Insight forecasting demo",
    },
    {
      title: "Docker Alternative",
      code: `# Pre-built image
docker run --pull=always -p 8000:8000 ghcr.io/montrealai/alpha-factory:latest`,
      description: "One-click deployment with pre-built Docker image",
    },
  ];

  const demoLinks = [
    {
      name: "Interactive Demo",
      url: "https://montrealai.github.io/AGI-Alpha-Agent-v0/alpha_agi_insight_v1/",
      description: "Try the browser-based demo with zero setup",
    },
    {
      name: "Full Documentation",
      url: "https://montrealai.github.io/AGI-Alpha-Agent-v0/",
      description: "Complete technical documentation and guides",
    },
    {
      name: "Demo Gallery",
      url: "https://montrealai.github.io/AGI-Alpha-Agent-v0/alpha_factory_v1/demos/",
      description: "Explore all 14 interactive demonstrations",
    },
    {
      name: "GitHub Repository",
      url: "https://github.com/MontrealAI/AGI-Alpha-Agent-v0",
      description: "Source code and development resources",
    },
  ];

  const systemRequirements = [
    {
      tier: "Minimum",
      requirements: [
        "Python 3.11+",
        "8GB RAM",
        "50GB Storage",
        "Docker 20.10+",
      ],
    },
    {
      tier: "Recommended",
      requirements: [
        "Python 3.13",
        "32GB RAM",
        "500GB SSD",
        "Docker Compose 2.5+",
      ],
    },
    {
      tier: "Production",
      requirements: [
        "Kubernetes Cluster",
        "128GB RAM",
        "2TB NVMe",
        "Load Balancer",
      ],
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 sm:mb-20">
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
              className="mb-8 font-degular-thin text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-text/70 tracking-wide"
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
              className="text-[16px] sm:text-xl text-text max-w-2xl mx-auto leading-relaxed font-degular tracking-wide"
            >
              Launch the α-AGI system locally or try the interactive demos.
              Requires Python 3.11-3.13 and Docker Compose ≥2.5.
            </motion.p>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-8 hover:scale-102 transition-all duration-1000 cursor-pointer mb-16">
              <div className="flex items-start space-x-3">
                <div className="neural-node w-8 h-8 glass-ultra bg-heading/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-heading text-sm font-normal quantum-text">
                    !
                  </span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-3">
                    Research Prototype Disclaimer
                  </h3>
                  <p className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
                    This repository is a conceptual research prototype.
                    References to "AGI" and "superintelligence" describe
                    aspirational goals and do not indicate the presence of a
                    real general intelligence. Use at your own risk. Nothing
                    herein constitutes financial advice. MontrealAI and the
                    maintainers accept no liability for losses incurred from
                    using this software.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Start Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16">
            {quickStartSteps.map((step, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index / 4 }}
                key={index}
              >
                <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-8 hover:scale-102 transition-all duration-1000 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="neural-node w-10 h-10 bg-heading/10 rounded-2xl flex items-center justify-center text-sm font-normal">
                        <span className="text-heading cyber-title">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide">
                        {step.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(step.code)}
                      className=" p-3 rounded-xl bg-heading/10 text-heading transition-colors duration-300 cursor-pointer"
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                  </div>

                  <div className="glass-ultra rounded-2xl p-6 mb-6 overflow-x-auto neon-border">
                    <pre className="text-sm text-text leading-relaxed mb-4 sm:mb-6 font-mono">
                      <code>{step.code}</code>
                    </pre>
                  </div>

                  <p className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-8 sm:p-16 hover:scale-102 transition-all duration-1000 cursor-pointer mb-16">
              <h3 className="mb-10 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
                Neural Demo Matrix
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {demoLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    className="group bg-gray-100 dark:bg-[#222222] rounded-2xl p-8 transition-all duration-500"
                  >
                    <div className="mb-3 neural-node w-8 h-8 glass-ultra rounded-lg flex items-center justify-center">
                      <ExternalLink
                        size={28}
                        className="text-heading transition-colors duration-300 quantum-text"
                      />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-3">
                      {link.name}
                    </h4>

                    <p className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
                      {link.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-8 sm:p-16 hover:scale-102 transition-all duration-1000 cursor-pointer">
              <div className="text-center mb-16">
                <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
                  System Requirements
                </h3>
                <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                  Deployment options for every scale and use case
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {systemRequirements.map((tier, index) => (
                  <div
                    key={index}
                    className={`p-7 sm:p-12 rounded-2xl transition-all duration-300 bg-gray-100 dark:bg-[#222222]`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 shadow-lg bg-heading`}
                    >
                      <Terminal size={24} className="text-heading-invert" />
                    </div>

                    <h4 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-3">
                      {tier.tier}
                    </h4>

                    <div className="space-y-4">
                      {tier.requirements.map((req, reqIndex) => (
                        <div
                          key={reqIndex}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-heading/20 rounded-full"></div>
                          <span className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
                            {req}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default QuickStart;
