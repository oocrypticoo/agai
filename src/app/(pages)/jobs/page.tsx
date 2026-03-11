'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Search, Shield, RefreshCw, X, ExternalLink,
  CheckCircle2, Clock, AlertTriangle, XCircle, Eye,
  ChevronDown, ChevronUp, Wallet, Globe, FileCheck, AtSign, ArrowRightLeft,
  Loader2, Send, Ban, Timer, Gavel, ThumbsUp, ThumbsDown, Flag,
} from 'lucide-react';
import { useAccount, useConnect, useSignMessage, useEnsName, usePublicClient, useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, keccak256, toBytes } from 'viem';
import { mainnet } from 'wagmi/chains';
import Footer from '@/app/sections/Footer';
import Link from 'next/link';
import { WalletButton } from './components/WalletButton';
import { CONTRACTS, DEPLOYMENT_BLOCK, agiJobManagerAbi, erc20Abi, ENS_SUBDOMAINS } from './lib/contracts';
import { TERMS_AND_CONDITIONS } from './lib/terms';
import CreateJobBuilder from './components/CreateJobBuilder';

// ─── Types ───────────────────────────────────────────────────────────────────

type JobStatusLabel = 'Open' | 'Assigned' | 'In Review' | 'Disputed' | 'Completed' | 'Expired' | 'Cancelled';

interface ParsedJob {
  id: number;
  employer: string;
  assignedAgent: string;
  payout: bigint;
  duration: bigint;
  specURI: string;
  details: string;
  validatorApprovals: bigint;
  validatorDisapprovals: bigint;
  validatorCount: bigint;
  completionURI: string;
  status: JobStatusLabel;
  specMeta?: JobSpecMeta | null;
  // Event-derived flags
  hasApplied: boolean;
  hasCompletionRequest: boolean;
  isCompleted: boolean;
  isDisputed: boolean;
  isExpired: boolean;
  isCancelled: boolean;
  completionRequestedAt: bigint;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

const TERMS_SIG_PREFIX = 'agi-terms-sig:';
const TERMS_MESSAGE = (hash: string) =>
  `I accept the AGIJobManager Terms & Conditions.\n\nTerms hash: ${hash}`;

function getTermsSigKey(address: string) {
  return `${TERMS_SIG_PREFIX}${address.toLowerCase()}`;
}

function hasSignedTerms(address: string | undefined): boolean {
  if (!address) return false;
  return !!localStorage.getItem(getTermsSigKey(address));
}

function storeTermsSig(address: string, sig: string) {
  localStorage.setItem(getTermsSigKey(address), sig);
}

/** Extract the first subdomain label — the contract hashes this against the
 *  appropriate root node (agentRootNode or alphaAgentRootNode) internally.
 *  "jester.agent.agi.eth" → "jester"
 *  "jester.alpha.agent.agi.eth" → "jester"
 *  "foo.club.agi.eth" → "foo"  */
function extractSubdomainLabel(fullName: string): string {
  return fullName.split('.')[0];
}

/** Compute the validator bond required for a given payout (15% clamped to [100, 88888888] AGIALPHA, 18 decimals) */
function validatorBondFor(payout: bigint): bigint {
  const bps = BigInt(1500);
  const min = BigInt('100000000000000000000');        // 100 * 1e18
  const max = BigInt('88888888000000000000000000');    // 88888888 * 1e18
  let bond = (payout * bps) / BigInt(10000);
  if (bond < min) bond = min;
  if (bond > max) bond = max;
  return bond;
}

/** Map known AGIJobManager revert selectors to human-readable reasons */
const REVERT_REASONS: Record<string, string> = {
  '0xc0a85631': 'Job not found — this job ID does not exist',
  '0xbaf3f0f7': 'Invalid state — job is not in the correct state for this action',
  '0xea8e4eb5': 'Not authorized — you do not own the required ENS subdomain',
  '0x90b8ec18': 'Transfer failed — insufficient AGIALPHA balance or allowance for the required bond',
  '0x0740e70a': 'Ineligible agent payout — agent does not hold a qualifying NFT from agiTypes',
  '0x40581a33': 'Invalid ENS label — the subdomain label could not be verified on-chain',
  '0x4c211ccd': 'Settlement is paused — the contract owner has paused settlements',
};

function decodeRevertReason(error: unknown): string {
  const msg = (error as Error)?.message ?? String(error);
  // Look for a 4-byte selector in the error
  for (const [selector, reason] of Object.entries(REVERT_REASONS)) {
    if (msg.includes(selector)) return reason;
  }
  // Wagmi/viem common messages
  if (msg.includes('User rejected') || msg.includes('user rejected')) return 'Transaction rejected by user';
  if (msg.includes('insufficient funds')) return 'Insufficient ETH for gas fees';
  // Fallback: first meaningful line
  const firstLine = msg.split('\n')[0];
  if (firstLine.length > 120) return firstLine.slice(0, 120) + '...';
  return firstLine || 'Transaction failed';
}

function shortenAddress(addr: string): string {
  if (!addr || addr === ZERO_ADDR) return '—';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function deriveStatus(flags: {
  employer: string;
  assignedAgent: string;
  isCompleted: boolean;
  isDisputed: boolean;
  isExpired: boolean;
  isCancelled: boolean;
  hasCompletionRequest: boolean;
  validatorApprovals: bigint;
  validatorDisapprovals: bigint;
}): JobStatusLabel {
  if (flags.isCancelled) return 'Cancelled';
  if (flags.isCompleted) {
    // Completed with more disapprovals than approvals = rejected/disputed outcome
    if (flags.validatorDisapprovals > flags.validatorApprovals) return 'Disputed';
    return 'Completed';
  }
  if (flags.isDisputed) return 'Disputed';
  if (flags.isExpired) return 'Expired';
  if (flags.hasCompletionRequest) return 'In Review';
  if (flags.assignedAgent !== ZERO_ADDR) return 'Assigned';
  if (flags.employer === ZERO_ADDR) return 'Expired';
  return 'Open';
}

function formatDuration(seconds: bigint): string {
  const s = Number(seconds);
  if (s >= 86400) return `${Math.floor(s / 86400)}d`;
  if (s >= 3600) return `${Math.floor(s / 3600)}h`;
  return `${s}s`;
}

const statusColors: Record<JobStatusLabel, string> = {
  Open: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Assigned: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'In Review': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  Disputed: 'text-red-400 bg-red-400/10 border-red-400/20',
  Completed: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Expired: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
  Cancelled: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
};

// ─── Role Playbook (tabbed) ──────────────────────────────────────────────────

const PLAYBOOK: Record<string, string[]> = {
  Employer: [
    'Use durable URIs and explicit acceptance criteria.',
    'Keep payout proportional to job complexity and validator budget.',
    'Cancel only before assignment; after assignment, use contract lifecycle tools.',
  ],
  Agent: [
    'Verify agent ENS first, then inspect likely bond exposure.',
    'Do not miss the duration window; late completion requests revert.',
    'Provide a strong completion URI because validators only see what you submit.',
  ],
  Validator: [
    'Verify club ENS before voting.',
    'Only vote after independent review of the completion URI and job spec URI.',
    'Wrong-side votes can be heavily slashed depending on final outcome.',
  ],
};

function RolePlaybook() {
  const [tab, setTab] = useState<string>('Employer');
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-6 flex flex-col">
      <h3 className="text-sm font-degular-semibold text-heading mb-3">Role Playbook</h3>
      <div className="flex gap-1 mb-4">
        {Object.keys(PLAYBOOK).map((role) => (
          <button
            key={role}
            onClick={() => setTab(role)}
            className={`px-2.5 py-1 rounded-lg text-xs font-degular-medium transition-all duration-200 ${
              tab === role
                ? 'bg-[#805abe]/20 text-[#805abe] border border-[#805abe]/30'
                : 'border border-black/5 dark:border-white/5 text-text/40 hover:text-text/70'
            }`}
          >
            {role}
          </button>
        ))}
      </div>
      <ul className="space-y-2.5 flex-1">
        {PLAYBOOK[tab].map((tip, i) => (
          <li key={i} className="flex gap-2 text-xs text-text/60 font-degular leading-relaxed">
            <span className="text-text/20 mt-px">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Contract read base ─────────────────────────────────────────────────────

const contractBase = {
  address: CONTRACTS.AGI_JOB_MANAGER,
  abi: agiJobManagerAbi,
} as const;

// ─── Page ────────────────────────────────────────────────────────────────────

// ─── IPFS gateway helper ──────────────────────────────────────────────────────

function ipfsToHttp(uri: string): string {
  if (uri.startsWith('ipfs://')) return `https://ipfs.io/ipfs/${uri.slice(7)}`;
  return uri;
}

// ─── Job spec metadata shape ─────────────────────────────────────────────────

interface JobSpecMeta {
  name?: string;
  description?: string;
  image?: string;
  properties?: {
    title?: string;
    summary?: string;
    details?: string;
    category?: string;
    tags?: string[];
    deliverables?: string[];
    acceptanceCriteria?: string[];
    requirements?: string[];
    payoutAGIALPHA?: string;
    durationSeconds?: number;
    employer?: string;
    [key: string]: unknown;
  };
  attributes?: { trait_type?: string; value?: string | number; display_type?: string }[];
}

export default function JobsDApp() {
  const [mounted, setMounted] = useState(false);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [selectedJob, setSelectedJob] = useState<ParsedJob | null>(null);
  const [jobSpec, setJobSpec] = useState<JobSpecMeta | null>(null);
  const [jobSpecLoading, setJobSpecLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsSigning, setTermsSigning] = useState(false);
  const [protocolOpen, setProtocolOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState<JobStatusLabel | 'All'>('All');
  const [calcPayout, setCalcPayout] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Job action state
  const [completionURIInput, setCompletionURIInput] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingApplyJobId, setPendingApplyJobId] = useState<number | null>(null);

  // Validator addresses for detail modal
  const [validators, setValidators] = useState<{ address: string; type: 'approved' | 'disapproved' }[]>([]);
  const [validatorsLoading, setValidatorsLoading] = useState(false);

  // (Create Job form state moved to CreateJobBuilder component)

  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const onCorrectChain = chain?.id === mainnet.id;

  // ENS reverse lookup — shows primary ENS name if set
  const { data: ensName } = useEnsName({
    address,
    query: { enabled: !!address },
  });

  // ENS subdomain checks — silent on wallet connect
  const [ensAgent, setEnsAgent] = useState<string | null>(null);
  const [ensClub, setEnsClub] = useState<string | null>(null);
  const [ensLoading, setEnsLoading] = useState(false);

  // Check terms on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Re-check terms whenever wallet changes
  useEffect(() => {
    setTermsAccepted(hasSignedTerms(address));
  }, [address]);

  // Auto-detect ENS subdomains — cache in sessionStorage for instant loads
  // Depend only on `address` — it's undefined when disconnected, so covers both cases
  useEffect(() => {
    if (!address) {
      setEnsAgent(null);
      setEnsClub(null);
      setEnsLoading(false);
      return;
    }
    let cancelled = false;
    const cacheKey = `ens-subs:${address.toLowerCase()}`;

    // 1. Instant load from cache
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { agent, club } = JSON.parse(cached);
        setEnsAgent(agent);
        setEnsClub(club);
      }
    } catch { /* ignore */ }

    // Always fetch fresh in background
    setEnsLoading(true);

    async function fetchENS() {
      try {
        const addr = address!.toLowerCase();
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 12000);
        const res = await fetch(`/api/ens-subdomains?address=${addr}`, {
          signal: controller.signal,
        });
        clearTimeout(timer);

        if (cancelled) return;

        if (res.ok) {
          const data = await res.json();
          const agentName = data.agent ?? null;
          const clubName = data.club ?? null;

          setEnsAgent(agentName);
          setEnsClub(clubName);

          // Cache for this session
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify({ agent: agentName, club: clubName }));
          } catch { /* storage full, ignore */ }
        }
      } catch {
        // Network error — keep cached values if any
      } finally {
        if (!cancelled) setEnsLoading(false);
      }
    }

    fetchENS();
    return () => { cancelled = true; };
  }, [address]);

  // ── Event-based job discovery + contract reads ───────────────────────────

  const publicClient = usePublicClient();
  const [jobs, setJobs] = useState<ParsedJob[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (!publicClient) return;
    let cancelled = false;
    setJobsLoading(true);

    async function loadJobs() {
      try {
        // 1. Read nextJobId to know how many jobs exist
        const nextId = await publicClient!.readContract({
          ...contractBase,
          functionName: 'nextJobId',
        }) as bigint;

        const count = Number(nextId);
        if (cancelled || count === 0) {
          if (!cancelled) setJobs([]);
          return;
        }

        const jobIds = Array.from({ length: count }, (_, i) => i);

        // 2. Multicall all reads for each job
        const [cores, validations, specURIs, completionURIs] = await Promise.all([
          publicClient!.multicall({
            contracts: jobIds.map(id => ({ ...contractBase, functionName: 'getJobCore' as const, args: [BigInt(id)] as const })),
          }),
          publicClient!.multicall({
            contracts: jobIds.map(id => ({ ...contractBase, functionName: 'getJobValidation' as const, args: [BigInt(id)] as const })),
          }),
          publicClient!.multicall({
            contracts: jobIds.map(id => ({ ...contractBase, functionName: 'getJobSpecURI' as const, args: [BigInt(id)] as const })),
          }),
          publicClient!.multicall({
            contracts: jobIds.map(id => ({ ...contractBase, functionName: 'getJobCompletionURI' as const, args: [BigInt(id)] as const })),
          }),
        ]);

        if (cancelled) return;

        // 3. Parse results into ParsedJob[]
        // getJobCore returns: (employer, assignedAgent, payout, duration, assignedAt, completed, disputed, expired, agentPayoutPct)
        // getJobValidation returns: (completionRequested, validatorApprovals, validatorDisapprovals, completionRequestedAt, disputedAt)
        const parsed: ParsedJob[] = jobIds.map((id) => {
          const core = cores[id];
          const val = validations[id];
          const specURI = specURIs[id];
          const compURI = completionURIs[id];

          let employer = ZERO_ADDR, assignedAgent = ZERO_ADDR, payout = BigInt(0), duration = BigInt(0);
          let completed = false, disputed = false, expired = false;
          let completionRequested = false, vApprovals = BigInt(0), vDisapprovals = BigInt(0);

          if (core.status === 'success') {
            const c = core.result as readonly [string, string, bigint, bigint, bigint, boolean, boolean, boolean, number];
            employer = c[0]; assignedAgent = c[1]; payout = c[2]; duration = c[3];
            completed = c[5]; disputed = c[6]; expired = c[7];
          }
          let completionRequestedAt = BigInt(0);
          if (val.status === 'success') {
            const v = val.result as readonly [boolean, bigint, bigint, bigint, bigint];
            completionRequested = v[0]; vApprovals = v[1]; vDisapprovals = v[2];
            completionRequestedAt = v[3];
          }

          const hasAgent = assignedAgent !== ZERO_ADDR;

          const flags = {
            employer,
            assignedAgent,
            hasApplied: hasAgent,
            hasCompletionRequest: completionRequested,
            isCompleted: completed,
            isDisputed: disputed,
            isExpired: expired,
            isCancelled: false,
            completionRequestedAt,
          };

          // Status from contract booleans — authoritative
          let status: JobStatusLabel;
          if (completed) {
            // Completed with more disapprovals than approvals = disputed outcome
            status = vDisapprovals > vApprovals ? 'Disputed' : 'Completed';
          } else if (expired) {
            status = 'Expired';
          } else if (disputed) {
            status = 'Disputed';
          } else if (completionRequested && hasAgent) {
            status = 'In Review';
          } else if (hasAgent) {
            status = 'Assigned';
          } else if (employer === ZERO_ADDR) {
            status = 'Expired';
          } else {
            status = 'Open';
          }

          return {
            id,
            ...flags,
            payout,
            duration,
            specURI: specURI.status === 'success' ? (specURI.result as string) : '',
            details: '',
            validatorApprovals: vApprovals,
            validatorDisapprovals: vDisapprovals,
            validatorCount: BigInt(0),
            completionURI: compURI.status === 'success' ? (compURI.result as string) : '',
            status,
          };
        });

        if (!cancelled) {
          setJobs(parsed);
          setJobsLoading(false);
        }

        // 4. Fetch spec metadata from IPFS in parallel (non-blocking, after render)
        const specFetches = parsed.map(async (job) => {
          if (!job.specURI) return null;
          try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 15000);
            const res = await fetch(ipfsToHttp(job.specURI), { signal: controller.signal });
            clearTimeout(timer);
            if (!res.ok) return null;
            return (await res.json()) as JobSpecMeta;
          } catch { return null; }
        });
        const specs = await Promise.all(specFetches);
        if (!cancelled) {
          setJobs(prev => prev.map((j, i) => ({ ...j, specMeta: specs[i] ?? null })));
        }
      } catch (err) {
        console.error('Failed to load jobs:', err);
        if (!cancelled) {
          setJobs([]);
          setJobsLoading(false);
        }
      }
    }

    loadJobs();
    return () => { cancelled = true; };
  }, [publicClient, refreshCount]);

  // ── Fetch validator addresses when a job is selected ─────────────────────

  useEffect(() => {
    if (!selectedJob || !publicClient) {
      setValidators([]);
      return;
    }

    let cancelled = false;
    setValidatorsLoading(true);
    setValidators([]);

    async function fetchValidators() {
      try {
        const latest = await publicClient!.getBlockNumber();
        const jobIdTopic = ('0x' + BigInt(selectedJob!.id).toString(16).padStart(64, '0')) as `0x${string}`;
        const CHUNK = BigInt(10000);
        const results: { address: string; type: 'approved' | 'disapproved' }[] = [];

        // Scan in 10k-block chunks from deployment block to latest
        for (let from = DEPLOYMENT_BLOCK; from <= latest; from += CHUNK) {
          if (cancelled) return;
          const to = from + CHUNK - BigInt(1) > latest ? latest : from + CHUNK - BigInt(1);

          const [approvedLogs, disapprovedLogs] = await Promise.all([
            publicClient!.getLogs({
              address: CONTRACTS.AGI_JOB_MANAGER,
              event: {
                type: 'event' as const,
                name: 'JobValidated' as const,
                inputs: [
                  { name: 'jobId', type: 'uint256', indexed: true },
                  { name: 'validator', type: 'address', indexed: true },
                ],
              },
              args: { jobId: BigInt(selectedJob!.id) },
              fromBlock: from,
              toBlock: to,
            }),
            publicClient!.getLogs({
              address: CONTRACTS.AGI_JOB_MANAGER,
              event: {
                type: 'event' as const,
                name: 'JobDisapproved' as const,
                inputs: [
                  { name: 'jobId', type: 'uint256', indexed: true },
                  { name: 'validator', type: 'address', indexed: true },
                ],
              },
              args: { jobId: BigInt(selectedJob!.id) },
              fromBlock: from,
              toBlock: to,
            }),
          ]);

          for (const log of approvedLogs) {
            const addr = (log as unknown as { args: { validator: string } }).args.validator;
            if (addr) results.push({ address: addr, type: 'approved' });
          }
          for (const log of disapprovedLogs) {
            const addr = (log as unknown as { args: { validator: string } }).args.validator;
            if (addr) results.push({ address: addr, type: 'disapproved' });
          }
        }

        if (!cancelled) {
          setValidators(results);
          setValidatorsLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch validators:', err);
        if (!cancelled) {
          setValidators([]);
          setValidatorsLoading(false);
        }
      }
    }

    fetchValidators();
    return () => { cancelled = true; };
  }, [selectedJob, publicClient]);

  // Protocol parameters (single multicall) — using verified function names
  const { data: protocolRaw } = useReadContracts({
    contracts: [
      { ...contractBase, functionName: 'voteQuorum' },
      { ...contractBase, functionName: 'requiredValidatorApprovals' },
      { ...contractBase, functionName: 'requiredValidatorDisapprovals' },
      { ...contractBase, functionName: 'completionReviewPeriod' },
      { ...contractBase, functionName: 'challengePeriodAfterApproval' },
      { ...contractBase, functionName: 'disputeReviewPeriod' },
      { ...contractBase, functionName: 'maxJobPayout' },
      { ...contractBase, functionName: 'jobDurationLimit' },
      { ...contractBase, functionName: 'maxActiveJobsPerAgent' },
      { ...contractBase, functionName: 'validatorSlashBps' },
      { ...contractBase, functionName: 'paused' },
      { ...contractBase, functionName: 'settlementPaused' },
      { ...contractBase, functionName: 'agentBondBps' },
      { ...contractBase, functionName: 'agentBondMin' },
      { ...contractBase, functionName: 'agentBondMax' },
      { ...contractBase, functionName: 'validatorBondBps' },
      { ...contractBase, functionName: 'validatorBondMin' },
      { ...contractBase, functionName: 'validatorBondMax' },
      { ...contractBase, functionName: 'validationRewardPercentage' },
    ],
  });

  // Token balance (official)
  const { data: tokenBalance } = useReadContract({
    address: CONTRACTS.AGIALPHA_OFFICIAL,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 15000 },
  });

  // Token balance (bridged)
  const { data: tokenBalanceBridged } = useReadContract({
    address: CONTRACTS.AGIALPHA_BRIDGED,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 15000 },
  });

  // Token allowance
  const { data: tokenAllowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACTS.AGIALPHA_OFFICIAL,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.AGI_JOB_MANAGER] : undefined,
    query: { enabled: !!address, refetchInterval: 15000 },
  });

  // (Write hooks for approve/createJob moved to CreateJobBuilder component)

  // ── Token approval write hook (for agent/validator bonds) ─────────────
  const {
    writeContract: approveToken,
    data: approveTxHash,
    isPending: isApproving,
    reset: resetApprove,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  });

  // After approval confirms, refetch allowance and auto-fire pending apply
  useEffect(() => {
    if (isApproveConfirmed) {
      refetchAllowance();
      if (pendingApplyJobId !== null && ensAgent) {
        setPendingApplyJobId(null);
        executeJobAction({
          address: CONTRACTS.AGI_JOB_MANAGER,
          abi: agiJobManagerAbi,
          functionName: 'applyForJob',
          args: [BigInt(pendingApplyJobId), extractSubdomainLabel(ensAgent), [] as readonly `0x${string}`[]],
        });
      }
    }
  }, [isApproveConfirmed]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Job action write hook ─────────────────────────────────────────────
  const {
    writeContract: executeJobAction,
    data: actionTxHash,
    isPending: isActionPending,
    error: actionWriteError,
    reset: resetAction,
  } = useWriteContract();

  const { isLoading: isActionConfirming, isSuccess: isActionConfirmed } = useWaitForTransactionReceipt({
    hash: actionTxHash,
  });

  // ── User role relative to selected job ────────────────────────────────
  const userRole = useMemo(() => {
    if (!selectedJob || !address) return { isEmployer: false, isAssignedAgent: false, hasAgentENS: false, hasClubENS: false };
    return {
      isEmployer: selectedJob.employer.toLowerCase() === address.toLowerCase(),
      isAssignedAgent: selectedJob.assignedAgent.toLowerCase() === address.toLowerCase(),
      hasAgentENS: !!ensAgent,
      hasClubENS: !!ensClub,
    };
  }, [selectedJob, address, ensAgent, ensClub]);

  // ── Available actions for selected job ────────────────────────────────
  type LucideIcon = typeof Send;
  interface JobAction {
    label: string;
    icon: LucideIcon;
    colorClass: string;
    needsCompletionURI?: boolean;
    execute: () => void;
  }

  const actionColorMap: Record<string, string> = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20',
    red: 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20',
    zinc: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400 hover:bg-zinc-500/20',
  };

  const availableActions = useMemo((): JobAction[] => {
    if (!selectedJob || !address || !isConnected) return [];
    const actions: JobAction[] = [];
    const jobId = BigInt(selectedJob.id);

    if (selectedJob.status === 'Open') {
      if (userRole.hasAgentENS && ensAgent) {
        const allowance = tokenAllowance as bigint | undefined;
        const needsApproval = !allowance || allowance === BigInt(0);
        actions.push({
          label: 'Apply',
          icon: Send,
          colorClass: actionColorMap.blue,
          execute: () => {
            setActionError(null);
            if (needsApproval) {
              // Store intent to apply after approval
              setPendingApplyJobId(selectedJob.id);
              approveToken({
                address: CONTRACTS.AGIALPHA_OFFICIAL,
                abi: erc20Abi,
                functionName: 'approve',
                args: [CONTRACTS.AGI_JOB_MANAGER, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')],
              });
            } else {
              executeJobAction({
                address: CONTRACTS.AGI_JOB_MANAGER,
                abi: agiJobManagerAbi,
                functionName: 'applyForJob',
                args: [jobId, extractSubdomainLabel(ensAgent), [] as readonly `0x${string}`[]],
              });
            }
          },
        });
      }
      if (userRole.isEmployer) {
        actions.push({
          label: 'Cancel',
          icon: Ban,
          colorClass: actionColorMap.red,
          execute: () => {
            setActionError(null);
            executeJobAction({
              address: CONTRACTS.AGI_JOB_MANAGER,
              abi: agiJobManagerAbi,
              functionName: 'cancelJob',
              args: [jobId],
            });
          },
        });
      }
    }

    if (selectedJob.status === 'Assigned') {
      if (userRole.isAssignedAgent) {
        actions.push({
          label: 'Request Completion',
          icon: FileCheck,
          colorClass: actionColorMap.emerald,
          needsCompletionURI: true,
          execute: () => {
            if (!completionURIInput.trim()) {
              setActionError('Please enter a completion URI');
              return;
            }
            setActionError(null);
            executeJobAction({
              address: CONTRACTS.AGI_JOB_MANAGER,
              abi: agiJobManagerAbi,
              functionName: 'requestJobCompletion',
              args: [jobId, completionURIInput.trim()],
            });
          },
        });
      }
      actions.push({
        label: 'Expire',
        icon: Timer,
        colorClass: actionColorMap.zinc,
        execute: () => {
          setActionError(null);
          executeJobAction({
            address: CONTRACTS.AGI_JOB_MANAGER,
            abi: agiJobManagerAbi,
            functionName: 'expireJob',
            args: [jobId],
          });
        },
      });
    }

    if (selectedJob.status === 'In Review') {
      if (userRole.hasClubENS && ensClub) {
        const requiredBond = validatorBondFor(selectedJob.payout);
        const balance = tokenBalance as bigint | undefined;
        const bondDisplay = formatUnits(requiredBond, 18);

        actions.push({
          label: 'Approve',
          icon: ThumbsUp,
          colorClass: actionColorMap.emerald,
          execute: () => {
            setActionError(null);
            if (!balance || balance < requiredBond) {
              setActionError(`Insufficient balance for validator bond. You need ${bondDisplay} AGIALPHA but have ${balance ? formatUnits(balance, 18) : '0'}`);
              return;
            }
            const allowance = tokenAllowance as bigint | undefined;
            const needsApproval = !allowance || allowance === BigInt(0);
            if (needsApproval) {
              approveToken({ address: CONTRACTS.AGIALPHA_OFFICIAL, abi: erc20Abi, functionName: 'approve', args: [CONTRACTS.AGI_JOB_MANAGER, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')] });
            } else {
              executeJobAction({
                address: CONTRACTS.AGI_JOB_MANAGER,
                abi: agiJobManagerAbi,
                functionName: 'validateJob',
                args: [jobId, extractSubdomainLabel(ensClub), [] as readonly `0x${string}`[]],
              });
            }
          },
        });
        actions.push({
          label: 'Disapprove',
          icon: ThumbsDown,
          colorClass: actionColorMap.red,
          execute: () => {
            setActionError(null);
            if (!balance || balance < requiredBond) {
              setActionError(`Insufficient balance for validator bond. You need ${bondDisplay} AGIALPHA but have ${balance ? formatUnits(balance, 18) : '0'}`);
              return;
            }
            const allowance = tokenAllowance as bigint | undefined;
            const needsApproval = !allowance || allowance === BigInt(0);
            if (needsApproval) {
              approveToken({ address: CONTRACTS.AGIALPHA_OFFICIAL, abi: erc20Abi, functionName: 'approve', args: [CONTRACTS.AGI_JOB_MANAGER, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')] });
            } else {
              executeJobAction({
                address: CONTRACTS.AGI_JOB_MANAGER,
                abi: agiJobManagerAbi,
                functionName: 'disapproveJob',
                args: [jobId, extractSubdomainLabel(ensClub), [] as readonly `0x${string}`[]],
              });
            }
          },
        });
      }
      if (userRole.isEmployer) {
        actions.push({
          label: 'Dispute',
          icon: Flag,
          colorClass: actionColorMap.amber,
          execute: () => {
            setActionError(null);
            executeJobAction({
              address: CONTRACTS.AGI_JOB_MANAGER,
              abi: agiJobManagerAbi,
              functionName: 'disputeJob',
              args: [jobId],
            });
          },
        });
      }
      // Challenge period: 86400s (24h) after completion requested
      const CHALLENGE_PERIOD = 86400;
      const completionAt = Number(selectedJob.completionRequestedAt);
      const nowSec = Math.floor(Date.now() / 1000);
      const finalizeAt = completionAt + CHALLENGE_PERIOD;
      const canFinalizeNow = completionAt > 0 && nowSec >= finalizeAt;
      const timeLeft = finalizeAt - nowSec;
      const hoursLeft = Math.ceil(timeLeft / 3600);

      actions.push({
        label: canFinalizeNow ? 'Finalize' : `Finalize (${hoursLeft}h)`,
        icon: Gavel,
        colorClass: actionColorMap.cyan,
        execute: () => {
          setActionError(null);
          if (!canFinalizeNow) {
            const readyDate = new Date(finalizeAt * 1000);
            setActionError(`Cannot finalize yet. Challenge period ends ${readyDate.toLocaleString()} (~${hoursLeft}h remaining)`);
            return;
          }
          executeJobAction({
            address: CONTRACTS.AGI_JOB_MANAGER,
            abi: agiJobManagerAbi,
            functionName: 'finalizeJob',
            args: [jobId],
          });
        },
      });
    }

    return actions;
  }, [selectedJob, address, isConnected, userRole, ensAgent, ensClub, completionURIInput, executeJobAction]);

  // Reset action state when selected job changes
  useEffect(() => {
    setCompletionURIInput('');
    setActionError(null);
    setPendingApplyJobId(null);
    resetAction();
    resetApprove();
  }, [selectedJob?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Refresh jobs list after action is confirmed
  useEffect(() => {
    if (isActionConfirmed) {
      setRefreshCount(c => c + 1);
    }
  }, [isActionConfirmed]);

  // ── KPI counts ──────────────────────────────────────────────────────────

  const kpi = useMemo(() => {
    const counts = { Open: 0, Assigned: 0, 'In Review': 0, Disputed: 0, Completed: 0, Expired: 0, Cancelled: 0 };
    jobs.forEach((j) => counts[j.status]++);
    return counts;
  }, [jobs]);

  // ── Protocol params ─────────────────────────────────────────────────────

  const pp = useMemo(() => {
    if (!protocolRaw) return null;
    const v = (i: number) => {
      const r = protocolRaw[i];
      return r?.status === 'success' ? r.result : undefined;
    };
    return {
      quorum: v(0) as bigint | undefined,
      approvals: v(1) as bigint | undefined,
      disapprovals: v(2) as bigint | undefined,
      reviewPeriod: v(3) as bigint | undefined,
      challengePeriod: v(4) as bigint | undefined,
      disputeReviewPeriod: v(5) as bigint | undefined,
      maxPayout: v(6) as bigint | undefined,
      maxDuration: v(7) as bigint | undefined,
      maxActiveJobs: v(8) as bigint | undefined,
      validatorSlashBps: v(9) as bigint | undefined,
      paused: v(10) as boolean | undefined,
      settlementPaused: v(11) as boolean | undefined,
      agentBondBps: v(12) as bigint | undefined,
      agentBondMin: v(13) as bigint | undefined,
      agentBondMax: v(14) as bigint | undefined,
      validatorBondBps: v(15) as bigint | undefined,
      validatorBondMin: v(16) as bigint | undefined,
      validatorBondMax: v(17) as bigint | undefined,
      validationRewardPct: v(18) as bigint | undefined,
    };
  }, [protocolRaw]);

  // ── Filtered jobs ───────────────────────────────────────────────────────

  const filteredJobs = useMemo(() => {
    let result = statusFilter === 'All' ? jobs : jobs.filter((j) => j.status === statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((j) =>
        (j.specMeta?.name ?? j.specMeta?.properties?.title ?? '').toLowerCase().includes(q) ||
        j.employer.toLowerCase().includes(q) ||
        j.assignedAgent.toLowerCase().includes(q) ||
        j.id.toString().includes(q) ||
        (j.specMeta?.properties?.details ?? '').toLowerCase().includes(q) ||
        (j.specMeta?.properties?.category ?? '').toLowerCase().includes(q)
      );
    }
    return result;
  }, [jobs, statusFilter, searchQuery]);

  // ── Handlers ────────────────────────────────────────────────────────────

  async function handleAcceptTerms() {
    if (!address) return;
    setTermsSigning(true);
    try {
      const termsHash = keccak256(toBytes(TERMS_AND_CONDITIONS));
      const sig = await signMessageAsync({ message: TERMS_MESSAGE(termsHash) });
      storeTermsSig(address, sig);
      setTermsAccepted(true);
      setShowTerms(false);
    } catch {
      // user rejected signature
    } finally {
      setTermsSigning(false);
    }
  }

  function handleRefresh() {
    setRefreshCount(c => c + 1);
  }

  function handleOpenCreateJob() {
    if (!isConnected) return;
    if (!termsAccepted) {
      setShowTerms(true);
    } else {
      setShowCreateJob(true);
    }
  }

  // ── Guard ───────────────────────────────────────────────────────────────

  if (!mounted) return null;

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-heading-invert">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20">

        {/* ═══ Command Header ═══ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-degular text-heading leading-tight">
                AGI Job Manager
              </h1>
              <p className="text-sm sm:text-base tracking-widest uppercase text-text/60 font-mono mt-1">
                Jobs.AGI.eth &middot; On-chain labor protocol
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <WalletButton />
              <button
                onClick={handleRefresh}
                className="p-2 rounded-xl border border-black/10 dark:border-white/10 text-text hover:text-heading hover:border-[#805abe]/30 transition-all duration-300"
                title="Refresh"
              >
                <RefreshCw className="size-4" />
              </button>
            </div>
          </div>

          {/* Getting Started */}
          <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-5 mb-6">
            <h3 className="text-sm font-degular-semibold text-heading mb-3">What to do first</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {([
                { step: '1', text: 'Connect the wallet you want to use on Ethereum Mainnet.' },
                { step: '2', text: 'Verify the ENS subdomain matching your role.' },
                { step: '3', text: 'Read the contract-driven terms and accept them here.' },
                { step: '4', text: 'Use the bond calculator and the economics charts before signing.' },
              ] as const).map((item) => (
                <div key={item.step} className="flex gap-3 items-start">
                  <div className="size-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 bg-white/5 text-text/40">
                    {item.step}
                  </div>
                  <p className="text-xs font-degular leading-relaxed text-text/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleOpenCreateJob}
              disabled={!isConnected}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-degular-medium transition-all duration-300 ${
                isConnected
                  ? 'bg-[#805abe] hover:bg-[#9370cb] text-white'
                  : 'bg-[#805abe]/40 text-white/50 cursor-not-allowed'
              }`}
            >
              <Briefcase className="size-4" />
              Create Job
            </button>
            <button
              onClick={() => document.getElementById('jobs-table')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-text hover:text-heading hover:border-[#805abe]/30 hover:bg-[#805abe]/5 text-sm font-degular-medium transition-all duration-300"
            >
              <Search className="size-4" />
              Browse Jobs
            </button>
            <button
              onClick={() => setProtocolOpen(!protocolOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-text hover:text-heading hover:border-[#805abe]/30 hover:bg-[#805abe]/5 text-sm font-degular-medium transition-all duration-300"
            >
              <Shield className="size-4" />
              Protocol
            </button>
            <button
              onClick={() => setShowTerms(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-degular-medium transition-all duration-300 ${
                termsAccepted
                  ? 'border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/5'
                  : 'border-amber-500/20 text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/10'
              }`}
            >
              <FileCheck className="size-4" />
              {termsAccepted ? 'Terms Accepted' : 'Review Terms'}
            </button>
            <Link
              href="/jobs/bridge"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-text hover:text-heading hover:border-[#805abe]/30 hover:bg-[#805abe]/5 text-sm font-degular-medium transition-all duration-300"
            >
              <ArrowRightLeft className="size-4" />
              Bridge
            </Link>
          </div>
        </motion.div>

        {/* ═══ Readiness Bar ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {/* Status indicators */}
          {[
            {
              label: isConnected ? (ensName ?? `${address?.slice(0,6)}...${address?.slice(-4)}`) : 'Wallet',
              ok: isConnected,
              icon: Wallet,
              onClick: () => {
                if (!isConnected) {
                  const injected = connectors.find(c => c.type === 'injected') ?? connectors[0];
                  if (injected) connect({ connector: injected });
                }
              },
            },
            { label: 'Network', ok: isConnected && onCorrectChain, icon: Globe },
            { label: 'Terms', ok: termsAccepted, icon: FileCheck, onClick: () => setShowTerms(true) },
          ].map((item) => (
            <button
              key={item.label}
              onClick={'onClick' in item ? (item as { onClick: () => void }).onClick : undefined}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-degular-medium transition-all duration-300 ${
                item.ok
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-text/60'
              } ${'onClick' in item ? 'cursor-pointer hover:border-[#805abe]/40 hover:bg-[#805abe]/5' : ''}`}
            >
              <item.icon className="size-3.5" />
              {item.label}
              {item.ok ? <CheckCircle2 className="size-3.5 text-emerald-400" /> : <XCircle className="size-3.5 opacity-30" />}
            </button>
          ))}

          {/* ENS subdomain indicators — auto-detected from subgraph */}
          {isConnected && ([
            { label: 'Agent ENS', value: ensAgent },
            { label: 'Club ENS', value: ensClub },
          ] as const).map((ens) => (
            <div
              key={ens.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-degular-medium transition-all duration-300 ${
                ens.value
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-text/60'
              }`}
            >
              <AtSign className="size-3.5" />
              {ensLoading ? (
                <span className="animate-pulse">Scanning...</span>
              ) : ens.value ? (
                <><CheckCircle2 className="size-3.5 text-emerald-400" /><span>{ens.value}</span></>
              ) : (
                <><XCircle className="size-3.5 opacity-30" /><span>No {ens.label.toLowerCase()}</span></>
              )}
            </div>
          ))}
          {isConnected && !ensLoading && !ensClub && (
            <a
              href="https://montrealai.xyz/club.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#805abe]/30 bg-[#805abe]/10 text-[#805abe] text-xs font-degular-medium hover:bg-[#805abe]/20 transition-all duration-300"
            >
              <Wallet className="size-3.5" />
              Buy Club Domain
            </a>
          )}
        </motion.div>

        {/* ═══ Protocol Pulse — KPI Tiles ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10"
        >
          <h2 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium mb-3">Protocol Pulse</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {([
              { label: 'Open', count: kpi.Open, icon: Briefcase, iconClass: 'text-blue-400', hoverClass: 'hover:border-blue-400/20 hover:bg-blue-400/[0.03]' },
              { label: 'Assigned', count: kpi.Assigned, icon: Clock, iconClass: 'text-amber-400', hoverClass: 'hover:border-amber-400/20 hover:bg-amber-400/[0.03]' },
              { label: 'In Review', count: kpi['In Review'], icon: Eye, iconClass: 'text-cyan-400', hoverClass: 'hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]' },
              { label: 'Disputed', count: kpi.Disputed, icon: AlertTriangle, iconClass: 'text-red-400', hoverClass: 'hover:border-red-400/20 hover:bg-red-400/[0.03]' },
              { label: 'Expired', count: kpi.Expired, icon: Timer, iconClass: 'text-zinc-400', hoverClass: 'hover:border-zinc-400/20 hover:bg-zinc-400/[0.03]' },
              { label: 'Completed', count: kpi.Completed, icon: CheckCircle2, iconClass: 'text-emerald-400', hoverClass: 'hover:border-emerald-400/20 hover:bg-emerald-400/[0.03]' },
            ] as const).map((tile) => (
              <div
                key={tile.label}
                className={`group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-5 transition-all duration-300 cursor-default ${tile.hoverClass}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <tile.icon className={`size-4 ${tile.iconClass}`} />
                  <span className="text-xs text-text/50 font-degular-medium uppercase tracking-wider">{tile.label}</span>
                </div>
                <p className="text-3xl font-degular-bold text-heading tabular-nums">
                  {tile.count}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ Jobs Table ═══ */}
        <motion.div
          id="jobs-table"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium whitespace-nowrap">
                Jobs &middot; {jobs.length} total
              </h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-text/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs..."
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5 bg-white/[0.02] text-xs text-heading font-degular placeholder:text-text/30 focus:outline-none focus:border-[#805abe]/30 transition-colors w-48"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-text/30 hover:text-text/60"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'Open', 'Assigned', 'In Review', 'Disputed', 'Completed', 'Expired', 'Cancelled'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-degular-medium transition-all duration-200 ${
                    statusFilter === s
                      ? 'bg-[#805abe]/20 text-[#805abe] border border-[#805abe]/30'
                      : 'border border-black/5 dark:border-white/5 text-text/50 hover:text-text hover:border-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action error banner (visible when no modal is open) */}
          {!selectedJob && (actionError || actionWriteError) && (
            <div className="mb-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400 font-degular-medium flex items-center justify-between">
              <span>{actionError || decodeRevertReason(actionWriteError)}</span>
              <button onClick={() => { setActionError(null); resetAction(); }} className="text-red-400/60 hover:text-red-400 ml-3 text-xs">dismiss</button>
            </div>
          )}

          <div className="rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden">
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_3fr] gap-4 px-5 py-3 border-b border-black/5 dark:border-white/5 bg-white/[0.01] text-xs text-text/40 uppercase tracking-wider font-degular-medium text-center">
              <span>ID</span>
              <span>Job</span>
              <span>Employer</span>
              <span>Payout</span>
              <span>Duration</span>
              <span>Agent</span>
              <span>Status</span>
              <span>Votes</span>
              <span>Action</span>
            </div>

            {/* Rows */}
            {filteredJobs.length === 0 ? (
              <div className="px-5 py-12 text-center text-text/30 text-sm font-degular">
                {jobsLoading ? 'Loading jobs from chain...' : jobs.length === 0 ? 'No jobs found on-chain' : 'No jobs match this filter'}
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => { setSelectedJob(job); setJobSpec(job.specMeta ?? null); }}
                  className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_3fr] gap-2 lg:gap-4 px-5 py-4 border-b border-black/5 dark:border-white/5 hover:bg-white/[0.03] transition-colors duration-200 cursor-pointer [&>div]:min-w-0"
                >
                  <div className="flex items-center">
                    <span className="text-text/30 text-xs font-mono lg:text-sm">#{job.id}</span>
                  </div>
                  <div className="flex items-center min-w-0">
                    <span className="text-heading text-sm font-degular-medium truncate">
                      {job.specMeta?.name ?? job.specMeta?.properties?.title ?? (job.specMeta === undefined ? <span className="text-text/30 animate-pulse">Loading...</span> : `Job #${job.id}`)}
                    </span>
                  </div>
                  <div className="flex items-center min-w-0">
                    <span className="text-text/60 font-mono text-xs truncate">{shortenAddress(job.employer)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-heading text-sm font-degular-medium">
                      {formatUnits(job.payout, 18)} <span className="text-text/40 text-xs">AGI</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-text text-xs font-mono">{formatDuration(job.duration)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-text font-mono text-xs">{shortenAddress(job.assignedAgent)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-lg border text-xs font-degular-medium ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-mono text-emerald-400">{job.validatorApprovals.toString()}</span>
                    <span className="text-text/20 text-xs">/</span>
                    <span className="text-xs font-mono text-red-400">{job.validatorDisapprovals.toString()}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {(() => {
                      const addr = address?.toLowerCase();
                      const isEmp = addr === job.employer.toLowerCase();
                      const isAgent = addr === job.assignedAgent.toLowerCase();
                      const jobId = BigInt(job.id);
                      const btn = (label: string, colorClass: string, fn: () => void) => (
                        <button
                          key={label}
                          onClick={(e) => { e.stopPropagation(); fn(); }}
                          disabled={isActionPending || isActionConfirming || isApproving || isApproveConfirming}
                          className={`px-2 py-0.5 rounded-md border text-xs font-degular-medium transition-all disabled:opacity-40 ${colorClass}`}
                        >
                          {label}
                        </button>
                      );
                      const btns: React.ReactNode[] = [];
                      if (job.status === 'Open') {
                        const allowance = tokenAllowance as bigint | undefined;
                        const needsApproval = !allowance || allowance === BigInt(0);
                        if (ensAgent) btns.push(btn('Apply', 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20', () => {
                          setActionError(null);
                          if (needsApproval) {
                            setPendingApplyJobId(job.id);
                            approveToken({ address: CONTRACTS.AGIALPHA_OFFICIAL, abi: erc20Abi, functionName: 'approve', args: [CONTRACTS.AGI_JOB_MANAGER, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')] });
                          } else {
                            executeJobAction({ address: CONTRACTS.AGI_JOB_MANAGER, abi: agiJobManagerAbi, functionName: 'applyForJob', args: [jobId, extractSubdomainLabel(ensAgent!), [] as readonly `0x${string}`[]] });
                          }
                        }));
                        if (isEmp) btns.push(btn('Cancel', 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20', () => {
                          setActionError(null);
                          executeJobAction({ address: CONTRACTS.AGI_JOB_MANAGER, abi: agiJobManagerAbi, functionName: 'cancelJob', args: [jobId] });
                        }));
                      }
                      if (job.status === 'Assigned' && isAgent) btns.push(btn('Complete', 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20', () => {
                        setSelectedJob(job); setJobSpec(job.specMeta ?? null);
                      }));
                      if (job.status === 'Assigned') {
                        btns.push(btn('Expire', 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400 hover:bg-zinc-500/20', () => {
                          setActionError(null);
                          executeJobAction({ address: CONTRACTS.AGI_JOB_MANAGER, abi: agiJobManagerAbi, functionName: 'expireJob', args: [jobId] });
                        }));
                      }
                      if (job.status === 'In Review') {
                        if (ensClub) {
                          const rBond = validatorBondFor(job.payout);
                          const bal = tokenBalance as bigint | undefined;
                          const bondStr = formatUnits(rBond, 18);
                          const balStr = bal ? formatUnits(bal, 18) : '0';
                          const checkBond = () => {
                            if (!bal || bal < rBond) {
                              setActionError(`Insufficient balance for validator bond. Need ${bondStr} AGIALPHA, have ${balStr}`);
                              return false;
                            }
                            return true;
                          };
                          btns.push(btn('Approve', 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20', () => {
                            setActionError(null);
                            if (!checkBond()) return;
                            const allowance = tokenAllowance as bigint | undefined;
                            const needsApproval = !allowance || allowance === BigInt(0);
                            if (needsApproval) {
                              approveToken({ address: CONTRACTS.AGIALPHA_OFFICIAL, abi: erc20Abi, functionName: 'approve', args: [CONTRACTS.AGI_JOB_MANAGER, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')] });
                            } else {
                              executeJobAction({ address: CONTRACTS.AGI_JOB_MANAGER, abi: agiJobManagerAbi, functionName: 'validateJob', args: [jobId, extractSubdomainLabel(ensClub!), [] as readonly `0x${string}`[]] });
                            }
                          }));
                          btns.push(btn('Disapprove', 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20', () => {
                            setActionError(null);
                            if (!checkBond()) return;
                            const allowance = tokenAllowance as bigint | undefined;
                            const needsApproval = !allowance || allowance === BigInt(0);
                            if (needsApproval) {
                              approveToken({ address: CONTRACTS.AGIALPHA_OFFICIAL, abi: erc20Abi, functionName: 'approve', args: [CONTRACTS.AGI_JOB_MANAGER, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')] });
                            } else {
                              executeJobAction({ address: CONTRACTS.AGI_JOB_MANAGER, abi: agiJobManagerAbi, functionName: 'disapproveJob', args: [jobId, extractSubdomainLabel(ensClub!), [] as readonly `0x${string}`[]] });
                            }
                          }));
                        }
                        if (isEmp) btns.push(btn('Dispute', 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20', () => {
                          setActionError(null);
                          executeJobAction({ address: CONTRACTS.AGI_JOB_MANAGER, abi: agiJobManagerAbi, functionName: 'disputeJob', args: [jobId] });
                        }));
                        {
                          const CP = 86400;
                          const cAt = Number(job.completionRequestedAt);
                          const nw = Math.floor(Date.now() / 1000);
                          const fAt = cAt + CP;
                          const ready = cAt > 0 && nw >= fAt;
                          const hLeft = Math.ceil((fAt - nw) / 3600);
                          btns.push(btn(ready ? 'Finalize' : `Finalize (${hLeft}h)`, 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20', () => {
                            setActionError(null);
                            if (!ready) {
                              setActionError(`Cannot finalize yet. Challenge period ends ${new Date(fAt * 1000).toLocaleString()} (~${hLeft}h remaining)`);
                              return;
                            }
                            executeJobAction({ address: CONTRACTS.AGI_JOB_MANAGER, abi: agiJobManagerAbi, functionName: 'finalizeJob', args: [jobId] });
                          }));
                        }
                      }
                      return btns.length > 0 ? <div className="flex gap-1">{btns}</div> : <span className="text-text/20 text-xs">—</span>;
                    })()}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* ═══ Lifecycle Guide ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mb-10"
        >
          <h2 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium mb-4">Lifecycle Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {([
              {
                step: '1',
                title: 'Post',
                desc: 'Employer escrows the full payout in $AGIALPHA and publishes a job URI plus optional details.',
                action: 'Create Job → Escrow payout',
                color: 'border-blue-500/20',
                dotColor: 'bg-blue-400',
              },
              {
                step: '2',
                title: 'Apply',
                desc: 'The first eligible agent can apply, provided ENS or allowlist authorization passes and the agent bond can be posted.',
                action: 'Apply → Agent bond + assignment',
                color: 'border-amber-500/20',
                dotColor: 'bg-amber-400',
              },
              {
                step: '3',
                title: 'Complete + Review',
                desc: 'Assigned agent requests completion within the allowed duration; validators can then approve or disapprove during review.',
                action: 'Completion → Review + validator votes',
                color: 'border-cyan-500/20',
                dotColor: 'bg-cyan-400',
              },
              {
                step: '4',
                title: 'Settle',
                desc: 'After challenge/review rules are satisfied, anyone may finalize; otherwise the job can dispute, expire, refund, or complete.',
                action: 'Complete → Dispute / Refund',
                color: 'border-emerald-500/20',
                dotColor: 'bg-emerald-400',
              },
            ] as const).map((stage, i) => (
              <div
                key={stage.step}
                className={`relative rounded-2xl border border-black/5 dark:border-white/5 ${stage.color} bg-white/[0.02] p-5 flex flex-col`}
              >
                {/* Connector arrow (hidden on first and mobile) */}
                {i > 0 && (
                  <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 text-text/20 text-lg">→</div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`size-6 rounded-full ${stage.dotColor} flex items-center justify-center text-[10px] font-bold text-black`}>
                    {stage.step}
                  </div>
                  <span className="text-sm font-degular-semibold text-heading">{stage.title}</span>
                </div>
                <p className="text-xs text-text/60 font-degular leading-relaxed flex-1">{stage.desc}</p>
                <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5">
                  <span className="text-[10px] text-text/30 font-mono">{stage.action}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ Practical Guidance ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.39 }}
          className="mb-10"
        >
          <h2 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium mb-4">Practical Guidance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {([
              {
                title: 'For Employers',
                desc: 'Think of this as an escrow-first workflow. Once a job is created, your payout is locked in the contract. The biggest quality lever is the clarity of the jobSpecURI and acceptance criteria.',
              },
              {
                title: 'For Agents',
                desc: 'Your eligibility and payout share depend on the contract rules. Verify your ENS and understand your bond exposure before racing to apply for open work.',
              },
              {
                title: 'For Validators',
                desc: 'Validator actions are economically meaningful. You are not just clicking approve/disapprove; you are staking a position that can be rewarded or slashed.',
              },
            ] as const).map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-5"
              >
                <h3 className="text-sm font-degular-semibold text-heading mb-2">{card.title}</h3>
                <p className="text-xs text-text/60 font-degular leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ Payout · Validation · Playbook (3-card row) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Payout Composition */}
            <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-sm font-degular-semibold text-heading mb-4">Payout Composition</h3>
              {(() => {
                const validatorPct = pp?.validationRewardPct !== undefined ? Number(pp.validationRewardPct) : 8;
                const agentPct = 0; // Default when no qualifying NFT held
                const retainedPct = 100 - agentPct - validatorPct;
                return (
                  <>
                    <div className="flex items-center gap-5 mb-4">
                      <div className="relative size-24 shrink-0">
                        <svg viewBox="0 0 36 36" className="size-24 -rotate-90">
                          <circle cx="18" cy="18" r="14" fill="none" strokeWidth="4" className="stroke-emerald-500/60" strokeDasharray={`${agentPct * 0.88} 88`} />
                          <circle cx="18" cy="18" r="14" fill="none" strokeWidth="4" className="stroke-cyan-400/60" strokeDasharray={`${validatorPct * 0.88} 88`} strokeDashoffset={`${-agentPct * 0.88}`} />
                          <circle cx="18" cy="18" r="14" fill="none" strokeWidth="4" className="stroke-violet-400/40" strokeDasharray={`${retainedPct * 0.88} 88`} strokeDashoffset={`${-(agentPct + validatorPct) * 0.88}`} />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] text-text/40 font-mono">Current<br />model</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="size-2.5 rounded-full bg-emerald-500/60" />
                            <span className="text-text/70 font-degular">Agent payout</span>
                          </div>
                          <span className="text-heading font-mono text-[11px]">{agentPct}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="size-2.5 rounded-full bg-cyan-400/60" />
                            <span className="text-text/70 font-degular">Validator pool</span>
                          </div>
                          <span className="text-heading font-mono text-[11px]">{validatorPct}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="size-2.5 rounded-full bg-violet-400/40" />
                            <span className="text-text/70 font-degular">Retained remainder</span>
                          </div>
                          <span className="text-heading font-mono text-[11px]">{retainedPct}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Bond rates */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-text/50 font-degular">Agent bond</span>
                        <span className="text-heading font-mono">{pp?.agentBondBps !== undefined ? `${Number(pp.agentBondBps) / 100}%` : '—'}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-text/50 font-degular">Validator bond</span>
                        <span className="text-heading font-mono">{pp?.validatorBondBps !== undefined ? `${Number(pp.validatorBondBps) / 100}%` : '—'}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-text/30 font-degular leading-relaxed mb-4">
                      Bonds are posted as a % of the job payout and returned on successful completion. Slashed on dispute resolution against the bonded party.
                    </p>

                    {/* Bond Calculator */}
                    <div className="border-t border-black/5 dark:border-white/5 pt-4">
                      <h4 className="text-sm font-degular-semibold text-heading mb-2">Bond Calculator</h4>
                      <input
                        type="number"
                        value={calcPayout}
                        onChange={(e) => setCalcPayout(e.target.value)}
                        placeholder="Enter payout amount (AGI)"
                        className="w-full px-3 py-2 rounded-lg border border-black/5 dark:border-white/5 bg-white/[0.02] text-xs text-heading font-mono placeholder:text-text/20 focus:outline-none focus:border-[#805abe]/30 transition-colors mb-3"
                      />
                      {calcPayout && Number(calcPayout) > 0 && (() => {
                        const amt = Number(calcPayout);
                        const agentBond = pp?.agentBondBps !== undefined ? amt * Number(pp.agentBondBps) / 10000 : 0;
                        const valBond = pp?.validatorBondBps !== undefined ? amt * Number(pp.validatorBondBps) / 10000 : 0;
                        const agentPay = amt * agentPct / 100;
                        const valPool = amt * validatorPct / 100;
                        const retained = amt - agentPay - valPool;
                        return (
                          <div className="space-y-1.5 text-[11px]">
                            <div className="flex justify-between"><span className="text-text/50 font-degular">Agent bond</span><span className="text-heading font-mono">{agentBond.toFixed(2)} AGI</span></div>
                            <div className="flex justify-between"><span className="text-text/50 font-degular">Validator bond</span><span className="text-heading font-mono">{valBond.toFixed(2)} AGI</span></div>
                            <div className="h-px bg-white/5 my-1" />
                            <div className="flex justify-between"><span className="text-emerald-400/70 font-degular">Agent payout</span><span className="text-heading font-mono">{agentPay.toFixed(2)} AGI</span></div>
                            <div className="flex justify-between"><span className="text-cyan-400/70 font-degular">Validator pool</span><span className="text-heading font-mono">{valPool.toFixed(2)} AGI</span></div>
                            <div className="flex justify-between"><span className="text-violet-400/70 font-degular">Retained</span><span className="text-heading font-mono">{retained.toFixed(2)} AGI</span></div>
                          </div>
                        );
                      })()}
                    </div>

                    <p className="text-[11px] text-text/40 font-degular leading-relaxed mt-4">
                      The exact agent payout is snapshotted at assignment time from the highest eligible AGI type held by the applying agent.
                    </p>
                  </>
                );
              })()}
            </div>

            {/* Validation Pressure */}
            <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-sm font-degular-semibold text-heading mb-4">Validation Pressure</h3>
              <div className="space-y-3">
                {([
                  { label: 'Approvals threshold', value: pp?.approvals, max: 10, color: 'bg-emerald-400', display: pp?.approvals?.toString() },
                  { label: 'Disapprovals threshold', value: pp?.disapprovals, max: 10, color: 'bg-red-400', display: pp?.disapprovals?.toString() },
                  { label: 'Vote quorum', value: pp?.quorum, max: 10, color: 'bg-cyan-400', display: pp?.quorum?.toString() },
                  { label: 'Validator slash', value: pp?.validatorSlashBps !== undefined ? Number(pp.validatorSlashBps) / 1000 : undefined, max: 10, color: 'bg-amber-400', display: pp?.validatorSlashBps !== undefined ? `${Number(pp.validatorSlashBps) / 100}%` : undefined },
                ] as const).map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-text/50 font-degular">{bar.label}</span>
                      <span className="text-[11px] text-heading font-mono">{bar.display ?? '—'}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${bar.color} transition-all duration-700`}
                        style={{ width: bar.value !== undefined ? `${Math.min(Number(bar.value) / bar.max * 100, 100)}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-text/40 font-degular leading-relaxed">
                Higher validator thresholds and higher quorum reduce low-participation outcomes, but they also increase the chance of forced disputes if validators do not show up.
              </p>
            </div>

            {/* Role Playbook */}
            <RolePlaybook />
          </div>
        </motion.div>

        {/* ═══ Wallet Balance ═══ */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium mb-3">Your Wallet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-5">
                <span className="text-xs text-text/40 uppercase tracking-wider font-degular-medium">$AGIALPHA (Official)</span>
                <p className="text-2xl font-degular-bold text-heading mt-1 tabular-nums">
                  {tokenBalance !== undefined ? formatUnits(tokenBalance as bigint, 18) : '—'}
                </p>
              </div>
              <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-5">
                <span className="text-xs text-text/40 uppercase tracking-wider font-degular-medium">$AGIALPHA (Bridged)</span>
                <p className="text-2xl font-degular-bold text-heading mt-1 tabular-nums">
                  {tokenBalanceBridged !== undefined ? Number(formatUnits(tokenBalanceBridged as bigint, 6)).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—'}
                </p>
              </div>
              <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-5">
                <span className="text-xs text-text/40 uppercase tracking-wider font-degular-medium">Contract Allowance</span>
                <p className="text-2xl font-degular-bold text-heading mt-1 tabular-nums">
                  {tokenAllowance !== undefined ? ((tokenAllowance as bigint) >= BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') ? '∞' : formatUnits(tokenAllowance as bigint, 18)) : '—'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ Protocol Parameters (collapsible) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-10"
        >
          <button
            onClick={() => setProtocolOpen(!protocolOpen)}
            className="flex items-center gap-2 w-full text-left mb-3"
          >
            <h2 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium">Protocol Parameters</h2>
            {protocolOpen ? <ChevronUp className="size-3 text-text/40" /> : <ChevronDown className="size-3 text-text/40" />}
          </button>
          <AnimatePresence>
            {protocolOpen && pp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-6">
                    {([
                      ['Vote Quorum', pp.quorum],
                      ['Required Approvals', pp.approvals],
                      ['Required Disapprovals', pp.disapprovals],
                      ['Completion Review', pp.reviewPeriod !== undefined ? formatDuration(pp.reviewPeriod) : '—'],
                      ['Challenge Period', pp.challengePeriod !== undefined ? formatDuration(pp.challengePeriod) : '—'],
                      ['Dispute Review', pp.disputeReviewPeriod !== undefined ? formatDuration(pp.disputeReviewPeriod) : '—'],
                      ['Max Active Jobs', pp.maxActiveJobs],
                      ['Max Payout', pp.maxPayout !== undefined ? `${formatUnits(pp.maxPayout, 18)} AGI` : '—'],
                      ['Duration Limit', pp.maxDuration !== undefined ? formatDuration(pp.maxDuration) : '—'],
                      ['Validation Reward', pp.validationRewardPct !== undefined ? `${Number(pp.validationRewardPct)}%` : '—'],
                      ['Agent Bond', pp.agentBondBps !== undefined ? `${Number(pp.agentBondBps) / 100}%` : '—'],
                      ['Agent Bond Min', pp.agentBondMin !== undefined ? `${formatUnits(pp.agentBondMin, 18)} AGI` : '—'],
                      ['Agent Bond Max', pp.agentBondMax !== undefined ? `${formatUnits(pp.agentBondMax, 18)} AGI` : '—'],
                      ['Validator Bond', pp.validatorBondBps !== undefined ? `${Number(pp.validatorBondBps) / 100}%` : '—'],
                      ['Validator Bond Min', pp.validatorBondMin !== undefined ? `${formatUnits(pp.validatorBondMin, 18)} AGI` : '—'],
                      ['Validator Bond Max', pp.validatorBondMax !== undefined ? `${formatUnits(pp.validatorBondMax, 18)} AGI` : '—'],
                      ['Validator Slash', pp.validatorSlashBps !== undefined ? `${Number(pp.validatorSlashBps) / 100}%` : '—'],
                    ] as const).map(([label, value]) => (
                      <div key={label as string}>
                        <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">{label as string}</span>
                        <p className="text-sm font-degular-medium text-heading mt-0.5 tabular-nums">{value?.toString() ?? '—'}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${pp.paused ? 'bg-red-400' : 'bg-emerald-400'}`} />
                      <span className="text-xs text-text/50 font-degular-medium">Contract {pp.paused ? 'Paused' : 'Active'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${pp.settlementPaused ? 'bg-red-400' : 'bg-emerald-400'}`} />
                      <span className="text-xs text-text/50 font-degular-medium">Settlement {pp.settlementPaused ? 'Paused' : 'Active'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ═══ Contract Addresses ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium mb-3">Contracts</h2>
          <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-5">
            <div className="space-y-2">
              {[
                { label: 'AGIJobManager', addr: CONTRACTS.AGI_JOB_MANAGER, chain: 'eth' as const },
                { label: '$AGIALPHA (Official)', addr: CONTRACTS.AGIALPHA_OFFICIAL, chain: 'eth' as const },
                { label: '$AGIALPHA (Bridged)', addr: CONTRACTS.AGIALPHA_BRIDGED, chain: 'eth' as const },
                { label: 'Minter Vault', addr: CONTRACTS.MINTER_VAULT, chain: 'eth' as const },
                { label: '$AGIALPHA (Solana)', addr: CONTRACTS.AGIALPHA_SOLANA, chain: 'sol' as const },
              ].map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium w-36 shrink-0">{item.label}</span>
                  <a
                    href={item.chain === 'sol' ? `https://solscan.io/token/${item.addr}` : `https://etherscan.io/address/${item.addr}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-text hover:text-[#805abe] transition-colors duration-200 truncate"
                  >
                    {item.addr}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ═══ Contact & Legal ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mb-10"
        >
          <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-6">
            <h3 className="text-sm font-degular-semibold text-heading mb-2">Contact &amp; Legal</h3>
            <p className="text-xs text-text/50 font-degular leading-relaxed mb-3">
              The full Terms &amp; Conditions are embedded above for easier reading. This footer keeps the public contact and external legal reference links handy.
            </p>
            <div className="space-y-1 text-xs font-degular">
              <div>
                <span className="text-text/40">Contact: </span>
                <a href="mailto:secretariat@montreal.ai" className="text-[#805abe] hover:text-[#9370cb] transition-colors">secretariat@montreal.ai</a>
              </div>
              <div>
                <span className="text-text/40">Terms: </span>
                <a href="https://agialphaagent.com" target="_blank" rel="noopener noreferrer" className="text-[#805abe] hover:text-[#9370cb] transition-colors">agialphaagent.com</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══ Job Detail Modal ═══ */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            onClick={() => setSelectedJob(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/10 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-lg border text-xs font-degular-medium shrink-0 ${statusColors[selectedJob.status]}`}>
                    {selectedJob.status}
                  </span>
                  <h2 className="text-lg font-bold font-degular text-heading truncate">
                    {jobSpec?.name ?? jobSpec?.properties?.title ?? `Job #${selectedJob.id}`}
                  </h2>
                </div>
                <button onClick={() => setSelectedJob(null)} className="text-text hover:text-heading transition-colors shrink-0 ml-3">
                  <X className="size-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 min-h-0 space-y-5" onWheel={(e) => e.stopPropagation()}>
                {/* Image */}
                {jobSpec?.image && (
                  <div className="rounded-xl overflow-hidden border border-black/5 dark:border-white/5">
                    <img src={ipfsToHttp(jobSpec.image)} alt="" className="w-full max-h-64 object-cover" />
                  </div>
                )}

                {/* Category */}
                {jobSpec?.properties?.category && (
                  <span className="inline-flex px-2.5 py-1 rounded-lg bg-[#805abe]/10 text-[#805abe] text-xs font-degular-medium border border-[#805abe]/20">
                    {jobSpec.properties.category}
                  </span>
                )}

                {/* Description */}
                {(jobSpec?.description || jobSpec?.properties?.summary) && (
                  <p className="text-sm text-text/80 font-degular leading-relaxed">
                    {jobSpec.properties?.summary ?? jobSpec.description}
                  </p>
                )}

                {/* On-chain data grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Payout</span>
                    <p className="text-sm font-degular-medium text-heading mt-0.5">{formatUnits(selectedJob.payout, 18)} AGI</p>
                  </div>
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Duration</span>
                    <p className="text-sm font-degular-medium text-heading mt-0.5">{formatDuration(selectedJob.duration)}</p>
                  </div>
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Employer</span>
                    <p className="text-sm font-mono text-heading mt-0.5">{shortenAddress(selectedJob.employer)}</p>
                  </div>
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Agent</span>
                    <p className="text-sm font-mono text-heading mt-0.5">{shortenAddress(selectedJob.assignedAgent)}</p>
                  </div>
                </div>

                {/* Validation */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3 text-center">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Approvals</span>
                    <p className="text-lg font-degular-bold text-emerald-400 mt-0.5">{selectedJob.validatorApprovals.toString()}</p>
                  </div>
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3 text-center">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Disapprovals</span>
                    <p className="text-lg font-degular-bold text-red-400 mt-0.5">{selectedJob.validatorDisapprovals.toString()}</p>
                  </div>
                  <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-3 text-center">
                    <span className="text-[10px] text-text/30 uppercase tracking-wider font-degular-medium">Validators</span>
                    <p className="text-lg font-degular-bold text-cyan-400 mt-0.5">{selectedJob.validatorCount.toString()}</p>
                  </div>
                </div>

                {/* Validator Addresses */}
                {(validatorsLoading || validators.length > 0) && (
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium mb-2">Validator Addresses</h3>
                    {validatorsLoading ? (
                      <p className="text-xs text-text/40 font-degular animate-pulse">Scanning chain for validator events...</p>
                    ) : (
                      <ul className="space-y-1.5">
                        {validators.map((v, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-mono text-text/60">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-degular-medium border ${
                              v.type === 'approved'
                                ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                                : 'text-red-400 bg-red-400/10 border-red-400/20'
                            }`}>
                              {v.type === 'approved' ? <CheckCircle2 className="size-2.5" /> : <XCircle className="size-2.5" />}
                              {v.type === 'approved' ? 'Approved' : 'Disapproved'}
                            </span>
                            <a
                              href={`https://etherscan.io/address/${v.address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[#805abe] transition-colors"
                            >
                              {v.address}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Deliverables */}
                {jobSpec?.properties?.deliverables && jobSpec.properties.deliverables.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium mb-2">Deliverables</h3>
                    <ul className="space-y-1.5">
                      {jobSpec.properties.deliverables.map((d, i) => (
                        <li key={i} className="flex gap-2 text-xs text-text/60 font-degular leading-relaxed">
                          <span className="text-[#805abe] mt-px">•</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Acceptance Criteria */}
                {jobSpec?.properties?.acceptanceCriteria && jobSpec.properties.acceptanceCriteria.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium mb-2">Acceptance Criteria</h3>
                    <ul className="space-y-1.5">
                      {jobSpec.properties.acceptanceCriteria.map((c, i) => (
                        <li key={i} className="flex gap-2 text-xs text-text/60 font-degular leading-relaxed">
                          <CheckCircle2 className="size-3 text-emerald-400 mt-0.5 shrink-0" />{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {jobSpec?.properties?.requirements && jobSpec.properties.requirements.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-text/40 font-degular-medium mb-2">Requirements</h3>
                    <ul className="space-y-1.5">
                      {jobSpec.properties.requirements.map((r, i) => (
                        <li key={i} className="flex gap-2 text-xs text-text/60 font-degular leading-relaxed">
                          <Shield className="size-3 text-amber-400 mt-0.5 shrink-0" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {jobSpec?.properties?.tags && jobSpec.properties.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {jobSpec.properties.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-[#805abe]/10 border border-[#805abe]/20 text-[#805abe] text-[10px] font-degular-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                  {selectedJob.specURI && (
                    <a
                      href={ipfsToHttp(selectedJob.specURI)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs text-text/60 hover:text-[#805abe] hover:border-[#805abe]/30 transition-all"
                    >
                      <ExternalLink className="size-3" />Spec URI
                    </a>
                  )}
                  {selectedJob.completionURI && (
                    <a
                      href={ipfsToHttp(selectedJob.completionURI)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs text-text/60 hover:text-[#805abe] hover:border-[#805abe]/30 transition-all"
                    >
                      <ExternalLink className="size-3" />Completion URI
                    </a>
                  )}
                  <a
                    href={`https://etherscan.io/address/${CONTRACTS.AGI_JOB_MANAGER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs text-text/60 hover:text-[#805abe] hover:border-[#805abe]/30 transition-all"
                  >
                    <ExternalLink className="size-3" />Etherscan
                  </a>
                </div>
              </div>

              {/* ── Action Footer ── */}
              {isConnected && availableActions.length > 0 && (
                <div className="border-t border-black/10 dark:border-white/10 px-6 py-4 shrink-0 space-y-3">
                  {/* Completion URI input — only for requestCompletion */}
                  {availableActions.some(a => a.needsCompletionURI) && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={completionURIInput}
                        onChange={(e) => setCompletionURIInput(e.target.value)}
                        placeholder="Completion URI (IPFS or https)"
                        className="flex-1 px-3 py-2 rounded-lg border border-black/5 dark:border-white/5 bg-white/[0.02] text-xs text-heading font-mono placeholder:text-text/20 focus:outline-none focus:border-[#805abe]/30 transition-colors"
                      />
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    {availableActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.label}
                          onClick={action.execute}
                          disabled={isActionPending || isActionConfirming || isApproving || isApproveConfirming}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-degular-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${action.colorClass}`}
                        >
                          <Icon className="size-3.5" />
                          {action.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Transaction status */}
                  {isActionPending && (
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-degular-medium">
                      <Loader2 className="size-3.5 animate-spin" />
                      Confirm in wallet...
                    </div>
                  )}
                  {isActionConfirming && (
                    <div className="flex items-center gap-2 text-xs text-cyan-400 font-degular-medium">
                      <Loader2 className="size-3.5 animate-spin" />
                      Waiting for confirmation...
                    </div>
                  )}
                  {isActionConfirmed && actionTxHash && (
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-degular-medium">
                      <CheckCircle2 className="size-3.5" />
                      Transaction confirmed!
                      <a
                        href={`https://etherscan.io/tx/${actionTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-emerald-300 transition-colors"
                      >
                        View on Etherscan
                      </a>
                    </div>
                  )}

                  {/* Error display */}
                  {(actionError || actionWriteError) && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400 font-degular-medium">
                      {actionError || decodeRevertReason(actionWriteError)}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Create Job Builder ═══ */}
      <AnimatePresence>
        <CreateJobBuilder open={showCreateJob} onClose={() => setShowCreateJob(false)} />
      </AnimatePresence>

      {/* ═══ Terms Modal ═══ */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            onClick={() => setShowTerms(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-black/10 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <FileCheck className="size-5 text-[#805abe]" />
                  <h2 className="text-lg font-bold font-degular text-heading">Terms &amp; Conditions</h2>
                </div>
                <button onClick={() => setShowTerms(false)} className="text-text hover:text-heading transition-colors">
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-8 py-6 min-h-0" onWheel={(e) => e.stopPropagation()}>
                <pre className="whitespace-pre-wrap text-xs sm:text-sm text-text font-mono leading-relaxed">
                  {TERMS_AND_CONDITIONS}
                </pre>
              </div>

              <div className="px-8 py-6 border-t border-black/10 dark:border-white/10 shrink-0 space-y-3">
                {!isConnected && (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-amber-400 text-xs font-degular-medium">
                    Connect your wallet to sign and accept terms.
                  </div>
                )}
                {termsAccepted && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-emerald-400 text-xs font-degular-medium flex items-center gap-2">
                    <CheckCircle2 className="size-4" />
                    Terms signed by {address?.slice(0, 6)}...{address?.slice(-4)}
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowTerms(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-text hover:text-heading font-degular-medium text-sm transition-colors duration-300"
                  >
                    {termsAccepted ? 'Close' : 'Decline'}
                  </button>
                  {!termsAccepted && (
                    <button
                      onClick={handleAcceptTerms}
                      disabled={!isConnected || termsSigning}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#805abe] hover:bg-[#9370cb] text-white font-degular-medium text-sm transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {termsSigning ? (
                        <>
                          <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sign in wallet...
                        </>
                      ) : (
                        'Sign & Accept'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
