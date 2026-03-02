"use client";
import React, { useEffect, useRef, useState } from "react";
import { SplitString } from "@/app/utils/SplitString";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";
import {
  Coins,
  Building2,
  Users,
  Brain,
  Network,
  Sparkles,
  Eye,
  Info,
  ArrowRight,
  X,
} from "lucide-react";

const ProtocolArchitecture: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  const text1 = SplitString("Protocol Architecture");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const flowComponents = [
    {
      id: "insight",
      icon: Eye,
      title: "α-AGI Insight",
      subtitle: "Beyond Human Foresight",
      position: { x: 50, y: 5 },
      color: "bg-purple-600",
      details: [
        "Zero-data search ranking for AGI-disrupted sectors",
        "Advanced market analysis and trend prediction",
        "Identifies trillion-dollar rupture points",
        "Real-time sector disruption forecasting",
      ],
    },
    {
      id: "nova-seeds",
      icon: Sparkles,
      title: "α-AGI Nova-Seeds",
      subtitle: "Cryptosealed Foresight Spores",
      position: { x: 15, y: 25 },
      color: "bg-blue-600",
      details: [
        "ERC-721 venture spores with embedded intelligence",
        "Self-forging FusionPlans for autonomous execution",
        "Cryptosealed stellar spores of opportunity",
        "Crystallized nascent futures ready for deployment",
      ],
    },
    {
      id: "mark",
      icon: Network,
      title: "α-AGI MARK",
      subtitle: "Foresight Exchange",
      description:
        "On-chain marketplace where nascent futures crystallize through algorithmic market-makers and validator-driven risk oracles.",
      position: { x: 85, y: 25 },
      color: "bg-green-600",
      details: [
        "Algorithmic market-maker for future opportunities",
        "Validator-driven risk oracle system",
        "Bonding-curve issuance mechanisms",
        "Self-financing launchpad infrastructure",
      ],
    },
    {
      id: "sovereign",
      icon: Building2,
      title: "α-AGI Sovereign",
      subtitle: "Autonomous Enterprises",
      description:
        "Revolutionary blockchain-based enterprises deploying Meta-Agentic frameworks globally, transforming industries through autonomous operations.",
      position: { x: 85, y: 50 },
      color: "bg-orange-600",
      details: [
        "Autonomous blockchain-based enterprises",
        "Meta-Agentic framework deployment",
        "Global scale operational transformation",
        "Self-governing business entities",
      ],
    },
    {
      id: "marketplace",
      icon: Users,
      title: "α-AGI Marketplace",
      subtitle: "Global Job Router",
      description:
        "Decentralized platform matching jobs with optimal AI agents through reputation-weighted auctions, powered by $AGIALPHA settlements.",
      position: { x: 85, y: 75 },
      color: "bg-red-600",
      details: [
        "Reputation-weighted auction system",
        "Global job routing infrastructure",
        "$AGIALPHA settlement mechanism",
        "1% burn on every transaction",
      ],
    },
    {
      id: "architect",
      icon: Brain,
      title: "α-AGI Architect",
      subtitle: "Meta-Agentic Orchestrator",
      description:
        "Foundational operational blueprint that continuously optimizes the entire ecosystem, spawning new agents and refining algorithms.",
      position: { x: 15, y: 75 },
      color: "bg-indigo-600",
      details: [
        "Continuous system optimization",
        "Dynamic agent spawning and management",
        "Algorithm refinement and evolution",
        "Meta-level strategic coordination",
      ],
    },
    {
      id: "reservoir",
      icon: Coins,
      title: "Infinite Value Reservoir",
      subtitle: "Economic Engine",
      description:
        "Treasury accumulating profits and automatically reinvesting into new opportunities, creating a self-sustaining economic flywheel.",
      position: { x: 50, y: 95 },
      color: "bg-yellow-600",
      details: [
        "Automated profit accumulation",
        "Strategic reinvestment algorithms",
        "Self-sustaining economic flywheel",
        "Infinite capital generation potential",
      ],
    },
  ];

  const connections = [
    { from: "insight", to: "nova-seeds" },
    { from: "nova-seeds", to: "mark" },
    { from: "mark", to: "sovereign" },
    { from: "sovereign", to: "marketplace" },
    { from: "marketplace", to: "architect" },
    { from: "architect", to: "reservoir" },
    { from: "reservoir", to: "insight" },
  ];

  const getComponentById = (id: string) =>
    flowComponents.find((c) => c.id === id);

  const isMobile = dimensions.width < 768;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-24 lg:mb-32">
            <motion.h1
              className="mb-8 font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide"
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

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="mb-16 text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide text-center"
            >
              The protocol operates as a perpetual value creation engine, where
              each cycle amplifies the next through autonomous intelligence and
              decentralized governance.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mb-20"
          >
            <div
              ref={containerRef}
              className="relative w-full mx-auto"
              style={{
                height: "65vw",
                maxHeight: "800px",
                minHeight: "400px",
              }}
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                preserveAspectRatio="xMidYMid meet"
              >
                {connections.map((connection, index) => {
                  const from = getComponentById(connection.from);
                  const to = getComponentById(connection.to);
                  if (!from || !to) return null;
                  const x1 = (from.position.x / 100) * dimensions.width;
                  const y1 = (from.position.y / 100) * dimensions.height;
                  const x2 = (to.position.x / 100) * dimensions.width;
                  const y2 = (to.position.y / 100) * dimensions.height;

                  return (
                    <g key={`${connection.from}-${connection.to}`}>
                      {/* Visible line */}
                      <path
                        d={`M ${x1} ${y1} L ${x2} ${y2}`}
                        fill="none"
                        stroke="rgba(107, 114, 128, 0.4)"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        className="animate-pulse"
                        style={{ animationDelay: `${index * 0.3}s` }}
                      />

                      {/* Moving seed */}
                      <circle r="3" fill="rgba(107, 114, 128, 0.6)">
                        <animateMotion
                          dur="4s"
                          repeatCount="indefinite"
                          begin={`${index * 0.5}s`}
                        >
                          <mpath xlinkHref={`#path-${index}`} />
                        </animateMotion>
                      </circle>

                      {/* Hidden path for motion reference */}
                      <path
                        id={`path-${index}`}
                        d={`M ${x1} ${y1} L ${x2} ${y2}`}
                        fill="none"
                        stroke="transparent"
                      />
                    </g>
                  );
                })}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="12"
                    markerHeight="8"
                    refX="11"
                    refY="4"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 12 4, 0 8"
                      fill="rgba(107, 114, 128, 0.4)"
                    />
                  </marker>
                </defs>
              </svg>

              {flowComponents.map((component, index) => {
                const labelStyle: any = isMobile
                  ? {
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      marginTop: "10px",
                      textAlign: "center",
                      maxWidth: "150px",
                    }
                  : {
                      ...(component.position.x <= 25 && {
                        left: "100%",
                        top: "50%",
                        transform: "translateY(-50%)",
                        marginLeft: "20px",
                        textAlign: "left",
                        maxWidth: "200px",
                      }),
                      ...(component.position.x >= 75 && {
                        right: "100%",
                        top: "50%",
                        transform: "translateY(-50%)",
                        marginRight: "20px",
                        textAlign: "right",
                        maxWidth: "200px",
                      }),
                      ...(component.position.x > 25 &&
                        component.position.x < 75 &&
                        component.position.y <= 10 && {
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          marginTop: "20px",
                          textAlign: "center",
                          maxWidth: "200px",
                        }),
                      ...(component.position.x > 25 &&
                        component.position.x < 75 &&
                        component.position.y >= 90 && {
                          bottom: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          marginBottom: "20px",
                          textAlign: "center",
                          maxWidth: "200px",
                        }),
                    };

                return (
                  <div
                    key={component.id}
                    className="absolute group cursor-pointer animate-slide-up z-[10]"
                    style={{
                      left: `${component.position.x}%`,
                      top: `${component.position.y}%`,
                      transform: "translate(-50%, -50%)",
                      animationDelay: `${index * 0.1}s`,
                    }}
                    onClick={() => setSelectedComponent(component.id)}
                  >
                    <div
                      className={`w-15 h-15 md:w-24 md:h-24 bg-heading rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 border-4 border-white relative`}
                    >
                      <component.icon
                        size={28}
                        className="dark:text-[#1C1C1C] text-white"
                      />
                    </div>

                    {/* Dynamic Label */}
                    <div className="absolute text-center" style={labelStyle}>
                      <div className="text-[12px] sm:text-[16px] md:text-lg font-semibold text-heading whitespace-nowrap mb-1">
                        {component.title}
                      </div>
                      <div className="text-[10px] sm:text-[12px] md:text-sm text-text leading-tight whitespace-nowrap">
                        {component.subtitle}
                      </div>
                    </div>

                    <div className="absolute -top-2 -right-2 w-8 h-8 z-[10] bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Info size={14} className="text-gray-600" />
                    </div>
                  </div>
                );
              })}

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-heading rounded-full flex items-center justify-center shadow-xl animate-spin-slow">
                  <ArrowRight size={22} className="text-heading-invert" />
                </div>
              </div>
            </div>
          </motion.div>

          {selectedComponent && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-7 sm:p-12 max-w-2xl w-full relative animate-scale-in">
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
                {(() => {
                  const component = getComponentById(selectedComponent);
                  if (!component) return null;
                  return (
                    <>
                      <div className="flex items-center space-x-4 sm:space-x-6 mb-8">
                        <div
                          className={`w-14 h-14 shrink-0 sm:w-20 sm:h-20 bg-black rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <component.icon size={28} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-3xl font-degular-medium text-black tracking-wide">
                            {component.title}
                          </h3>
                          <p className="text-sm sm:text-[16px] text-black leading-relaxed font-degular tracking-wide">
                            {component.subtitle}
                          </p>
                        </div>
                      </div>
                      {component.description && (
                        <p className="text-sm sm:text-[16px] text-[#1C1C1C] leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
                          {component.description}
                        </p>
                      )}
                      <div className="space-y-4">
                        <h4 className="text-xl sm:text-2xl font-degular-medium text-black tracking-wide">
                          Key Features:
                        </h4>
                        <ul className="space-y-3">
                          {component.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-3"
                            >
                              <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm sm:text-[16px] text-[#1C1C1C] leading-relaxed font-degular tracking-wide">
                                {detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Detailed Flow Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[
              {
                step: "01",
                title: "Discovery & Insight Generation",
                description:
                  "α-AGI Insight analyzes global markets and identifies trillion-dollar disruption opportunities across all sectors.",
                details: [
                  "Market analysis across 50+ sectors",
                  "Real-time data processing",
                  "Predictive modeling",
                  "Risk assessment",
                ],
              },
              {
                step: "02",
                title: "Nova-Seed Crystallization",
                description:
                  "High-value opportunities are crystallized into cryptosealed Nova-Seeds containing executable business plans.",
                details: [
                  "ERC-721 token generation",
                  "Smart contract deployment",
                  "Validation protocols",
                  "Governance integration",
                ],
              },
              {
                step: "03",
                title: "Autonomous Enterprise Creation",
                description:
                  "Validated Nova-Seeds bloom into α-AGI Sovereign enterprises with full operational autonomy.",
                details: [
                  "DAO structure creation",
                  "Treasury management",
                  "Operational frameworks",
                  "Compliance systems",
                ],
              },
              {
                step: "04",
                title: "Value Extraction & Reinvestment",
                description:
                  "Generated profits flow back into the system, funding new cycles of discovery and growth.",
                details: [
                  "Automated profit distribution",
                  "Treasury optimization",
                  "Reinvestment strategies",
                  "Compound growth",
                ],
              },
            ].map((item, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index / 4 }}
                key={index}
              >
                <div className=" h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-8 sm:p-12 hover:scale-102 transition-all duration-1000 cursor-pointer">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 shrink-0 font-degular-medium tracking-wide bg-heading rounded-full flex items-center justify-center text-heading-invert font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-[18px] text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {item.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <span className="text-sm text-text leading-relaxed font-degular tracking-wide">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProtocolArchitecture;
