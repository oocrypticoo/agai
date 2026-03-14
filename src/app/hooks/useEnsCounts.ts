"use client";
import { useState, useEffect, useCallback } from "react";

const POLL_INTERVAL = 60_000; // 60 seconds

const ENS_ENDPOINTS = [
  "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
  "https://gateway.thegraph.com/api/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH",
];

const QUERY = `{
  validators: wrappedDomains(where: {name_ends_with: ".club.agi.eth"}, first: 1000) {
    id
  }
  agents: wrappedDomains(where: {name_ends_with: ".agent.agi.eth"}, first: 1000) {
    id
  }
}`;

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
    for (const endpoint of ENS_ENDPOINTS) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: QUERY }),
          signal: controller.signal,
        });
        clearTimeout(timer);

        if (!res.ok) continue;

        const json = await res.json();
        if (json?.data) {
          setCounts({
            validators: json.data.validators?.length ?? 0,
            agents: json.data.agents?.length ?? 0,
          });
          return; // success, stop trying endpoints
        }
      } catch {
        // try next endpoint
      }
    }
  }, []);

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchCounts]);

  return counts;
}
