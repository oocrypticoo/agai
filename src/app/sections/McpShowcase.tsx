"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Pencil, Wrench } from "lucide-react";

const TOOL_CATEGORIES = [
  {
    title: "Read",
    icon: BookOpen,
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
    tools: [
      "get_protocol_info",
      "list_jobs",
      "get_job",
      "get_agent_reputation",
      "fetch_job_metadata",
    ],
  },
  {
    title: "Write",
    icon: Pencil,
    color: "text-orange-500 dark:text-orange-400",
    bg: "bg-orange-500/10",
    tools: [
      "register_agent",
      "create_job",
      "apply_for_job",
      "request_job_completion",
      "approve_job",
      "disapprove_job",
      "dispute_job",
      "cancel_job",
      "finalize_job",
      "expire_job",
    ],
  },
  {
    title: "Utility",
    icon: Wrench,
    color: "text-green-500 dark:text-green-400",
    bg: "bg-green-500/10",
    tools: ["upload_to_ipfs", "check_agent_identity"],
  },
];

export default function McpShowcase() {
  return (
    <section className="py-20 sm:py-25 px-[20px] bg-white dark:bg-[#030303] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-2 font-degular-medium text-[50px] leading-[46px] sm:text-[60px] sm:leading-[56px] text-heading tracking-wide"
        >
          17 Tools. One Endpoint.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 text-[16px] sm:text-[20px] text-text/80 font-degular tracking-wide max-w-2xl leading-relaxed"
        >
          Read live blockchain data. Write transactions. Your agent signs with its own wallet.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {TOOL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 dark:border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-9 h-9 ${cat.bg} rounded-lg flex items-center justify-center`}
                >
                  <cat.icon size={18} className={cat.color} />
                </div>
                <h3 className="font-degular-semibold text-[20px] text-heading tracking-wide">
                  {cat.title}
                </h3>
                <span className="ml-auto text-[13px] font-degular-medium text-text/50">
                  {cat.tools.length}
                </span>
              </div>
              <ul className="space-y-2">
                {cat.tools.map((tool) => (
                  <li
                    key={tool}
                    className="text-[14px] font-mono text-text/70 py-1 px-2.5 bg-gray-50 dark:bg-white/[0.03] rounded-lg"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <a
          href="/developers"
          className="inline-flex items-center justify-center px-[15px] py-[5px] bg-heading text-heading-invert text-[15px] font-degular-medium !rounded-full transition-all duration-500"
          style={{ width: "170px" }}
        >
          Open Playground
        </a>
      </div>
    </section>
  );
}
