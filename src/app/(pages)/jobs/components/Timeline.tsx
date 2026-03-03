"use client";
import React from "react";
import { motion } from "framer-motion";
import type { LucideProps } from "lucide-react";
import {
  PlusCircle,
  UserCheck,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileCheck,
} from "lucide-react";
import type { LedgerEvent } from "../lib/types";
import { formatTimestampFull } from "../lib/format";

const ACTION_ICONS: Record<string, React.FC<LucideProps>> = {
  JobCreated: PlusCircle,
  AgentAssigned: UserCheck,
  CompletionRequested: FileCheck,
  JobSettled: CheckCircle,
  DisputeRaised: AlertTriangle,
  JobExpired: Clock,
};

interface TimelineProps {
  events: LedgerEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative pl-6">
      <div className="absolute left-2.5 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />
      {events.map((event, index) => {
        const Icon = ACTION_ICONS[event.action] || PlusCircle;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative mb-6 last:mb-0"
          >
            <div className="absolute -left-[14px] top-1 w-5 h-5 rounded-full bg-[#805abe]/20 flex items-center justify-center">
              <Icon className="w-3 h-3 text-[#805abe]" />
            </div>
            <div className="ml-4">
              <p className="text-xs text-text font-degular">
                {formatTimestampFull(event.timestamp)}
              </p>
              <p className="text-sm font-degular-medium text-heading mt-0.5">
                {event.action}
              </p>
              <p className="text-sm text-text font-degular mt-0.5">
                {event.detail}
              </p>
              <span className="inline-block mt-1 text-xs text-[#805abe] font-degular-medium">
                {event.actor} ({event.role})
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Timeline;
