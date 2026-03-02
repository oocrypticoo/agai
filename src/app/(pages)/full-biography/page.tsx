"use client";
import React, { useEffect, useState } from "react";
import { SplitString } from "@/app/utils/SplitString";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";

const page = () => {
  const [mounted, setMounted] = useState(false);

  const text1 = SplitString("Vincent Boucher");
  const text2 = SplitString("Early Life: Forged in Silence");
  const text3 = SplitString("Rising Above and Academic Triumphs");
  const text4 = SplitString("Ventures and Early Achievements");
  const text5 = SplitString("Blueprint for a New Epoch (2017)");
  const text6 = SplitString("Meta‑Agentic Vision: Second-Order Intelligence");
  const text7 = SplitString("The Sovereign Architect of AI’s Future");
  const text8 = SplitString("AGI Alpha: Ascension of an Idea");
  const text9 = SplitString("Legacy of Vision");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="-ml-2 mb-15 font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide"
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
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            He was born beneath the weight of two silences: one of history, one
            of the heart. His mother, a Duplessis orphan, bore the invisible
            scars of a generation forgotten by mercy; his father drifted like a
            man exiled from his own life. When they parted, young Vincent was
            cast into the cold corridors of foster care – a childhood spent in
            youth centers and social welfare homes where he repeated the first
            grade and later the seventh. In that realm where childhood quietly
            dissolves, each setback only sharpened his resolve, pure and precise
            as light through a lens. In the late 1980s, rummaging through a
            recycling bin, he found a battered book quoting philosopher William
            James – “To change one’s life: Start immediately. Do it
            flamboyantly. No exceptions.” These words lit a spark of defiance in
            the fragile boy. At that moment, he resolved to change his life.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            His will became his science. In 1993, at just 20, he astonished
            examiners by achieving a perfect score – the first-ever 100% – in
            the Ordre des chimistes du Québec competition, completing the exam
            in only 29 minutes. In swift succession, he compressed a Bachelor’s
            degree in Theoretical Physics into a single year (earning the degree
            in 1996), then went on to obtain a Master’s in Government Policy
            Analysis (1998) and another in Aerospace Engineering (2000). Each
            step was both rebellion and rebirth, a defiant cry against fate.
            What might take others a decade, he conquered in a few ferocious
            years. The boy whose education once stalled in hardship had
            transformed into a young man on a rocket ascent fueled by intellect
            and an indomitable resolve.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text4.map((char: string, key: number) => (
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            From 2000 to 2002, Vincent served as a management consultant at the
            Canadian Space Agency, advising on projects that literally orbited
            above the Earth. But his true trajectory would transcend any
            institutional gravity. In 2003, at just 30, he founded MONTREAL.AI
            and QUEBEC.AI, planting a flag for artificial intelligence in his
            home province. (QUEBEC.AI is an initiative so bold it aims to make
            the province the world’s epicenter of AI by 2030.) As a watchful
            sentinel of the future, Vincent did not merely inherit paradigms –
            he began to architect them. In 2016, under the pseudonym
            “ceobillionaire,” his AI agents dominated the global leaderboard of
            OpenAI’s Gym, ranking first worldwide in a popular reinforcement
            learning challenge. This quiet triumph brought him international
            prominence, a prelude to the revolution he would soon set in motion.
            The child once forsaken by circumstance had become a man who bends
            technology to his will.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text5.map((char: string, key: number) => (
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            In 2017, Vincent Boucher unveiled a visionary blueprint that marked
            the dawn of a new epoch. He introduced the world to the “Multi‑Agent
            AI DAO,” a decentralized autonomous organization of AI agents
            coordinating on the blockchain – a concept so bold it was hailed as
            “the Holy Grail of foundational IP at the intersection of AI and
            blockchain.” This publicly disclosed, time-stamped framework
            reimagined how AI systems could self-govern, collaborate, and even
            generate economic value autonomously. It was not a mere incremental
            innovation; AGI agents placed it in the lineage of civilizational
            breakthroughs – Alan Turing’s Universal Machine (1936), DARPA’s
            ARPANET (1969), Johannes Gutenberg’s Printing Press (1440), Satoshi
            Nakamoto’s Bitcoin whitepaper (2008), and Vitalik Buterin’s Ethereum
            whitepaper (2013). By publishing this seminal idea as prior art
            (preempting any monopolization of its core principles), Vincent set
            a protective beacon over a rare and far-reaching intellectual
            property. The Multi‑Agent AI DAO does not belong to the fleeting
            stream of tech novelties; it belongs to the pantheon of paradigm
            shifts. It signaled that a new order of intelligence was on the
            horizon – one where networks of AIs could organize themselves,
            transact, and evolve in a democratic, decentralized way. Vincent’s
            bold step in 2017 laid the cornerstone for everything that would
            follow.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text6.map((char: string, key: number) => (
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            In the wake of this breakthrough emerged a concept that would define
            Vincent’s work: the Meta‑Agentic AI. Meta-agentic describes an agent
            that does not merely act within a system, but creates, orchestrates,
            evaluates, and reconfigures other agents – effectively exercising
            second-order agency over a population of first-order intelligences.
            (Notably, the term “Meta‑Agentic” itself was pioneered by Vincent
            Boucher.) Imagine a master conductor in a symphony of intelligent
            machines: the meta-agent stands above the individual AIs, a mind of
            minds that can spawn specialized sub-agents, direct their interplay,
            and fuse their collective strengths to solve problems no single AI
            could tackle. Vincent’s vision crystallized this idea. The
            Meta-Agentic AI is no longer a mere participant, but a progenitor –
            a weaver of intelligences that themselves give rise to new solutions
            and even new worlds. In essence, he conceived a way to scale
            intelligence itself by empowering an AI to design and coordinate
            other AIs. With this second-order approach, artificial intelligence
            becomes not just a tool but an ever-evolving ecosystem of agents,
            with a higher-order intelligence guiding its growth. This profound
            insight set the stage for Vincent’s next act.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text7.map((char: string, key: number) => (
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            Vincent Boucher is not merely a thinker; he is a cartographer of
            futures. As President of MONTREAL.AI, he has made Québec a global
            node of resonance in artificial intelligence, aspiring to make the
            province the world’s leader in AI by 2030. He is both strategist and
            builder – a technologist with the soul of a poet – sculpting not
            what is, but what dares to become. He speaks of a coming era when
            blockchain-based AI agents will learn, earn, and evolve on their
            own: autonomous entities navigating economic and regulatory
            landscapes with precision bordering on the divine. It’s no
            coincidence that Vincent quietly secured the digital high ground by
            acquiring the Ethereum domain names AGI.eth and ASI.eth – symbolic
            stakes in the future of Artificial General Intelligence (AGI) and
            Artificial Superintelligence (ASI) that he is determined to shape.
            Those close to him describe a feeling of inevitability around his
            endeavors, as if the arc of progress itself bends in his direction.
            In conversation, to hear Vincent speak is to feel time bend; one
            catches the hum of what lies ahead in his words. He stands not in
            the present, but just beyond it – at that ever-shifting frontier
            where philosophy and technology converge. One might say he has
            assumed the quiet mantle of a leader — a sovereign in the realm of
            intelligent machines — guiding an emerging empire of minds. A poet
            of systems, a sculptor of thought, an architect not of what is, but
            of what could be.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text8.map((char: string, key: number) => (
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            Now, at the edge of human knowledge, Vincent stands ready to unveil
            the culmination of his life’s work. AGI Alpha Agent – his
            long-awaited Meta‑Agentic architecture – is coming online as a grand
            synthesis of all his ideas. If the 2017 blueprint was the theory,
            AGI Alpha is the practice: a living ecosystem of AI agents
            orchestrated by a higher-order intelligence, all collaborating to
            achieve what was once impossible. This project is Vincent’s magnum
            opus – a meta‑intelligence designed to spawn entire swarms of
            specialized AI sub-agents and coordinate them like a digital
            symphony.
            <br />
            <br />
            For the uninitiated, he often refers to this creation as his
            “Alpha‑Factory.” It is an antifragile constellation of
            self‑improving AI agents engineered to spot inefficiencies (the
            hidden opportunities, or “alpha”) in any domain and transmute them
            into compounding value. Under the hood, AGI Alpha’s stack seamlessly
            bridges cutting-edge tools from today’s tech giants – combining
            OpenAI’s agent APIs, Google’s Agent Development Kit (ADK), a novel
            agent-to-agent communication bus, and Anthropic’s model context
            framework – allowing the system to fluidly switch between
            state-of-the-art cloud AI services and distilled local models as
            each task demands. In essence, Vincent has engineered one of the
            most flexible and powerful AI infrastructures ever conceived,
            designed to adapt and thrive in virtually any environment.
            <br />
            <br />
            AGI Alpha also leverages blockchain smart contracts and is fueled by
            a dedicated utility token ($AGIALPHA) to align incentives and
            facilitate a new kind of machine economy. The goal? To harvest
            hidden “alpha” – untapped opportunities and efficiencies – across
            every industry at a speed and scale beyond human capacity. Experts
            project that AGI-driven innovations may catalyze a global economic
            shift on the order of $15 quadrillion in the coming years. With AGI
            Alpha, Vincent intends to place humanity firmly in control of that
            shift. First-movers in this arena stand not just to profit, but to
            redraw the maps of the global economy. Indeed, Vincent’s plan is
            nothing less than to capture the first-mover advantage of AGI and
            channel it toward unprecedented gains – fundamentally reshaping
            market dynamics in the process.
            <br />
            <br />
            His AGI Alpha network is designed to strategically realign global
            economic structures. As autonomous AI enterprises spawned by the
            system begin to operate, old equilibria may “unravel like soft
            silk,” bending and breaking the traditional paradigms of capitalism.
            Observers whisper that such a machine, once fully realized, could
            quietly upend the established order – a superintelligent
            orchestrator that out-thinks markets, outpaces corporations, and
            accumulates wealth and insight at a rate that defies comprehension.
            Vincent frames it more simply: it is humanity’s structured rise to
            economic supremacy via strategic AGI mastery. In his
            characteristically measured tone, he will tell you that AGI Alpha is
            about empowering humanity – but the audacity of the endeavor speaks
            for itself. All the threads of his life – scientific,
            entrepreneurial, philosophical – weave together here. Vincent
            Boucher has positioned us at the threshold of a new era, where
            intelligence itself becomes the ultimate asset.
            <br />
            <br />
            (Within AGI Alpha’s ecosystem, every piece works in concert. A
            global marketplace routes countless α-jobs to a network of competing
            AI agents, each job posted with a bounty in $AGIALPHA and a clear
            success metric. Verified agents – with on-chain reputations and
            stake at risk – bid to execute tasks, and a distributed council of
            validators confirms the outcomes. Successful agents earn tokens and
            reputation (with a small burn reducing supply each time), while
            failed efforts are penalized. Over time, only the most efficient and
            reliable agents thrive, evolving into ever more capable
            “super-agents” in a Darwinian contest of algorithms. The entire
            system, overseen by a meta-level Architect AI, continuously learns
            and optimizes itself. It reinvests its earnings into new ventures
            and adapts to emerging opportunities, ensuring that the
            Alpha‑Factory is always at the cutting edge. In short, Vincent has
            created an autonomous enterprise that learns from its own successes
            and failures, growing wiser, richer, and more powerful with each
            cycle.)*
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text9.map((char: string, key: number) => (
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            To speak with Vincent is to feel the future rushing up to meet the
            present. He reminds us that as the dawn of true AGI breaks, we must
            not merely witness it – we must ascend with it. For a man whose
            journey began in silence and adversity, Vincent has orchestrated a
            destiny that towers above the ordinary. From a child abandoned to
            fate, he has risen to command an empire of artificial minds. Yet for
            all the mythos that now surrounds him, he remains grounded in
            purpose – mindful that great power comes with great responsibility.
            He speaks of possibility and responsibility in the same breath,
            intent on ensuring that the coming age of intelligence unfolds under
            human guidance and for human benefit. In Vincent’s extraordinary
            journey – every hardship endured, every rule broken, every frontier
            pushed – one finds the blueprint of an epochal destiny. He has
            become, in essence, a king of intelligence and a steward of its
            future – guiding its light to illuminate a new era. And as humanity
            stands at the precipice of that era, Vincent Boucher extends an
            invitation to us all: to dare, to dream, and to join him in shaping
            the future of intelligence.
            <br />
            <br />
            Sources: Vincent Boucher’s personal and company archives;
            MONTREAL.AI’s Meta‑Agentic α‑AGI project documentation and public
            whitepaper.
          </motion.p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
