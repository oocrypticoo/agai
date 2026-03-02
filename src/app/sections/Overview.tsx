import React from "react";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SplitString } from "../utils/SplitString";
import ButtonPrimary from "../components/ButtonPrimary";

const Overview: React.FC = () => {
  const router = useRouter();
  const text1 = SplitString("AGI Alpha");
  const text2 = SplitString("The Overview");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <section className="py-20 sm:py-25 px-[20px] bg-white dark:bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide"
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
          <motion.h1
            className="mb-10 font-degular-thin text-[50px] leading-[45px] sm:text-[60px] sm:leading-[55px] text-text/70 tracking-wide"
            style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.04, delayChildren: 0.4 }}
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
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[18px] md:text-[22px] text-text font-degular leading-tight text-center tracking-wide"
            >
              <span className="text-heading font-semibold">α-AGI</span> is
              building a{" "}
              <span className="text-heading font-semibold">
                Meta-Agentic AGI
              </span>{" "}
              — an AI that creates and commands other AIs to solve problems
              beyond any single system’s reach.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-[18px] md:text-[22px] text-text font-degular leading-tight text-center tracking-wide mt-6"
            >
              Powered by blockchain, DAO governance, and the{" "}
              <span className="text-heading font-semibold">$AGIALPHA</span>{" "}
              utility token, it operates autonomously with minimal human
              oversight.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-[18px] md:text-[22px] text-text font-degular leading-tight text-center tracking-wide mt-6"
            >
              Our vision,{" "}
              <span className="text-heading font-semibold">
                “α-AGI Ascension,”
              </span>{" "}
              aims to unlock an estimated{" "}
              <span className="text-heading font-semibold">
                $15 quadrillion
              </span>{" "}
              in global economic potential.
            </motion.p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="z-10 relative w-full flex flex-col sm:flex-row justify-center items-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ButtonPrimary
              text="Read Full White paper"
              Icon={ArrowRight}
              width={170}
              onClick={() => router.push("/whitepaper")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
