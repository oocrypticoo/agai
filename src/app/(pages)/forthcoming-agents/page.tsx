"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import Footer from "@/app/sections/Footer";
import {
  DollarSign,
  Dna,
  Cog,
  FileText,
  Zap,
  Package,
  ShoppingCart,
  Shield,
  Globe,
  Pill,
  Link,
  Users,
} from "lucide-react";

const AgentGallery: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("Forthcoming");
  const text2 = SplitString("α-AGI Agents");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const agents = [
    {
      id: 1,
      name: "Finance Agent",
      icon: DollarSign,
      directive: "Multi-factor alpha & RL execution",
      status: "Production",
      envVar: "BROKER_DSN",
      description:
        "Live momentum + risk-parity bot on Binance test-net. Generates real P&L; stress-tested against CVaR.",
      color: "from-green-500 to-green-600",
    },
    {
      id: 2,
      name: "Biotech Agent",
      icon: Dna,
      directive: "CRISPR & assay proposals",
      status: "Production",
      envVar: "OPENAI_API_KEY",
      description:
        "Genetic engineering optimization and bioassay design for pharmaceutical research and development.",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      name: "Manufacturing Agent",
      icon: Cog,
      directive: "CP-SAT optimizer",
      status: "Production",
      envVar: "SCHED_HORIZON",
      description:
        "Constraint programming for production scheduling and supply chain optimization.",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 4,
      name: "Policy Agent",
      icon: FileText,
      directive: "Statute QA & diffs",
      status: "Production",
      envVar: "STATUTE_CORPUS_DIR",
      description:
        "Legal document analysis and regulatory compliance monitoring across jurisdictions.",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 5,
      name: "Energy Agent",
      icon: Zap,
      directive: "Spot-vs-forward arbitrage",
      status: "Beta",
      envVar: "ISO_TOKEN",
      description:
        "Energy market analysis and arbitrage opportunities in electricity and commodity markets.",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 6,
      name: "Supply Chain Agent",
      icon: Package,
      directive: "Stochastic MILP routing",
      status: "Beta",
      envVar: "SC_DB_DSN",
      description:
        "Mixed-integer linear programming for optimal logistics and inventory management.",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: 7,
      name: "Retail Demand Agent",
      icon: ShoppingCart,
      directive: "SKU forecast & pricing",
      status: "Beta",
      envVar: "POS_DB_DSN",
      description:
        "Demand forecasting and dynamic pricing optimization for retail operations.",
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 8,
      name: "Cyber Security Agent",
      icon: Shield,
      directive: "Predict & patch CVEs",
      status: "Beta",
      envVar: "VT_API_KEY",
      description:
        "Vulnerability assessment and automated security patch deployment.",
      color: "from-red-500 to-red-600",
    },
    {
      id: 9,
      name: "Climate Risk Agent",
      icon: Globe,
      directive: "ESG stress tests",
      status: "Beta",
      envVar: "NOAA_TOKEN",
      description:
        "Environmental risk modeling and ESG compliance monitoring for sustainable operations.",
      color: "from-teal-500 to-teal-600",
    },
    {
      id: 10,
      name: "Drug Design Agent",
      icon: Pill,
      directive: "Diffusion + docking",
      status: "Incubator",
      envVar: "CHEMBL_KEY",
      description:
        "Molecular design using diffusion models and protein-ligand docking simulations.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: 11,
      name: "Smart Contract Agent",
      icon: Link,
      directive: "Formal verification",
      status: "Incubator",
      envVar: "ETH_RPC_URL",
      description:
        "Blockchain smart contract analysis and formal verification for security assurance.",
      color: "from-violet-500 to-violet-600",
    },
    {
      id: 12,
      name: "Talent Match Agent",
      icon: Users,
      directive: "Auto-bounty hiring",
      status: "Incubator",
      envVar: "—",
      description:
        "Automated talent acquisition and skill matching for optimal team composition.",
      color: "from-emerald-500 to-emerald-600",
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
              className="text-[16px] sm:text-xl text-text max-w-3xl mx-auto leading-relaxed font-degular tracking-wide"
            >
              Each agent exports signed proof-of-alpha messages to the Kafka
              bus, enabling cross-breeding of opportunities across industries.
            </motion.p>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                key={index}
              >
                <Card agent={agent} />
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AgentNetwork />
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const Card = ({ agent }: { agent: any }) => {
  return (
    <div
      key={agent.id}
      className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-8 hover:scale-102 transition-all duration-1000 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-11 h-11 bg-heading backdrop-blur-xl rounded-full flex items-center justify-center`}
        >
          <agent.icon size={25} className="text-heading-invert" />
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-text/5 text-text font-degular-medium tracking-widest">
          {agent.status}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-2">
          {agent.name}
        </h3>

        <p className="text-[16px] sm:text-[18px] text-text leading-relaxed mb-2 font-degular tracking-wide">
          {agent.directive}
        </p>

        <p className="text-sm sm:text-[16px] text-text leading-relaxed mb-2 font-degular tracking-wide">
          {agent.description}
        </p>

        {agent.envVar !== "—" && (
          <div className="bg-gray-100 dark:bg-[#222222]  rounded-lg p-3">
            <div className="text-xs text-heading mb-1 font-degular tracking-wide">
              Environment Variable
            </div>
            <code className="text-sm text-text font-degular tracking-wide">
              {agent.envVar}
            </code>
          </div>
        )}
      </div>

      {/* Agent ID */}
      <div className="mt-4 pt-4 border-t border-text/10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-degular tracking-wide">
            Agent #{agent.id.toString().padStart(2, "0")}
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const AgentNetwork = () => {
  return (
    <div className="mt-16 sm:mt-20 h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-8 sm:p-12 hover:scale-102 transition-all duration-1000 cursor-pointer">
      <div className="text-center mb-8">
        <h3 className="text-4xl md:text-5xl font-degular-medium tracking-wide text-heading mb-8">
          Agent Network Status
        </h3>
        <p className="text-text font-degular tracking-wide">
          Real-time performance across all specialized agents
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {[
          { value: "4", label: "Production Ready" },
          { value: "5", label: "Beta Testing" },
          { value: "3", label: "Incubator Stage" },
          { value: "99.7%", label: "Network Uptime" },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl lg:text-4xl font-degular-medium tracking-wide text-heading mb-2">
              {stat.value}
            </div>
            <div className="text-text text-[16px] md:text-lg font-degular tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentGallery;
