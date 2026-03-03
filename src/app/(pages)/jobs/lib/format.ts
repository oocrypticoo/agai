import type { Job } from "./types";

export function shortenAddress(addr: string): string {
  if (addr.length <= 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTimestampFull(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function jobsToCsv(jobs: Job[]): string {
  const header = "ID,Title,Status,Payout (ETH),Employer,Agent";
  const rows = jobs.map(
    (j) =>
      `${j.id},"${j.title}",${j.status},${j.payoutEth},${shortenAddress(j.employer)},${shortenAddress(j.agent)}`
  );
  return [header, ...rows].join("\n");
}
