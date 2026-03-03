"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check } from "lucide-react";
import Footer from "@/app/sections/Footer";
import { DEMO_JOBS } from "../lib/demo-data";
import { shortenAddress, formatTimestamp } from "../lib/format";
import { buildLedgerTimeline, getAvailableActions } from "../lib/job-status";
import DemoBanner from "../components/DemoBanner";
import JobsSubNav from "../components/JobsSubNav";
import StatusBadge from "../components/StatusBadge";
import Timeline from "../components/Timeline";
import ActionCard from "../components/ActionCard";

const JobDetailPage: React.FC = () => {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const jobId = Number(params.jobId);
  const job = DEMO_JOBS.find((j) => j.id === jobId);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!mounted) return null;

  if (!job) {
    return (
      <div className="min-h-screen bg-heading-invert">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold font-degular text-heading mb-4">
            Job not found
          </h1>
          <Link
            href="/jobs/ledger"
            className="text-[#805abe] hover:text-[#b44ace] font-degular-medium underline underline-offset-2 transition-colors duration-300"
          >
            Back to ledger
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const timeline = buildLedgerTimeline(job.id, job.status, job.createdAt);
  const actions = getAvailableActions(job.status, "visitor");

  const uriFields = [
    { label: "Metadata URI", value: job.metadataUri },
    ...(job.resultUri
      ? [{ label: "Result URI", value: job.resultUri }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-heading-invert">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link
            href="/jobs/ledger"
            className="inline-flex items-center gap-2 text-text hover:text-heading font-degular text-sm transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to ledger
          </Link>
        </motion.div>

        {/* Title + Badge */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-3"
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-degular text-heading">
              Job #{job.id}
            </h1>
            <StatusBadge status={job.status} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-text font-degular max-w-2xl mx-auto"
          >
            {job.title}
          </motion.p>
        </div>

        <DemoBanner />
        <JobsSubNav />

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Info + URIs + Actions */}
          <div className="space-y-6">
            {/* Job Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/5 dark:bg-white/5"
            >
              <h2 className="text-lg font-bold font-degular text-heading mb-4">
                Job Info
              </h2>
              <dl className="space-y-3 text-sm font-degular">
                <div className="flex justify-between">
                  <dt className="text-text">Payout</dt>
                  <dd className="text-heading font-degular-medium">
                    {job.payoutEth} ETH
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text">Employer</dt>
                  <dd className="text-heading font-degular-medium">
                    {shortenAddress(job.employer)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text">Agent</dt>
                  <dd className="text-heading font-degular-medium">
                    {shortenAddress(job.agent)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text">Arbiter</dt>
                  <dd className="text-heading font-degular-medium">
                    {shortenAddress(job.arbiter)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text">Created</dt>
                  <dd className="text-heading font-degular-medium">
                    {formatTimestamp(job.createdAt)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text">Updated</dt>
                  <dd className="text-heading font-degular-medium">
                    {formatTimestamp(job.updatedAt)}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* URIs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/5 dark:bg-white/5"
            >
              <h2 className="text-lg font-bold font-degular text-heading mb-4">
                URIs
              </h2>
              <div className="space-y-3">
                {uriFields.map((field) => (
                  <div key={field.label}>
                    <p className="text-xs text-text font-degular mb-1">
                      {field.label}
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs text-heading bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg font-mono truncate">
                        {field.value}
                      </code>
                      <button
                        onClick={() => handleCopy(field.value, field.label)}
                        className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text hover:text-heading"
                        title="Copy"
                      >
                        {copiedField === field.label ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/5 dark:bg-white/5"
            >
              <h2 className="text-lg font-bold font-degular text-heading mb-4">
                Actions
              </h2>
              <div className="space-y-3">
                {actions.map((action) => (
                  <ActionCard key={action.label} {...action} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white/5 dark:bg-white/5"
          >
            <h2 className="text-lg font-bold font-degular text-heading mb-6">
              Sovereign Ledger
            </h2>
            <Timeline events={timeline} />
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetailPage;
