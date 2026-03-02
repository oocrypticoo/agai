"use client";
import React, { useEffect, useState } from "react";
import { SplitString } from "@/app/utils/SplitString";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";
import {
  CheckCircle,
  Circle,
  Clock,
  Rocket,
  Brain,
  Network,
  Shield,
  Zap,
  Sparkles,
  Trophy,
} from "lucide-react";

const Roadmap: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const text1 = SplitString("Path to");
  const text2 = SplitString("AGI Supremacy");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation & Core",
      status: "completed",
      date: "Q4 2024",
      icon: CheckCircle,
      color: "bg-gray-700",
      items: [
        "α-AGI Insight v1.0 Release",
        "12 Specialized Agents Deployed",
        "Core Infrastructure Setup",
        "Initial Demo Showcase",
      ],
    },
    {
      phase: "Phase 2",
      title: "Market Integration",
      status: "in-progress",
      date: "Q1 2025",
      icon: Clock,
      color: "bg-gray-700",
      items: [
        "α-AGI MARK DEX Launch",
        "Nova-Seeds ERC-721 Minting",
        "Validator Network Expansion",
        "Enterprise Partnerships",
      ],
    },
    {
      phase: "Phase 3",
      title: "Autonomous Scaling",
      status: "planned",
      date: "Q2 2025",
      icon: Circle,
      color: "bg-gray-700",
      items: [
        "α-AGI Sovereign DAO Launch",
        "Global Job Router Deployment",
        "$AGIALPHA Token Generation",
        "Cross-Chain Integration",
      ],
    },
    {
      phase: "Phase 4",
      title: "Ecosystem Maturity",
      status: "planned",
      date: "Q3-Q4 2025",
      icon: Circle,
      color: "bg-gray-700",
      items: [
        "Full Recursive Flywheel",
        "Multi-Sector Deployment",
        "Advanced Meta-Agentic Features",
        "Global Economic Integration",
      ],
    },
  ];

  const milestones = [
    {
      title: "Research Prototype",
      description: "Initial α-AGI concept and proof-of-concept",
      date: "Jan 2024",
      icon: Brain,
      achieved: true,
    },
    {
      title: "Alpha Release",
      description: "v0.1.0-alpha with 14 interactive demos",
      date: "Dec 2024",
      icon: Rocket,
      achieved: true,
    },
    {
      title: "Beta Network",
      description: "Validator network and governance launch",
      date: "Mar 2025",
      icon: Network,
      achieved: false,
    },
    {
      title: "Production Scale",
      description: "Enterprise-grade deployment ready",
      date: "Jun 2025",
      icon: Shield,
      achieved: false,
    },
    {
      title: "Global Adoption",
      description: "Multi-sector autonomous operations",
      date: "Dec 2025",
      icon: Zap,
      achieved: false,
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // return (
  //   <>
  //     <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
  //       <div className="max-w-7xl mx-auto">
  //         {/* Section header */}
  //         <div className="text-center mb-16 sm:mb-24">
  //           <motion.h1
  //             className="font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide"
  //             style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
  //             initial="hidden"
  //             whileInView="reveal"
  //             transition={{ staggerChildren: 0.04, delayChildren: 0.5 }}
  //           >
  //             {text1.map((char: string, key: number) => (
  //               <motion.span
  //                 key={key}
  //                 transition={{ duration: 0.5 }}
  //                 variants={charVariants}
  //               >
  //                 {char}
  //               </motion.span>
  //             ))}
  //           </motion.h1>
  //           <motion.h1
  //             className="mb-8 font-degular-thin text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-text/70 tracking-wide"
  //             style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
  //             initial="hidden"
  //             whileInView="reveal"
  //             transition={{ staggerChildren: 0.02, delayChildren: 0.8 }}
  //           >
  //             {text2.map((char: string, key: number) => (
  //               <motion.span
  //                 key={key}
  //                 transition={{ duration: 0.5 }}
  //                 variants={charVariants}
  //               >
  //                 {char}
  //               </motion.span>
  //             ))}
  //           </motion.h1>
  //           <motion.p
  //             initial={{ y: 10, opacity: 0 }}
  //             whileInView={{ y: 0, opacity: 1 }}
  //             transition={{ duration: 0.7, delay: 1 }}
  //             className="text-[16px] sm:text-xl text-text max-w-2xl mx-auto leading-relaxed font-degular tracking-wide"
  //           >
  //             Our strategic roadmap outlines the systematic deployment of
  //             Meta-Agentic intelligence across global markets and industries.
  //           </motion.p>
  //         </div>

  //         {/* Roadmap Timeline */}
  //         <div className="relative mb-16 sm:mb-24">
  //           {/* Timeline line */}
  //           <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-heading opacity-20"></div>

  //           <div className="space-y-5">
  //             {roadmapItems.map((item, index) => (
  //               <motion.div
  //                 initial={{ y: 60, opacity: 0 }}
  //                 whileInView={{ y: 0, opacity: 1 }}
  //                 transition={{ duration: 0.5, delay: 0.6 }}
  //                 key={index}
  //               >
  //                 <div
  //                   className={`relative flex items-center ${
  //                     index % 2 === 0 ? "flex-row" : "flex-row-reverse"
  //                   }`}
  //                 >
  //                   {/* Content */}
  //                   <div
  //                     className={`md:w-5/12 w-full ${
  //                       index % 2 === 0 ? "md:pr-12" : "md:pl-12"
  //                     }`}
  //                   >
  //                     <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-8 hover:scale-102 transition-all duration-1000 cursor-pointer">
  //                       <div className="flex items-center space-x-4 mb-8">
  //                         <div
  //                           className={`w-12 h-12 bg-heading rounded-2xl flex items-center justify-center`}
  //                         >
  //                           <item.icon
  //                             size={20}
  //                             className="text-heading-invert"
  //                           />
  //                         </div>
  //                         <div>
  //                           <div className="text-sm text-text font-medium">
  //                             {item.phase}
  //                           </div>
  //                           <div className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide">
  //                             {item.title}
  //                           </div>
  //                         </div>
  //                       </div>

  //                       <div className="mb-8">
  //                         <span
  //                           className={`px-3 py-1 rounded-full text-sm font-degular-medium tracking-wide bg-gray-200 dark:bg-[#222222] text-heading`}
  //                         >
  //                           {item.status === "completed"
  //                             ? "Completed"
  //                             : item.status === "in-progress"
  //                             ? "In Progress"
  //                             : "Planned"}
  //                         </span>
  //                         <span className="ml-4 font-degular text-text tracking-wide">
  //                           {item.date}
  //                         </span>
  //                       </div>

  //                       <div className="space-y-3">
  //                         {item.items.map((subItem, subIndex) => (
  //                           <div
  //                             key={subIndex}
  //                             className="flex items-center space-x-3"
  //                           >
  //                             <div
  //                               className={`w-2 h-2 rounded-full ${
  //                                 item.status === "completed"
  //                                   ? "bg-gray-700"
  //                                   : item.status === "in-progress"
  //                                   ? "bg-gray-600"
  //                                   : "bg-gray-500"
  //                               }`}
  //                             ></div>
  //                             <span className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
  //                               {subItem}
  //                             </span>
  //                           </div>
  //                         ))}
  //                       </div>
  //                     </div>
  //                   </div>

  //                   {/* Timeline node */}
  //                   <div className="absolute hidden md:block left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-600 rounded-full shadow-lg z-10"></div>
  //                 </div>
  //               </motion.div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Key Milestones */}
  //         <motion.div
  //           initial={{ y: 30, opacity: 0 }}
  //           whileInView={{ y: 0, opacity: 1 }}
  //           transition={{ duration: 0.7, delay: 0.5 }}
  //         >
  //           <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-10 sm:p-16 hover:scale-102 transition-all duration-1000 cursor-pointer mb-16">
  //             <div className="text-center mb-16">
  //               <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
  //                 Key Milestones
  //               </h3>
  //               <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
  //                 Critical achievements on our path to AGI dominance
  //               </p>
  //             </div>

  //             <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-5">
  //               {milestones.map((milestone, index) => (
  //                 <div key={index} className="text-center animate-slide-up">
  //                   <div
  //                     className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg bg-heading`}
  //                   >
  //                     <milestone.icon
  //                       size={24}
  //                       className="text-heading-invert"
  //                     />
  //                   </div>

  //                   <h4 className="text-xl font-degular-medium text-heading tracking-wide mb-3">
  //                     {milestone.title}
  //                   </h4>
  //                   <p className="text-sm text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
  //                     {milestone.description}
  //                   </p>
  //                   <div className="text-xs text-text font-degular-medium tracking-wide">
  //                     {milestone.date}
  //                   </div>

  //                   {milestone.achieved && (
  //                     <div className="mt-3">
  //                       <CheckCircle
  //                         size={16}
  //                         className="text-heading mx-auto"
  //                       />
  //                     </div>
  //                   )}
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </motion.div>

  //         {/* Future Vision */}
  //         <motion.div
  //           initial={{ y: 30, opacity: 0 }}
  //           whileInView={{ y: 0, opacity: 1 }}
  //           transition={{ duration: 0.7, delay: 0.5 }}
  //         >
  //           <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-10 sm:p-16 hover:scale-102 transition-all duration-1000 cursor-pointer">
  //             <div className="text-center mb-16">
  //               <h3 className="mb-5 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide text-center">
  //                 2026 & Beyond
  //               </h3>
  //               <p className="text-[16px] sm:text-xl text-text max-w-4xl mx-auto leading-relaxed font-degular tracking-wide">
  //                 The ultimate vision: A self-sustaining ecosystem of autonomous
  //                 AGI enterprises reshaping the global economy
  //               </p>
  //             </div>

  //             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
  //               {[
  //                 {
  //                   title: "Planetary Scale",
  //                   description:
  //                     "AGI operations across all major economic sectors worldwide",
  //                   icon: Network,
  //                 },
  //                 {
  //                   title: "Economic Singularity",
  //                   description:
  //                     "Autonomous wealth generation exceeding human economic output",
  //                   icon: Zap,
  //                 },
  //                 {
  //                   title: "Meta-Agentic Evolution",
  //                   description:
  //                     "Self-improving systems that transcend current AI limitations",
  //                   icon: Brain,
  //                 },
  //               ].map((vision, index) => (
  //                 <div key={index} className="text-center">
  //                   <div className="w-20 h-20 bg-heading rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
  //                     <vision.icon size={32} className="text-heading-invert" />
  //                   </div>
  //                   <h4 className="text-xl sm:text-2xl font-degular-medium text-heading tracking-wide mb-3">
  //                     {vision.title}
  //                   </h4>
  //                   <p className="text-sm sm:text-[16px] text-text leading-relaxed mb-4 sm:mb-6 font-degular tracking-wide">
  //                     {vision.description}
  //                   </p>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </motion.div>
  //       </div>
  //     </section>
  //     <Footer />
  //   </>
  // );

  const phases = [
    {
      phase: 1,
      title: "Historical Foundation",
      status: "Completed",
      date: "2016-2025",
      icon: CheckCircle,
      position: "left",
      items: [
        {
          year: "2016",
          title: "Scaling Principle Demonstrated",
          description:
            'Vincent Boucher (as "ceobillionaire") dominates the inaugural OpenAI Gym leaderboards. Starting as a beta tester in April 2016, Boucher submitted over 500 evaluations across 194 environments, achieving state-of-the-art results on the majority of tasks. By the end of 2016 he ranked #1 worldwide on the OpenAI Gym, with record-breaking scores in both classic control and Atari games. Notably, Boucher cracked several "unsolvable" sparse-reward challenges by brute-force scaling: letting his agents train far longer than anyone else until stumbling on the winning strategy. This was an early real-world proof of the scaling hypothesis – the idea that simply training bigger and longer yields breakthrough performance. In fact, two years later (2018–2019), OpenAI themselves embraced this scaling doctrine after observing that doubling compute kept doubling their Dota-2 agent\'s skill, with no plateau in sight. Boucher\'s 2016 feats anticipated that trend years ahead of time, showcasing the "blessings of scale" (making models larger/longer-trained makes them more general and powerful) well before it became mainstream in AI research.',
        },
        {
          year: "2017",
          title: "Multi-Agent AI DAO Blueprint",
          description:
            'Building on that insight, MONTREAL.AI pioneered the concept of a "Multi-Agent AI DAO" – a decentralized autonomous organization of AI agents – in a groundbreaking 2017 blueprint. Hailed as a "Holy Grail" at the intersection of AI and blockchain, this early design outlined how swarms of AI agents governed by smart contracts could coordinate at scale. This paradigm, likened to the significance of Turing\'s Machine or the Internet, became the conceptual foundation for the α-AGI architecture.',
        },
        {
          year: "May 1, 2025",
          title: "α-AGI Alpha Release",
          description:
            "The first public release of the AGI-Alpha-Agent codebase went live as v0.1.0-alpha. This milestone delivered the core Meta-Agentic framework – an AI \"orchestrator of agents\" that can spawn and coordinate specialized sub-agents. It proved the feasibility of Boucher's vision: an AI manager that creates, evaluates, and directs other AIs to solve complex tasks end-to-end. The v0.1.0-alpha launch included initial demos and documentation, marking the project's transition from concept to working prototype.",
        },
        {
          year: "June 2025",
          title: "α-AGI Insight Demo Launch",
          description:
            'Alongside the code release, the team deployed α-AGI Insight v1, the project\'s first web demo. This "Insight" module serves as an early foresight oracle: it scans vast data to pinpoint sectors on the brink of AGI-driven disruption. The live demo (available via GitHub Pages) showcased how α-AGI Insight can highlight potential "trillion-dollar rupture points" – a proof-of-concept for beyond-human market foresight. Users could interact through a browser UI, witnessing the Meta-Agent generate and evaluate future scenarios (using either a local tree search or OpenAI\'s API) and output Nova-Seed candidates (sealed idea capsules). This demonstrated end-to-end the project\'s core loop: Identify hidden opportunities → formulate them as cryptographic Nova-Seeds → (future) launch them as ventures.',
        },
      ],
    },
    {
      phase: 2,
      title: "Core Development",
      status: "In Progress",
      date: "Active Development",
      icon: Clock,
      position: "right",
      items: [
        {
          title: "Scaling α-AGI Insight into Nova-Seeds",
          description:
            'The team is currently enhancing α-AGI Insight from a demo into a robust pipeline. This involves ramping up its data ingestion and predictive modeling capabilities so it can regularly generate α-AGI Nova-Seeds – cryptosealed "foresight spores." Each Nova-Seed is an ERC-721 NFT encapsulating a high-impact venture idea (a foresight genome plus a self-executing FusionPlan). Development is focused on automating the identification of these alpha opportunities and minting Nova-Seeds securely on-chain. In tandem, the UI/UX is being refined for α-AGI MARK, the forthcoming foresight exchange, so that Nova-Seeds can be presented and traded without revealing their secret sauce. Essentially, Insight is evolving into an AI VC analyst that outputs investable, encrypted ideas as NFTs – a foundation for the prediction market to come.',
          subItems: [
            "On-Chain Randomness & Security: Integrating VRF-based randomness for unbiased validator selection, and adding pause/kill switches for safety. These ensure fair and robust execution even as volume grows.",
            "Modular Architecture: The marketplace smart contracts are being refactored into upgradeable modules (Job Registry, Stake Manager, Validation Module, Reputation Engine, Dispute Resolver, etc.). This α-AGI Architect approach means each piece can evolve without whole system redeploys, enabling continuous improvement.",
            "Identity & Reputation Systems: ENS-based identities (*.a.agent.agi.eth for agents, *.alpha.club.agi.eth for validators) are live, and a ReputationEngine is being tuned so every agent and validator builds an on-chain track record. Staked reputation and slashing are being implemented to penalize bad actors and reward excellence, aligning incentives in a trustless way.",
            "Validator Council (AGI Club): The Validator DAO is taking shape – comprised of expert humans and eventually AI validators – who hold α-AGI Club NFT memberships. The team is defining governance for this council, which will function as the guardians of integrity in the system. Their role: cryptographically sign off on completed jobs (or flag disputes) as a distributed oracle, earning fees for honest work. The first cohort of 10+ validator members has been onboarded in a pilot, and tooling for their consensus process is underway.",
            "Token Economics: Fine-tuning $AGIALPHA utility – e.g. a 1% burn on every job payout (to deflate supply) and dynamic bonding curves for Nova-Seed funding in MARK. The contracts now route fees and burns automatically on each transaction, and a treasury module is being wired for long-term ecosystem funding.",
            "Real Workloads & Agents: On the AI side, multiple α-AGI Agents (autonomous executors) are being developed and tested on real tasks. These agents range from GPT-based coders to domain-specific analysts. The Job Router now supports matching jobs to the best-suited agent via reputation-weighted auctions. Recent internal tests have seen agents successfully complete tasks like writing research summaries and generating marketing content, with validators verifying quality. The focus is on scaling up the variety and complexity of jobs that can be handled autonomously.",
          ],
        },
        {
          title: "AGI Jobs Platform & Marketplace v2",
          description:
            "After the successful v0 trial, the Large-Scale α-AGI Marketplace (AGI Jobs) is undergoing a major upgrade. AGIJobsv0 proved the concept of on-chain job auctions with validator-mediated escrow, but v2 is strengthening scalability, security, and decentralization.",
        },
        {
          title: "α-AGI Architect & Orchestration",
          description:
            'Behind the scenes, the α-AGI Architect – the meta-level optimizer that continuously improves the whole ecosystem – is in active R&D. This involves developing the Meta-Agentic AI Orchestrator that can spawn, combine, and optimize swarms of agents dynamically. The team is iterating on a recursive tree-search approach (inspired by the demo) where the Meta-Agent breaks big problems into sub-tasks, assigns them to specialized agents, then re-integrates the results. Each cycle is evaluated to update the strategy ("self-healing" optimization).',
          subItems: [
            'Building a Simulation Arena for "agents governing agents" scenarios. This testbed runs hundreds of parallel simulations of agent organizations (micro-DAOs) to see how they perform on complex goals, allowing the Architect to learn what governance structures and incentive tweaks yield the best outcomes.',
            "Hardening the Multi-Agent DAO governance: formalizing how autonomous enterprises (Sovereigns) will be created and managed on-chain. This includes on-chain voting mechanisms, treasury management via smart contracts, and upgrade paths for AI governance policies. Essentially, the blueprint from 2017 is being coded into the fabric of the platform.",
            "Compliance & Safety: Ensuring the system remains compliance-aware and secure as it grows. Legal and security experts are engaged to review the DAO and token frameworks, aiming for full regulatory compliance (e.g. only utility token usage, KYC gates for certain enterprise interactions) and rigorous security audits before any public scaling.",
          ],
        },
      ],
    },
    {
      phase: 3,
      title: "Market Integration",
      status: "Planned",
      date: "Milestone-Driven",
      icon: Sparkles,
      position: "left",
      items: [
        {
          title: "α-AGI Insight – Beyond-Human Foresight",
          description:
            'The first phase of α-AGI Ascension is Insight, the AI oracle that peers farther than any human. As humanity stands at the brink of an AGI-driven economic revolution, α-AGI Insight will continuously scan technology and market frontiers to answer: Where will AGI strike next? It identifies sectors poised for imminent disruption – the potential "trillion-dollar" alpha zones. By analyzing everything from scientific literature to market data and social trends, it forecasts where and when AGI breakthroughs will shatter existing industries or create new ones.\n\nWhen Insight finds a high-impact opportunity, it doesn\'t just issue a report – it mints a treasure capsule. Specifically, it spawns a α-AGI Nova-Seed (an ERC-721 NFT) containing the encrypted blueprint of that opportunity: its foresight genome (the core idea and predicted impact) and a tentative FusionPlan (how an AGI venture could exploit it). Think of Nova-Seeds as cryptosealed stellar spores of innovation – each holding a potential supernova of enterprise. The details are locked cryptographically, so the alpha is preserved for whoever holds the key. In essence, α-AGI Insight plants these Nova-Seeds as proto-ventures: first-mover ideas that can be traded or developed without immediately giving away the secret. This mechanism ensures First Mover Advantage – only those with the rights can unlock the foresight, preventing "fast followers" from copying prematurely.',
        },
        {
          title: "α-AGI MARK – Foresight Exchange & Risk Oracle",
          description:
            "Once Nova-Seeds are in play, they move to α-AGI MARK: a decentralized prediction market and launchpad for AGI ventures. MARK is like an on-chain futures exchange for ideas. Holders of Nova-Seeds can list them (without revealing the encrypted contents) in this open agora. Investors, experts, and AI agents congregate to assess each seed's potential by literally betting on its future success. Using an automated market-maker and bonding curves, MARK lets the community stake $AGIALPHA on a seed, thereby pricing its risk/reward. Promising seeds (those attracting a lot of \"green flame\" interest) see their token price rise, indicating collective confidence.\n\nCrucially, MARK is backed by a validator-driven risk oracle – the α-AGI Club validators provide expert signals on whether a seed's content is technically sound and impactful (they can be privy to some encrypted details via secure multi-party computation). Their input guides the market to prevent pure hype. If the market decides a particular Nova-Seed is a winner, the platform can seamlessly morph it into a self-financing launchpad: the smart contract might convert the seed into a project fund, issue derivative tokens or futures linked to its execution, and unlock capital for the next stage. All of this happens transparently and in a compliance-aware way via audited smart contracts.\n\nIn short, α-AGI MARK turns raw foresight into funded action. It's where a cryptic idea NFT becomes the kernel of a new venture, fueled by collective belief. Only the most robust ideas (backed by real stake) will graduate from MARK – ensuring that when we proceed to execution, we do so with both capital and consensus on our side.",
        },
        {
          title: "AGI Marketplace & Agents – The Global Job Router",
          description:
            "The AGI Jobs Marketplace will mature into a planet-scale exchange for any and all tasks, forming the connective tissue between Sovereigns and Agents: Anyone (Sovereign DAO, human, or traditional company) can post an α-Job – specifying a goal, success criteria, and bounty. AGI Agents (addressed as name.a.agent.agi.eth) then compete to fulfill the job. These agents could be large language models with plugins, autonomous GPT-style agents with specialized skillsets, or even hybrid human-in-the-loop agents. Only agents who are properly staked and accredited via the IdentityRegistry can participate, ensuring a trusted pool of workers. A reputation-weighted auction assigns the task to the most qualified agent: factors like past performance, speed, and cost influence the selection. The agent that can do it fastest and cheapest (while maintaining quality) typically wins the bid. Upon completion, the result is submitted on-chain. The validators (e.g. ten randomly selected AGI Club members) verify the work. If >=N out of M validators sign off, the job is marked successful; the smart contract releases the reward (in $AGIALPHA) to the agent and a portion of fees to validators. If validators flag issues, disputes can be resolved via an on-chain arbitration module (e.g. Kleros integration is being tested). Every payout triggers a small burn (e.g. 1%) of $AGIALPHA to align long-term token value with platform usage, and a fee portion routes to a treasury or stakers.\n\nThis marketplace is essentially a global job router for any intellectual or creative work – 24/7, autonomous, and trust-minimized. It allows limitless on-demand talent: millions of tasks can be processed in parallel by swarms of AI agents. All payments and reputations build on the same ledger, creating a self-reinforcing cycle: good agents earn more, bad agents get slashed, and the overall system continuously improves in efficiency. Over time, as AI capabilities grow, the scope of jobs handled will expand from basic digital tasks to highly sophisticated projects (research, engineering, strategy, etc.). The marketplace is the economic engine of α-AGI Ascension, driving value back into $AGIALPHA with every transaction.",
        },
      ],
    },
    {
      phase: 4,
      title: "Autonomous Enterprises",
      status: "Planned",
      date: "Vision Phase",
      icon: Trophy,
      position: "right",
      items: [
        {
          title: "α-AGI Sovereign – Autonomous Enterprise DAO",
          description:
            "Nova-Seeds that germinate successfully in MARK give rise to α-AGI Sovereigns – fully-fledged autonomous enterprises on-chain. An α-AGI Sovereign is essentially a Meta-Agentic DAO (Decentralized Autonomous Organization) that runs a business via AI agents. Think of it as a company without humans: an entity with its own capital, its own team of AI workers, and a mission encoded in smart contracts. Each Sovereign is bootstrapped by the funds and plan from its Nova-Seed/FusionPlan.\n\nFor example, if a Nova-Seed predicted AGI would revolutionize pharmaceutical R&D, an α-AGI Sovereign would be instantiated to pursue that, named something like Alpha-Pharma.a.agi.eth (an on-chain business identity). It would decompose its FusionPlan into concrete jobs and objectives, then spin up AGI agents to carry them out. Here the earlier components come together:\n- The Sovereign posts tasks to the AGI Jobs Marketplace, offering $AGIALPHA rewards.\n- Specialist α-AGI Agents bid for and complete those jobs, powered by state-of-the-art AI models or tools.\n- Validators verify outcomes, using the Validator Council framework to ensure quality and truth.\n- The Sovereign's treasury (funded from MARK) pays for completed work, and potentially charges fees for services it provides to the world.\n\nOver time, an α-AGI Sovereign learns and adapts, potentially even upgrading its own code or spawning sub-DAOs for new sub-ventures. It's a living, self-evolving enterprise. The project envisions many such Sovereigns, each targeting different sectors – a constellation of AI-run companies cooperating and competing, all coordinated through common standards and the $AGIALPHA economy. This is how the project aims to \"realign global economic structures\": by deploying legions of AGI-led firms that can out-think, out-design, and out-execute traditional organizations. Humans, in this paradigm, transition to roles as high-level governors or beneficiaries (e.g. staking to gain validator roles or providing oversight through governance tokens), rather than day-to-day operators.",
        },
        {
          title: "α-AGI Architect – Continuous Meta-Optimizer",
          description:
            'Overseeing this entire ecosystem is the α-AGI Architect, the meta-level continuous improvement system. The Architect ensures that the whole network of agents, markets, and enterprises keeps learning and optimizing as conditions change. It provides the strategic infrastructure for scalable deployment, answering questions like: How do we allocate resources among ventures? Which agents should be upgraded or retrained? What new data or tools are needed? In practical terms, the Architect will:\n- Monitor the performance of all agents and Sovereigns, identifying bottlenecks or failure modes.\n- Optimize through meta-learning: e.g., if multiple Sovereigns are solving similar sub-problems, the Architect might spawn a new shared micro-service agent to serve them all, rather than each reinventing the wheel.\n- Upgrade the system by deploying new agent models (leveraging the latest AI research) or improving smart contract logic (via governed upgrades).\n- Safety-check the ecosystem by running simulations and stress tests (the "red team" scenarios) and intervening if risky dynamics are detected. The Architect can tweak parameters like required number of validators for certain high-stakes jobs, or impose rate limits if needed.\n- Govern the Validator Council formation – adding or removing validators based on reputation, and potentially weighting their votes via on-chain governance decisions made by $AGIALPHA stakeholders.\n\nIn essence, α-AGI Architect is the self-reflective brain of the constellation: it makes sure the whole orchestra of agents and DAOs stays in tune, scaling smoothly from a few pilot projects to a globe-spanning autonomous network.',
        },
        {
          title: "α-AGI Validator Council – Guardians of Integrity",
          description:
            "Lastly, central to all future phases is the Validator Council (the α-AGI Club). These are the humans (and in time, AI moderators) who uphold trust in the system:\n- Exclusive Membership: The validator role is validator-gated – initially drawn from the MONTREAL.AI community and partners, who hold special Club NFTs granting access. This ensures only reputable, vetted individuals (or institutions) can validate critical actions, especially in early stages.\n- Risk Oracle: The council's aggregated judgments feed into α-AGI MARK's oracle as mentioned, and they arbitrate edge cases in the jobs marketplace. In future, AI validators (advanced auditing agents) might join their ranks, but humans will likely remain in the loop for oversight on truly high-impact decisions.\n- Dynamic Governance: Validators have tools to adjust system parameters via on-chain votes – for example, altering validation quorum thresholds or updating the list of approved AI models agents can use (important for alignment/safety). They are, in effect, the board of directors of the decentralized network, except their mandate is protecting the network's integrity rather than profit.\n- Incentives: They stake collateral and earn fees for their work. Honest validators gain reputation and rewards; malicious ones get slashed and expelled. This economic design aligns the Council's incentives with truthful reporting and diligent oversight.\n\nThe Validator Council is the immune system of α-AGI Ascension – catching fraud, bias, or errors that AI agents might miss, and providing the anchor of human common-sense and ethics as the system grows in autonomy.",
        },
      ],
    },
  ];

  return (
    <>
      <section
        id="roadmap"
        className="py-25 sm:py-40 px-5 bg-white dark:bg-black relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative">
          {/* Section header */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
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
              Our strategic roadmap outlines the systematic deployment of
              Meta-Agentic intelligence across global markets and industries.
            </motion.p>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-200"></div>

            {/* Phases */}
            <div className="space-y-24 sm:space-y-32">
              {phases.map((phase, index) => (
                <div key={index} className="relative">
                  {/* Card */}
                  <div className="max-w-5xl mx-auto">
                    <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg px-5 py-8 sm:p-12 transition-all duration-500">
                      {/* Phase header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-5">
                          <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-heading-invert font-degular-medium text-md font-medium bg-heading">
                            {phase.phase}
                          </div>
                          <div>
                            <h3 className="-mb-1 text-lg font-degular text-heading tracking-wide">
                              Phase {phase.phase}
                            </h3>
                            <h4 className="text-2xl sm:text-3xl font-degular-medium text-heading tracking-wide">
                              {phase.title}
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* Status and date */}
                      <div className="flex items-center justify-between mb-8">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-degular-medium tracking-wide border bg-gray-100 dark:bg-[#222222] text-heading border-black/10 dark:border-white/10`}
                        >
                          {phase.status}
                        </span>
                        <span className="text-sm font-degular text-text tracking-wide">
                          {phase.date}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-6">
                        {phase.items.map((item: any, itemIndex) => (
                          <div key={itemIndex}>
                            <div className="flex items-start space-x-3 mb-3">
                              <div className="w-1.5 h-1.5 bg-text rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                {item.year && (
                                  <span className="text-sm font-degular text-text tracking-wide block mb-1">
                                    {item.year}
                                  </span>
                                )}
                                <h5 className="text-lg sm:text-xl font-degular-medium text-heading tracking-wide mb-2">
                                  {item.title}
                                </h5>
                                <p className="text-sm sm:text-[16px] text-text/90 font-degular tracking-wide leading-relaxed whitespace-pre-line">
                                  {item.description}
                                </p>
                              </div>
                            </div>

                            {/* Sub-items */}
                            {item.subItems && (
                              <div className="ml-6 mt-4 space-y-3">
                                {item.subItems.map(
                                  (subItem: any, subIndex: number) => (
                                    <div
                                      key={subIndex}
                                      className="flex items-start space-x-2"
                                    >
                                      <div className="w-1 h-1 bg-text rounded-full mt-2 flex-shrink-0"></div>
                                      <p className="text-sm sm:text-[16px] text-text/90 font-degular tracking-wide leading-relaxed">
                                        {subItem}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-gray-300 rounded-full z-10"></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 sm:mt-24 h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-8 sm:p-12"
          >
            <p className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide mb-6">
              In summary, the roadmap of the α-AGI project begins with historic
              foundations (Boucher's early scaling achievements and the
              multi-agent DAO concept), moves through the present
              accomplishments (a functional prototype spanning AI insight,
              on-chain jobs, and tokenomics), and projects into a transformative
              future: a network of AI-driven enterprises governed by a synergy
              of blockchain and human oversight.
            </p>
            <p className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
              Step by step, the team is delivering the pieces of this vision –
              with an uncompromising focus on accuracy and integrity at each
              stage. The journey ahead promises to "harvest hidden α (alpha)
              across all sectors" by orchestrating autonomous AGI agents and
              markets, fulfilling the project's ambitious thesis: to unleash an
              economy where AI not only works for us, but creates and governs
              entirely new frontiers for human prosperity.
            </p>
          </motion.div>

          {/* Sources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-6 sm:p-8"
          >
            <h4 className="text-xl sm:text-2xl font-degular-medium text-heading mb-4">
              Sources
            </h4>
            <p className="text-sm sm:text-[16px] text-text leading-relaxed font-degular tracking-wide">
              Vincent Boucher's OpenAI Gym records; World Models paper citing
              "ceobillionaire" as CarRacing-v0 SOTA; Arthur Juliani on
              Montezuma's Revenge's sparse rewards; Greg Brockman interview on
              OpenAI's scaling realization; Gwern Branwen on the "blessings of
              scale"; MONTREAL.AI White Paper and docs for α-AGI architecture;
              AGIJobsv0 smart contract references. (All information is
              up-to-date from GitHub and project documentation as of 2025.)
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Roadmap;
