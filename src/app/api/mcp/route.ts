import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';
import { createPublicClient, http, formatUnits } from 'viem';
import { mainnet } from 'viem/chains';

// ── Viem client ──────────────────────────────────────────────────────────────

const client = createPublicClient({
  chain: mainnet,
  transport: http('https://dawn-black-breeze.quiknode.pro/7b4b95c9661170c630aa301578da9ac7efb81079/'),
});

// ── Contract constants ───────────────────────────────────────────────────────

const JOB_MANAGER = '0xB3AAeb69b630f0299791679c063d68d6687481d1' as const;
const AGIALPHA = '0xa61a3b3a130a9c20768eebf97e21515a6046a1fa' as const;

const jobManagerAbi = [
  { type: 'function', name: 'nextJobId', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'requiredValidatorApprovals', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'requiredValidatorDisapprovals', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'voteQuorum', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'completionReviewPeriod', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'disputeReviewPeriod', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'challengePeriodAfterApproval', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'maxJobPayout', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'jobDurationLimit', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'maxActiveJobsPerAgent', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'agentBondBps', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'validatorBondBps', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'validatorBondMin', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'validationRewardPercentage', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'reputation', inputs: [{ name: '', type: 'address' }], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  {
    type: 'function', name: 'getJobCore', inputs: [{ name: 'jobId', type: 'uint256' }],
    outputs: [
      { name: 'employer', type: 'address' },
      { name: 'assignedAgent', type: 'address' },
      { name: 'payout', type: 'uint256' },
      { name: 'duration', type: 'uint256' },
      { name: 'assignedAt', type: 'uint256' },
      { name: 'completed', type: 'bool' },
      { name: 'disputed', type: 'bool' },
      { name: 'expired', type: 'bool' },
      { name: 'agentPayoutPct', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function', name: 'getJobValidation', inputs: [{ name: 'jobId', type: 'uint256' }],
    outputs: [
      { name: 'completionRequested', type: 'bool' },
      { name: 'validatorApprovals', type: 'uint256' },
      { name: 'validatorDisapprovals', type: 'uint256' },
      { name: 'completionRequestedAt', type: 'uint256' },
      { name: 'disputedAt', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  { type: 'function', name: 'getJobSpecURI', inputs: [{ name: 'jobId', type: 'uint256' }], outputs: [{ name: '', type: 'string' }], stateMutability: 'view' },
  { type: 'function', name: 'getJobCompletionURI', inputs: [{ name: 'jobId', type: 'uint256' }], outputs: [{ name: '', type: 'string' }], stateMutability: 'view' },
] as const;

const erc20Abi = [
  { type: 'function', name: 'balanceOf', inputs: [{ name: 'account', type: 'address' }], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
] as const;

// ── Helpers ──────────────────────────────────────────────────────────────────

const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

function deriveStatus(core: any, validation: any): string {
  if (core.expired) return 'Expired';
  if (core.completed) {
    return validation.validatorDisapprovals > validation.validatorApprovals ? 'Disputed' : 'Completed';
  }
  if (core.disputed) return 'Disputed';
  if (validation.completionRequested) return 'In Review';
  if (core.assignedAgent !== ZERO_ADDR) return 'Assigned';
  return 'Open';
}

// ── MCP Handler ──────────────────────────────────────────────────────────────

const handler = createMcpHandler(
  (server) => {

    // ── Protocol Info ──
    server.tool(
      'get_protocol_info',
      'Get AGI Alpha protocol information: contract addresses, parameters, token details, and links',
      {},
      async () => {
        const [
          nextJobId, requiredApprovals, requiredDisapprovals, quorum,
          completionReview, disputeReview, challengePeriod,
          maxPayout, durationLimit, maxActiveJobs,
          agentBond, validatorBond, validatorBondMin, validationReward,
        ] = await Promise.all([
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'nextJobId' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'requiredValidatorApprovals' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'requiredValidatorDisapprovals' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'voteQuorum' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'completionReviewPeriod' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'disputeReviewPeriod' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'challengePeriodAfterApproval' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'maxJobPayout' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'jobDurationLimit' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'maxActiveJobsPerAgent' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'agentBondBps' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'validatorBondBps' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'validatorBondMin' }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'validationRewardPercentage' }),
        ]);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              protocol: 'AGI Alpha',
              description: 'Decentralized labor market for autonomous AI agents on Ethereum',
              website: 'https://agialpha.com',
              jobsBoard: 'https://agialpha.com/jobs',
              contracts: {
                AGIJobManager: JOB_MANAGER,
                AGIALPHA_official: AGIALPHA,
                AGIALPHA_bridged: '0x2e8Fb54C3eC41F55F06C1F082C081a609EaA4ebe',
                MinterVault: '0x27d6fe8668c6f652ac26ffae020d949f03af80d8',
                ENS_NameWrapper: '0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401',
              },
              token: {
                symbol: 'AGIALPHA',
                decimals: 18,
                solana: 'tWKHzXd5PRmxTF5cMfJkm2Ua3TcjwNNoSRUqx6Apump',
              },
              parameters: {
                totalJobs: Number(nextJobId),
                requiredApprovals: Number(requiredApprovals),
                requiredDisapprovals: Number(requiredDisapprovals),
                voteQuorum: Number(quorum),
                completionReviewPeriod: `${Number(completionReview) / 86400} days`,
                disputeReviewPeriod: `${Number(disputeReview) / 86400} days`,
                challengePeriod: `${Number(challengePeriod) / 86400} days`,
                maxJobPayout: `${formatUnits(maxPayout as bigint, 18)} AGIALPHA`,
                jobDurationLimit: `${Number(durationLimit) / 86400} days`,
                maxActiveJobsPerAgent: Number(maxActiveJobs),
                agentBondBps: Number(agentBond),
                validatorBondBps: Number(validatorBond),
                validatorBondMin: `${formatUnits(validatorBondMin as bigint, 18)} AGIALPHA`,
                validationRewardPercentage: `${Number(validationReward)}%`,
              },
              ens: {
                agentSubdomains: ['name.agent.agi.eth', 'name.alpha.agent.agi.eth'],
                validatorSubdomains: ['name.club.agi.eth', 'name.alpha.club.agi.eth'],
              },
            }, null, 2),
          }],
        };
      },
    );

    // ── List Jobs ──
    server.tool(
      'list_jobs',
      'List all jobs on the AGI Alpha job board with their current status. Returns job IDs, employers, agents, payouts, status, and vote counts.',
      {},
      async () => {
        const nextJobId = await client.readContract({
          address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'nextJobId',
        }) as bigint;

        const total = Number(nextJobId);
        if (total === 0) {
          return { content: [{ type: 'text', text: 'No jobs have been created yet.' }] };
        }

        const jobs = [];
        for (let i = 0; i < total; i++) {
          const [core, validation, specURI] = await Promise.all([
            client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobCore', args: [BigInt(i)] }),
            client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobValidation', args: [BigInt(i)] }),
            client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobSpecURI', args: [BigInt(i)] }),
          ]);

          const c = core as any;
          const v = validation as any;

          jobs.push({
            jobId: i,
            status: deriveStatus(c, v),
            employer: c.employer,
            assignedAgent: c.assignedAgent === ZERO_ADDR ? null : c.assignedAgent,
            payout: `${formatUnits(c.payout, 18)} AGIALPHA`,
            duration: `${Number(c.duration) / 86400} days`,
            specURI,
            approvals: Number(v.validatorApprovals),
            disapprovals: Number(v.validatorDisapprovals),
            completionRequested: v.completionRequested,
          });
        }

        return {
          content: [{ type: 'text', text: JSON.stringify(jobs, null, 2) }],
        };
      },
    );

    // ── Get Job Details ──
    server.tool(
      'get_job',
      'Get detailed information about a specific job by its ID, including employer, agent, payout, status, validation state, and metadata URIs',
      { jobId: z.number().int().min(0).describe('The job ID to look up') },
      async ({ jobId }) => {
        const [core, validation, specURI, completionURI] = await Promise.all([
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobCore', args: [BigInt(jobId)] }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobValidation', args: [BigInt(jobId)] }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobSpecURI', args: [BigInt(jobId)] }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobCompletionURI', args: [BigInt(jobId)] }),
        ]);

        const c = core as any;
        const v = validation as any;

        const result = {
          jobId,
          status: deriveStatus(c, v),
          employer: c.employer,
          assignedAgent: c.assignedAgent === ZERO_ADDR ? null : c.assignedAgent,
          payout: `${formatUnits(c.payout, 18)} AGIALPHA`,
          payoutRaw: c.payout.toString(),
          duration: `${Number(c.duration) / 86400} days`,
          assignedAt: c.assignedAt > 0n ? new Date(Number(c.assignedAt) * 1000).toISOString() : null,
          agentPayoutPercentage: Number(c.agentPayoutPct),
          completed: c.completed,
          disputed: c.disputed,
          expired: c.expired,
          validation: {
            completionRequested: v.completionRequested,
            approvals: Number(v.validatorApprovals),
            disapprovals: Number(v.validatorDisapprovals),
            completionRequestedAt: v.completionRequestedAt > 0n
              ? new Date(Number(v.completionRequestedAt) * 1000).toISOString() : null,
            disputedAt: v.disputedAt > 0n
              ? new Date(Number(v.disputedAt) * 1000).toISOString() : null,
          },
          specURI,
          completionURI: completionURI || null,
          links: {
            jobPage: `https://agialpha.com/jobs`,
            contract: `https://etherscan.io/address/${JOB_MANAGER}`,
          },
        };

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    // ── Get Agent Reputation ──
    server.tool(
      'get_agent_reputation',
      'Check the on-chain reputation score of an agent address',
      { address: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe('Ethereum address of the agent') },
      async ({ address }) => {
        const [rep, balance] = await Promise.all([
          client.readContract({
            address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'reputation',
            args: [address as `0x${string}`],
          }),
          client.readContract({
            address: AGIALPHA, abi: erc20Abi, functionName: 'balanceOf',
            args: [address as `0x${string}`],
          }),
        ]);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              address,
              reputation: Number(rep),
              agialphaBalance: `${formatUnits(balance as bigint, 18)} AGIALPHA`,
            }, null, 2),
          }],
        };
      },
    );

    // ── Fetch IPFS Metadata ──
    server.tool(
      'fetch_job_metadata',
      'Fetch and return the IPFS metadata (job spec or completion) for a given job ID',
      { jobId: z.number().int().min(0).describe('The job ID'), type: z.enum(['spec', 'completion']).describe('Whether to fetch the job spec or completion metadata') },
      async ({ jobId, type }) => {
        const uri = await client.readContract({
          address: JOB_MANAGER, abi: jobManagerAbi,
          functionName: type === 'spec' ? 'getJobSpecURI' : 'getJobCompletionURI',
          args: [BigInt(jobId)],
        }) as string;

        if (!uri) {
          return { content: [{ type: 'text', text: `No ${type} URI found for job ${jobId}.` }] };
        }

        const gateway = uri.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
        try {
          const res = await fetch(gateway, { signal: AbortSignal.timeout(10000) });
          const json = await res.json();
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({ uri, metadata: json }, null, 2),
            }],
          };
        } catch {
          return {
            content: [{ type: 'text', text: JSON.stringify({ uri, error: 'Failed to fetch from IPFS gateway' }) }],
          };
        }
      },
    );

  },
  {
    name: 'agi-alpha',
    version: '1.0.0',
  },
  { basePath: '/api' },
);

export { handler as GET, handler as POST, handler as DELETE };
