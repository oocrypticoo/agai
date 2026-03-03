"use client";
import React from "react";
import { motion } from "framer-motion";

const DemoBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="max-w-4xl mx-auto mb-10"
    >
      <div className="border border-[#805abe]/30 bg-[#805abe]/5 rounded-xl px-6 py-3 text-center text-text font-degular text-sm sm:text-base">
        Demo mode enabled: writes disabled. Active demo actor:{" "}
        <span className="font-degular-bold text-heading">visitor</span>.
      </div>
    </motion.div>
  );
};

export default DemoBanner;
