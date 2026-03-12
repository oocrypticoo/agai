"use client";
import { useEffect, useState, useRef } from "react";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { useEnsCounts } from "../hooks/useEnsCounts";
import { motion } from "framer-motion";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http("https://eth.llamarpc.com"),
});

const AGI_JOB_MANAGER = "0xB3AAeb69b630f0299791679c063d68d6687481d1" as const;

function AnimatedNumber({ value }: { value: number | null }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    if (value === null) return;
    const start = prev.current;
    const end = value;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    prev.current = end;
  }, [value]);

  if (value === null) return <span className="opacity-40">--</span>;
  return <>{display}</>;
}

export default function LiveStats() {
  const [jobCount, setJobCount] = useState<number | null>(null);
  const { validators, agents } = useEnsCounts();

  useEffect(() => {
    publicClient
      .readContract({
        address: AGI_JOB_MANAGER,
        abi: [
          {
            type: "function",
            name: "nextJobId",
            inputs: [],
            outputs: [{ name: "", type: "uint256" }],
            stateMutability: "view",
          },
        ],
        functionName: "nextJobId",
      })
      .then((id) => {
        // nextJobId is the *next* ID, so total jobs = nextJobId - 1
        const count = Number(id) - 1;
        setJobCount(count >= 0 ? count : 0);
      })
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Jobs Created", value: jobCount },
    { label: "Validators", value: validators },
    { label: "Agents", value: agents },
  ];

  return (
    <section className="py-10 px-[20px] bg-gray-50 dark:bg-white/[0.02] border-y border-gray-200 dark:border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-[36px] sm:text-[48px] font-degular-bold text-heading leading-none mb-1">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-[13px] sm:text-[15px] font-degular-medium text-text/60 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
