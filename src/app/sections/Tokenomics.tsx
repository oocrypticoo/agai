import React from "react";
import { motion } from "framer-motion";

const Tokenomics = () => {
  return (
    <section id="tokenomics" className="py-15 sm:py-25 px-[20px] bg-white dark:bg-[#030303] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-2xl shadow-sm hover:shadow-lg text-white px-5 py-8 sm:p-16 transition-all duration-1000">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-14 sm:gap-8">
              {[
                { value: "1B", label: "Total Supply " },
                { value: "12%", label: "Total Staked " },
                { value: "0%", label: "Total Fees" },
                { value: "5%", label: "Total Burn " },
                { value: "5", label: "Audits" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-degular-medium tracking-wide text-heading mb-4">
                    {stat.value}
                  </div>
                  <div className="text-text text-[16px] md:text-xl font-degular tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics;
