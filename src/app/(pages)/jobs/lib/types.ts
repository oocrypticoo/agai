export type JobStatus =
  | "Open"
  | "Assigned"
  | "CompletionRequested"
  | "Settled"
  | "Disputed"
  | "Expired";

export type Role = "employer" | "agent" | "arbiter" | "admin" | "visitor";

export interface Job {
  id: number;
  title: string;
  status: JobStatus;
  payoutEth: number;
  employer: string;
  agent: string;
  arbiter: string;
  createdAt: string;
  updatedAt: string;
  metadataUri: string;
  resultUri: string;
}

export interface LedgerEvent {
  timestamp: string;
  action: string;
  actor: string;
  role: Role;
  detail: string;
}

export interface PlatformConfig {
  paused: boolean;
  quorum: number;
  requiredApprovals: number;
  reviewPeriodDays: number;
  treasuryAddress: string;
  treasuryBalanceEth: number;
  roles: { address: string; role: Role; label: string }[];
}

export interface DemoScenario {
  id: number;
  title: string;
  description: string;
  actor: Role;
  tags: string[];
  jobId: number;
}

export interface ContractDeployment {
  name: string;
  address: string;
  network: string;
  compiler: string;
  optimizer: boolean;
  runs: number;
}
