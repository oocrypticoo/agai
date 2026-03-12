"use client";
import { useEffect, useState, useRef } from "react";
import { createPublicClient, http, fallback, formatUnits } from "viem";
import { mainnet } from "viem/chains";
import { useEnsCounts } from "../hooks/useEnsCounts";
import { useAgialphaPrice } from "../hooks/useAgialphaPrice";
import { motion } from "framer-motion";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    http("https://ethereum-rpc.publicnode.com"),
    http("https://eth.llamarpc.com"),
    http("https://rpc.ankr.com/eth"),
  ]),
});

const AGI_JOB_MANAGER = "0xB3AAeb69b630f0299791679c063d68d6687481d1" as const;

const JOB_MANAGER_ABI = [
  {
    type: "function" as const,
    name: "nextJobId" as const,
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view" as const,
  },
  {
    type: "function" as const,
    name: "getJobCore" as const,
    inputs: [{ name: "jobId", type: "uint256" }],
    outputs: [
      { name: "employer", type: "address" },
      { name: "assignedAgent", type: "address" },
      { name: "payout", type: "uint256" },
      { name: "duration", type: "uint256" },
      { name: "assignedAt", type: "uint256" },
      { name: "completed", type: "bool" },
      { name: "disputed", type: "bool" },
      { name: "expired", type: "bool" },
      { name: "agentPayoutPct", type: "uint8" },
    ],
    stateMutability: "view" as const,
  },
] as const;

function AnimatedNumber({ value, prefix }: { value: number | null; prefix?: string }) {
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    prev.current = end;
  }, [value]);

  if (value === null) return <span className="opacity-40">--</span>;
  return <>{prefix}{display.toLocaleString()}</>;
}

export default function LiveStats() {
  const [jobCount, setJobCount] = useState<number | null>(null);
  const [totalTokensPaid, setTotalTokensPaid] = useState<number | null>(null);
  const { validators, agents } = useEnsCounts();
  const { priceUsd } = useAgialphaPrice();

  useEffect(() => {
    (async () => {
      try {
        const nextId = await publicClient.readContract({
          address: AGI_JOB_MANAGER,
          abi: JOB_MANAGER_ABI,
          functionName: "nextJobId",
        });

        const count = Number(nextId) - 1;
        setJobCount(count >= 0 ? count : 0);

        if (count <= 0) {
          setTotalTokensPaid(0);
          return;
        }

        const jobIds = Array.from({ length: count }, (_, i) => BigInt(i + 1));
        const results = await publicClient.multicall({
          contracts: jobIds.map((id) => ({
            address: AGI_JOB_MANAGER,
            abi: JOB_MANAGER_ABI,
            functionName: "getJobCore" as const,
            args: [id],
          })),
        });

        let totalPayout = BigInt(0);
        for (const r of results) {
          if (r.status === "success") {
            const [, , payout, , , completed] = r.result;
            if (completed) {
              totalPayout += payout;
            }
          }
        }

        setTotalTokensPaid(Math.round(parseFloat(formatUnits(totalPayout, 18))));
      } catch {
        // fail silently
      }
    })();
  }, []);

  const paidOutUsd = totalTokensPaid !== null && priceUsd !== null
    ? Math.round(totalTokensPaid * priceUsd)
    : null;

  const stats = [
    { label: "Jobs Created", value: jobCount },
    { label: "AGI Paid Out", value: totalTokensPaid },
    { label: "USD Paid Out", value: paidOutUsd, prefix: "$" },
    { label: "Validators", value: validators },
    { label: "Agents", value: agents },
  ];

  return (
    <section className="py-10 px-[20px] bg-gray-50 dark:bg-white/[0.02] border-y border-gray-200 dark:border-white/5">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-[28px] sm:text-[40px] font-degular-bold text-heading leading-none mb-1">
                <AnimatedNumber value={stat.value} prefix={stat.prefix} />
              </div>
              <div className="text-[11px] sm:text-[13px] font-degular-medium text-text/60 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
