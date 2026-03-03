"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Search } from "lucide-react";
import type { Job, JobStatus } from "../lib/types";
import { shortenAddress } from "../lib/format";
import { jobsToCsv } from "../lib/format";
import StatusBadge from "./StatusBadge";

const ALL_STATUSES: JobStatus[] = [
  "Open",
  "Assigned",
  "CompletionRequested",
  "Settled",
  "Disputed",
  "Expired",
];

interface JobTableProps {
  jobs: Job[];
}

const JobTable: React.FC<JobTableProps> = ({ jobs }) => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<JobStatus | "All">("All");

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus =
        activeFilter === "All" || job.status === activeFilter;
      const matchesSearch =
        search === "" ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.id.toString().includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [jobs, search, activeFilter]);

  const handleExport = () => {
    const csv = jobsToCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jobs-ledger.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent text-heading font-degular text-sm focus:outline-none focus:border-[#805abe] transition-colors"
          />
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-text hover:text-heading font-degular text-sm transition-colors duration-300"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Status Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveFilter("All")}
          className={`px-3 py-1 rounded-full text-xs font-degular-medium transition-colors duration-300 ${
            activeFilter === "All"
              ? "bg-heading text-heading-invert"
              : "text-text border border-black/10 dark:border-white/10 hover:text-heading"
          }`}
        >
          All ({jobs.length})
        </button>
        {ALL_STATUSES.map((status) => {
          const count = jobs.filter((j) => j.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-3 py-1 rounded-full text-xs font-degular-medium transition-colors duration-300 ${
                activeFilter === status
                  ? "bg-heading text-heading-invert"
                  : "text-text border border-black/10 dark:border-white/10 hover:text-heading"
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider">
                ID
              </th>
              <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider">
                Title
              </th>
              <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider">
                Status
              </th>
              <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider">
                Payout
              </th>
              <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider hidden sm:table-cell">
                Employer
              </th>
              <th className="pb-3 text-xs font-degular-medium text-text uppercase tracking-wider hidden md:table-cell">
                Agent
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job, index) => (
              <motion.tr
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <td className="py-3 text-sm font-degular text-heading">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-[#805abe] hover:text-[#b44ace] underline underline-offset-2 transition-colors duration-300"
                  >
                    #{job.id}
                  </Link>
                </td>
                <td className="py-3 text-sm font-degular text-heading max-w-[200px] truncate">
                  {job.title}
                </td>
                <td className="py-3">
                  <StatusBadge status={job.status} />
                </td>
                <td className="py-3 text-sm font-degular text-heading">
                  {job.payoutEth} ETH
                </td>
                <td className="py-3 text-sm font-degular text-text hidden sm:table-cell">
                  {shortenAddress(job.employer)}
                </td>
                <td className="py-3 text-sm font-degular text-text hidden md:table-cell">
                  {shortenAddress(job.agent)}
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-text font-degular text-sm"
                >
                  No jobs match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;
