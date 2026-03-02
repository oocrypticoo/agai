"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { SplitString } from "@/app/utils/SplitString";
import Footer from "@/app/sections/Footer";
import {
  RefreshCw,
  Coins,
  Building2,
  Users,
  Shield,
  Brain,
  Network,
  Target,
  CheckCircle,
  TrendingUp,
  Layers,
} from "lucide-react";

const OptimizedFlywheel: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex]: any = useState(null);

  const text1 = SplitString("α-AGI Job Marketplace");
  const text2 = SplitString("Self-Reinforcing Engine");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const flywheelSteps = [
    {
      number: "01",
      title: "Job Posting & Escrow",
      description:
        "α-AGI Sovereigns post jobs with clear success criteria and bounty rewards escrowed in $AGIALPHA tokens.",
      icon: Building2,
      color: "bg-gray-700",
      angle: 0,
      optimizations: [
        "Multi-agent job orchestration",
        "Dynamic pricing algorithms",
      ],
    },
    {
      number: "02",
      title: "Agent Bidding & Selection",
      description:
        "Reputation-weighted auction mechanism selects optimal agents based on performance history and capability matching.",
      icon: Users,
      color: "bg-gray-700",
      angle: 51.4,
      optimizations: [
        "Advanced matching algorithms",
        "Sybil resistance protocols",
      ],
    },
    {
      number: "03",
      title: "Autonomous Execution",
      description:
        "Selected agents execute jobs with minimal human intervention, leveraging specialized algorithms and models.",
      icon: Brain,
      color: "bg-gray-700",
      angle: 102.8,
      optimizations: ["Real-time monitoring", "Failure recovery mechanisms"],
    },
    {
      number: "04",
      title: "Tiered Validation",
      description:
        "Automated validation for simple tasks, human validators for complex work, ensuring quality at scale.",
      icon: Shield,
      color: "bg-gray-700",
      angle: 154.2,
      optimizations: [
        "Smart contract validation",
        "Validator incentive system",
      ],
    },
    {
      number: "05",
      title: "Dynamic Settlement",
      description:
        "Variable burn rates (0.1%-2%) based on job complexity, with validator rewards and reputation updates.",
      icon: Coins,
      color: "bg-gray-700",
      angle: 205.6,
      optimizations: ["Dynamic burn mechanism", "Reputation decay system"],
    },
    {
      number: "06",
      title: "Value Reservoir",
      description:
        "Treasury accumulates profits and automatically reinvests into new Nova-Seeds and marketplace expansion.",
      icon: Target,
      color: "bg-gray-700",
      angle: 257,
      optimizations: ["Automated reinvestment", "Risk management protocols"],
    },
    {
      number: "07",
      title: "System Optimization",
      description:
        "α-AGI Architect continuously refines algorithms, spawns new agents, and optimizes marketplace efficiency.",
      icon: RefreshCw,
      color: "bg-gray-700",
      angle: 308.4,
      optimizations: ["Machine learning optimization", "Predictive scaling"],
    },
  ];

  const optimizationFeatures = [
    {
      title: "Tiered Validation System",
      description:
        "Automated validation for routine tasks, human oversight for complex jobs",
      icon: Layers,
      impact: "10x throughput increase",
      status: "Implemented",
    },
    {
      title: "Dynamic Burn Mechanism",
      description:
        "Variable burn rates prevent small job constraints while maintaining deflationary pressure",
      icon: TrendingUp,
      impact: "40% cost reduction",
      status: "Active",
    },
    {
      title: "Validator Incentives",
      description: "Direct compensation ensures quality validation at scale",
      icon: Shield,
      impact: "99.9% accuracy",
      status: "Live",
    },
    {
      title: "Multi-Agent Orchestration",
      description: "Complex jobs requiring coordinated agent collaboration",
      icon: Network,
      impact: "5x job complexity",
      status: "Beta",
    },
  ];

  const getRadius = () => {
    if (typeof window === "undefined") return 250;
    const w = window.innerWidth;
    if (w < 480) return 130;
    if (w < 550) return 160;
    if (w < 768) return 220;
    return 250;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center -mb-40 sm:mb-24">
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
              className="mb-6 text-[24px] sm:text-3xl text-text max-w-4xl mx-auto leading-tight font-degular-medium tracking-wide text-center"
            >
              Optimized flywheel mechanism with tiered validation, dynamic
              economics, and multi-agent orchestration
            </motion.p>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="mb-16 text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide text-center"
            >
              Strategic improvements address scaling bottlenecks while
              maintaining trust and efficiency across the entire job lifecycle
              from posting to completion.
            </motion.p>
          </div>

          {/* Main Flywheel Diagram */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div
              className="-mb-20 sm:mb-20 relative flex justify-center items-center"
              style={{ minHeight: "700px", width: "100%" }}
            >
              {/* Central Core */}
              <div className="absolute z-layer-20 flex justify-center items-center">
                <div className="w-10 h-10 sm:w-15 sm:h-15 md:w-32 md:h-32 bg-heading rounded-full flex justify-center items-center shadow-2xl animate-pulse">
                  <RefreshCw
                    size={32}
                    className="text-heading-invert animate-spin-slow"
                  />
                </div>
                <div className="absolute top-full mt-4 text-center whitespace-nowrap">
                  <div className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide">
                    Optimized Core
                  </div>
                  <div className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
                    Self-Reinforcing
                  </div>
                </div>
              </div>

              {/* Flywheel Steps */}
              <div className="absolute inset-0 flex justify-center items-center">
                {flywheelSteps.map((step, index) => {
                  const radius = getRadius();
                  const angleRad = (step.angle * Math.PI) / 180;
                  const x = Math.sin(angleRad) * radius;
                  const y = -Math.cos(angleRad) * radius;

                  const isActive = activeIndex === index;

                  return (
                    <div
                      key={index}
                      className={`absolute group ${isActive ? "z-50" : ""}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      {/* Step Circle */}
                      <div
                        className={`w-15 h-15 md:w-20 md:h-20 bg-heading rounded-full flex justify-center items-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer border-4 border-white`}
                      >
                        <step.icon className="text-heading-invert size-5 sm:size-10" />
                      </div>

                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-8 sm:h-8 bg-heading border-2 border-gray-300 rounded-full flex justify-center items-center shadow-sm">
                        <span className="text-xs font-degular-medium text-heading-invert">
                          {step.number}
                        </span>
                      </div>

                      {/* Tooltip on Hover */}
                      <div
                        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                      >
                        <div className="bg-heading text-heading-invert text-sm rounded-xl px-4 py-3 w-[150px] sm:w-[300px]">
                          <div className="font-degular-medium tracking-wide mb-2 text-heading-invert">
                            {step.title}
                          </div>
                          <div className="text-text-invert tracking-wide font-degular text-xs mb-2">
                            {step.description}
                          </div>
                          <div className="text-text-invert/90 font-degular tracking-wide text-xs">
                            Optimizations: {step.optimizations.join(", ")}
                          </div>
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connection Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-layer-5"
                viewBox="0 0 500 500"
              >
                {flywheelSteps.map((step, index) => {
                  const nextIndex = (index + 1) % flywheelSteps.length;
                  const radius = 250;

                  const angle1Rad = (step.angle * Math.PI) / 180;
                  const angle2Rad =
                    (flywheelSteps[nextIndex].angle * Math.PI) / 180;

                  const x1 = 250 + Math.sin(angle1Rad) * radius;
                  const y1 = 250 - Math.cos(angle1Rad) * radius;
                  const x2 = 250 + Math.sin(angle2Rad) * radius;
                  const y2 = 250 - Math.cos(angle2Rad) * radius;

                  const midAngle =
                    (step.angle + flywheelSteps[nextIndex].angle) / 2;
                  const midAngleRad = (midAngle * Math.PI) / 180;
                  const controlRadius = radius + 30;
                  const cx = 250 + Math.sin(midAngleRad) * controlRadius;
                  const cy = 250 - Math.cos(midAngleRad) * controlRadius;

                  return (
                    <path
                      key={`flow-${index}`}
                      d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                      fill="none"
                      stroke={
                        theme === "light"
                          ? "rgba(0, 0, 0, 0.3)"
                          : "rgba(255, 255, 255, 0.15)"
                      }
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                      className="animate-pulse"
                    />
                  );
                })}

                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill={
                        theme === "light"
                          ? "rgba(0, 0, 0, 0.3)"
                          : "rgba(255, 255, 255, 0.15)"
                      }
                    />
                  </marker>
                </defs>
              </svg>

              {/* Orbital Rings */}
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="absolute w-96 h-96 border border-dashed border-gray-300 dark:border-gray-100 rounded-full animate-spin-slow opacity-30"></div>
                <div className="absolute w-[600px] h-[600px] border border-dotted border-gray-300 dark:border-gray-100 rounded-full animate-spin-reverse opacity-20"></div>
              </div>
            </div>
          </motion.div>

          {/* Optimization Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-24">
            {optimizationFeatures.map((feature, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                key={index}
              >
                <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-8 sm:p-12 hover:scale-102 transition-all duration-1000 cursor-pointer">
                  <div className="flex sm:flex-row flex-col items-start space-x-6 sm:gap-0 gap-4">
                    <div className="w-16 h-16 bg-heading rounded-2xl flex justify-center items-center flex-shrink-0">
                      <feature.icon size={28} className="text-heading-invert" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide">
                          {feature.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-degular tracking-wide bg-gray-100 dark:bg-[#222222] text-heading`}
                        >
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-sm sm:text-[16px] text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide">
                          {feature.impact}
                        </div>
                        <div className="text-sm sm:text-[16px] text-text/80 leading-relaxed mt-1 font-degular tracking-wide">
                          Performance Impact
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-24">
            {flywheelSteps.map((step, index) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                key={index}
              >
                <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-8 sm:p-12 hover:scale-102 transition-all duration-1000 cursor-pointer">
                  <div className="flex sm:flex-row flex-col items-start space-x-6 sm:gap-0 gap-4">
                    <div
                      className={`flex-shrink-0 w-14 h-14 bg-heading rounded-full flex justify-center items-center shadow-lg`}
                    >
                      <step.icon size={20} className="text-heading-invert" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-sm font-degular tracking-wide bg-gray-100 dark:bg-[#222222] text-heading">
                          Step {step.number}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-[16px] text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
                        {step.description}
                      </p>
                      <div className="space-y-2 mt-auto">
                        <div className="text-lg font-degular-medium text-heading tracking-wide mb-2">
                          Key Optimizations:
                        </div>
                        {step.optimizations.map((opt, optIndex) => (
                          <div
                            key={optIndex}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle size={14} className="text-heading" />
                            <span className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
                              {opt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-10 sm:p-16 hover:scale-102 transition-all duration-1000 cursor-pointe">
              <div className="text-center mb-16 centered-content">
                <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center ">
                  Optimized Performance
                </h3>
                <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
                  Real-time metrics showing flywheel acceleration through
                  optimization
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  { value: "15.7x", label: "Throughput Increase", suffix: "" },
                  { value: "2,847", label: "Active Jobs", suffix: "" },
                  { value: "99.9", label: "Validation Accuracy", suffix: "%" },
                  {
                    value: "0.3",
                    label: "Average Settlement Time",
                    suffix: "s",
                  },
                ].map((metric, index) => (
                  <div key={index} className="text-center relative">
                    <div className="text-[24px] sm:text-4xl text-heading max-w-4xl mx-auto leading-relaxed font-degular-medium tracking-wide">
                      <span>{metric.value}</span>
                      {metric.suffix}
                    </div>
                    <div className="text-text text-[16px] font-degular tracking-wide">
                      {metric.label}
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

export default OptimizedFlywheel;
