"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";
import { AlertTriangle } from "lucide-react";

const page = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="h-full border border-gray-300 dark:border-white/20 hologram-card morphing-container rounded-3xl shadow-sm hover:shadow-lg p-7 sm:p-16 hover:scale-102 transition-all duration-1000 cursor-pointer">
              <div className="flex sm:flex-row flex-col items-start space-x-6 gap-4 sm:gap-0">
                <div className="w-12 h-12 bg-heading rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={24} className="text-heading-invert" />
                </div>
                <div>
                  <h3 className="mb-7 font-degular-medium text-[40px] leading-[35px] text-heading tracking-wide">
                    Important Disclaimers
                  </h3>
                  <div className="space-y-5 text-[16px] sm:text-xl text-text mx-auto leading-relaxed font-degular tracking-wide">
                    <p className="leading-relaxed">
                      <strong className="text-heading tracking-wider">
                        No Investment Contract:
                      </strong>{" "}
                      $AGIALPHA confers no equity, ownership, or profit-sharing
                      rights whatsoever. It is not a share in any company or
                      DAO, nor a claim on any profits or intellectual property.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-heading tracking-wider">
                        Utility Purpose Only:
                      </strong>{" "}
                      The sole purpose is to be spent within the α-AGI platform
                      for services/products. Token demand is driven by actual
                      usage of the system, not speculation.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-heading tracking-wider">
                        Risk Warning:
                      </strong>{" "}
                      There is no guarantee that $AGIALPHA will hold or increase
                      any particular monetary value. Participation is at one's
                      own risk in the spirit of supporting a cutting-edge
                      research initiative.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
