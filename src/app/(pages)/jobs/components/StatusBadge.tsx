"use client";
import React from "react";
import type { JobStatus } from "../lib/types";
import { getStatusColors, formatStatus } from "../lib/job-status";

interface StatusBadgeProps {
  status: JobStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colors = getStatusColors(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-degular-medium ${colors.bg} ${colors.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
