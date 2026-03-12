"use client";
import { useState, useEffect, useCallback } from "react";

const ENS_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";
const POLL_INTERVAL = 60_000; // 60 seconds

const QUERY = `{
  validators: wrappedDomains(where: {name_ends_with: ".club.agi.eth"}, first: 1000) {
    owner { id }
  }
  agents: wrappedDomains(where: {name_ends_with: ".agent.agi.eth"}, first: 1000) {
    owner { id }
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
    try {
      const res = await fetch(ENS_SUBGRAPH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: QUERY }),
      });
      const json = await res.json();
      if (json?.data) {
        const validatorOwners = new Set(
          json.data.validators?.map(
            (d: { owner: { id: string } }) => d.owner.id
          ) ?? []
        );
        const agentOwners = new Set(
          json.data.agents?.map(
            (d: { owner: { id: string } }) => d.owner.id
          ) ?? []
        );
        setCounts({
          validators: validatorOwners.size,
          agents: agentOwners.size,
        });
      }
    } catch {
      // fail silently, keep previous values
    }
  }, []);

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchCounts]);

  return counts;
}
