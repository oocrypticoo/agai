"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/jobs" },
  { label: "Ledger", href: "/jobs/ledger" },
  { label: "Ops Console", href: "/jobs/ops" },
  { label: "Demo Scenarios", href: "/jobs/demo" },
  { label: "Deployment", href: "/jobs/deployment" },
];

const JobsSubNav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/jobs") return pathname === "/jobs";
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="max-w-4xl mx-auto mb-10"
    >
      <div className="flex flex-wrap justify-center gap-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-full text-sm font-degular-medium transition-colors duration-300 ${
              isActive(item.href)
                ? "bg-heading text-heading-invert"
                : "text-text hover:text-heading border border-black/10 dark:border-white/10"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default JobsSubNav;
