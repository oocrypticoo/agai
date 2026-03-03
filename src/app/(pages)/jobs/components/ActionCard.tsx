"use client";
import React from "react";

interface ActionCardProps {
  label: string;
  disabled: boolean;
  reason: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ label, disabled, reason }) => {
  return (
    <button
      disabled={disabled}
      title={reason}
      className="w-full border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 text-left font-degular transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white/5 dark:bg-white/5"
    >
      <span className="text-sm font-degular-medium text-heading">{label}</span>
      {disabled && (
        <p className="text-xs text-text mt-1">{reason}</p>
      )}
    </button>
  );
};

export default ActionCard;
