"use client";
import { useState, useEffect, useCallback } from "react";

const POLL_INTERVAL = 120_000; // 2 minutes — matches server cache TTL

interface EnsCounts {
  validators: number | null;
  agents: number | null;
}

export function useEnsCounts(): EnsCounts {
  const [counts, setCounts] = useState<EnsCounts>({
    validators: null,
    agents: null,
  });

  const fetchCounts = useCallback(async () => {
    try {
      const res = await fetch("/api/ens-counts");
      if (!res.ok) return;
      const json = await res.json();
      if (json.validators !== undefined && json.agents !== undefined) {
        setCounts({ validators: json.validators, agents: json.agents });
      }
    } catch {
      // fail silently
    }
  }, []);

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchCounts]);

  return counts;
}
