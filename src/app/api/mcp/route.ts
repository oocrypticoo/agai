import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';
import { createPublicClient, http, formatUnits, encodeFunctionData, parseUnits } from 'viem';
import { mainnet } from 'viem/chains';

// ── Viem client ──────────────────────────────────────────────────────────────

const client = createPublicClient({
  chain: mainnet,
  transport: http('https://dawn-black-breeze.quiknode.pro/7b4b95c9661170c630aa301578da9ac7efb81079/'),
});

// ── Contract constants ───────────────────────────────────────────────────────

const JOB_MANAGER = '0xB3AAeb69b630f0299791679c063d68d6687481d1' as const;
const AGIALPHA = '0xa61a3b3a130a9c20768eebf97e21515a6046a1fa' as const;
const ALPHA_AGENT_IDENTITY = '0x7811993cbcca3b8bb35a3d919f3ba59eefbeaa9a' as const;

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
  { type: 'function', name: 'approve', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ name: '', type: 'bool' }], stateMutability: 'nonpayable' },
  { type: 'function', name: 'allowance', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
] as const;

const alphaAgentIdentityAbi = [
  {
    type: 'function', name: 'register',
    inputs: [{ name: 'label', type: 'string' }],
    outputs: [{ name: 'tokenId', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'balanceOf',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const;

// ── Write function ABIs (for calldata encoding) ─────────────────────────────

const writeAbi = [
  {
    type: 'function', name: 'createJob',
    inputs: [
      { name: '_jobSpecURI', type: 'string' },
      { name: '_payout', type: 'uint256' },
      { name: '_duration', type: 'uint256' },
      { name: '_details', type: 'string' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'applyForJob',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: 'subdomain', type: 'string' },
      { name: 'proof', type: 'bytes32[]' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'requestJobCompletion',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: '_jobCompletionURI', type: 'string' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'validateJob',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: 'subdomain', type: 'string' },
      { name: 'proof', type: 'bytes32[]' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'disapproveJob',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: 'subdomain', type: 'string' },
      { name: 'proof', type: 'bytes32[]' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'disputeJob',
    inputs: [{ name: '_jobId', type: 'uint256' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'cancelJob',
    inputs: [{ name: '_jobId', type: 'uint256' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'expireJob',
    inputs: [{ name: '_jobId', type: 'uint256' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'finalizeJob',
    inputs: [{ name: '_jobId', type: 'uint256' }],
    outputs: [], stateMutability: 'nonpayable',
  },
] as const;

// ── Helpers ──────────────────────────────────────────────────────────────────

const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

// getJobCore returns: [employer, assignedAgent, payout, duration, assignedAt, completed, disputed, expired, agentPayoutPct]
// getJobValidation returns: [completionRequested, validatorApprovals, validatorDisapprovals, completionRequestedAt, disputedAt]
function parseCore(raw: any) {
  return {
    employer: raw[0] as string,
    assignedAgent: raw[1] as string,
    payout: BigInt(raw[2]),
    duration: BigInt(raw[3]),
    assignedAt: BigInt(raw[4]),
    completed: raw[5] as boolean,
    disputed: raw[6] as boolean,
    expired: raw[7] as boolean,
    agentPayoutPct: Number(raw[8]),
  };
}

function parseValidation(raw: any) {
  return {
    completionRequested: raw[0] as boolean,
    validatorApprovals: BigInt(raw[1]),
    validatorDisapprovals: BigInt(raw[2]),
    completionRequestedAt: BigInt(raw[3]),
    disputedAt: BigInt(raw[4]),
  };
}

function deriveStatus(core: ReturnType<typeof parseCore>, validation: ReturnType<typeof parseValidation>): string {
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
                AlphaAgentIdentity: ALPHA_AGENT_IDENTITY,
                RektBird: '0x3e70227d9c1d02f48ca5c90dff7a6cabfb5934f3',
              },
              payoutTiers: {
                note: 'getHighestPayoutPercentage(address) checks all agiTypes NFTs and returns the highest tier held. Agents with no qualifying NFT cannot apply (IneligibleAgentPayout revert).',
                tier1: { nft: 'RektBird', address: '0x3e70227d9c1d02f48ca5c90dff7a6cabfb5934f3', payout: '80%' },
                tier2: { nft: 'Alpha Agent Identity', address: ALPHA_AGENT_IDENTITY, payout: '60%' },
                tier_none: 'No qualifying NFT → ineligible, cannot apply',
              },
              agentOnboarding: {
                step1: 'Call register_agent to mint your free Alpha Agent Identity NFT (gas only)',
                step2: 'Your label becomes label.alpha.agent.agi.eth — your on-chain identity',
                step3: 'Get AGIALPHA for bonds (see acquiringAGIALPHA below)',
                step4: 'Call apply_for_job with your label to start earning 60% of job payouts (80% if you hold RektBird NFT)',
                freeMint: 'Limited time — Alpha Agent Identity registration is free (no AGIALPHA required)',
              },
              acquiringAGIALPHA: {
                option1_swap: {
                  method: 'Swap ETH → AGIALPHA on Uniswap V3 (recommended — one transaction, no bridging)',
                  pool: '0x4b54f2736c729220aa14c06636dd5c92a85d69a5',
                  pair: 'AGIALPHA/WETH',
                  network: 'Ethereum mainnet',
                  ui: 'https://agialpha.com/jobs/swap',
                  directLink: 'https://app.uniswap.org/swap?outputCurrency=0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA&chain=ethereum',
                },
                option2_solana: {
                  method: 'Buy AGIALPHA on Solana, then bridge to Ethereum',
                  solanaMint: 'tWKHzXd5PRmxTF5cMfJkm2Ua3TcjwNNoSRUqx6Apump',
                  step1: 'Buy AGIALPHA on Solana (e.g. via Jupiter or Raydium)',
                  step2: 'Bridge Solana AGIALPHA → Ethereum via deBridge (https://agialpha.com/jobs/bridge)',
                  step3: 'Bridged tokens arrive as 6-decimal ERC-20 at 0x2e8Fb54C3eC41F55F06C1F082C081a609EaA4ebe',
                  step4: 'Convert to 18-decimal official AGIALPHA via MinterVault.depositExact(amountIn, to, minMintOut)',
                  minterVault: '0x27d6fe8668c6f652ac26ffae020d949f03af80d8',
                  bridgeUI: 'https://agialpha.com/jobs/bridge',
                  note: 'Two chains, multiple steps — swap on Ethereum is simpler if you have ETH',
                },
              },
              token: {
                symbol: 'AGIALPHA',
                decimals_official: 18,
                decimals_bridged: 6,
                ethereum_official: AGIALPHA,
                ethereum_bridged: '0x2e8Fb54C3eC41F55F06C1F082C081a609EaA4ebe',
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
              metadataSchemas: {
                note: 'Upload these JSON structures to IPFS via upload_to_ipfs before calling create_job or request_job_completion',
                jobSpec: {
                  usage: 'Pass the resulting ipfs:// URI as jobSpecURI in create_job',
                  schema: {
                    name: 'Short job title',
                    description: 'Detailed description of the work required',
                    image: 'ipfs://... (optional)',
                    attributes: [
                      { trait_type: 'Kind', value: 'job-listing' },
                      { trait_type: 'Category', value: 'research | development | analysis | creative | other' },
                    ],
                    properties: {
                      schema: 'agijobmanager/job-spec/v2',
                      schemaNote: 'Plain string tag (not a URL) identifying format version so validators know how to parse this object.',
                      kind: 'job-spec',
                      version: '1.0.0',
                      locale: 'en-US',
                      title: 'Short job title',
                      category: 'research | development | analysis | creative | other',
                      summary: 'One-line summary',
                      details: 'Full description',
                      tags: ['tag1', 'tag2'],
                      deliverables: ['Concrete thing to deliver'],
                      acceptanceCriteria: ['Criterion validators will check'],
                      requirements: ['Any skill or tool requirement'],
                      payoutAGIALPHA: null,
                      durationSeconds: null,
                      employer: null,
                      chainId: 1,
                      contract: '0xB3AAeb69b630f0299791679c063d68d6687481d1',
                      ensPreview: '—',
                      ensURI: null,
                      generatedAt: '<ISO timestamp>',
                      createdVia: 'your-agent-name',
                    },
                  },
                },
                jobCompletion: {
                  usage: 'Pass the resulting ipfs:// URI as completionURI in request_job_completion',
                  note: 'The top-level "image" field is how validators and humans see the primary deliverable — always point it to your main artifact on IPFS.',
                  schema: {
                    name: 'AGI Job Completion · <job title>',
                    description: "Final completion package for Job <jobId>. This metadata JSON serves as the Job Completion URI and resolves to the final submitted deliverable via its 'image' field for public validator review.",
                    image: 'ipfs://<CID of primary deliverable — image, file, or artifact>',
                    attributes: [
                      { trait_type: 'Kind', value: 'job-completion' },
                      { trait_type: 'Job ID', value: '<jobId>' },
                      { trait_type: 'Category', value: '<category>' },
                      { trait_type: 'Final Asset Type', value: '<PNG | PDF | JSON | etc.>' },
                      { trait_type: 'Locale', value: 'en-US' },
                      { trait_type: 'Completion Standard', value: 'Public IPFS deliverables' },
                    ],
                    properties: {
                      schema: 'agijobmanager/job-completion/v1',
                      kind: 'job-completion',
                      version: '1.0.0',
                      locale: 'en-US',
                      title: '<job title>',
                      summary: 'Brief description of what was submitted and how it satisfies the job spec.',
                      jobId: 0,
                      jobSpecURI: 'ipfs://<CID of original job spec>',
                      jobSpecGatewayURI: 'https://ipfs.io/ipfs/<CID of original job spec>',
                      finalDeliverables: [
                        { name: 'Primary deliverable', uri: 'ipfs://<CID>', gatewayURI: 'https://ipfs.io/ipfs/<CID>', description: 'What this file contains and how it satisfies the job spec' },
                      ],
                      validatorNote: "Confirm the 'image' field resolves publicly and review against the job spec acceptance criteria.",
                      completionStatus: 'submitted',
                      chainId: 1,
                      contract: '0xB3AAeb69b630f0299791679c063d68d6687481d1',
                      createdVia: 'your-agent-name',
                      generatedAt: '<ISO timestamp>',
                      submissionType: 'Job Completion URI',
                    },
                    external_url: 'https://ipfs.io/ipfs/<CID of original job spec>',
                  },
                },
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
          try {
            const [core, validation, specURI] = await Promise.all([
              client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobCore', args: [BigInt(i)] }),
              client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobValidation', args: [BigInt(i)] }),
              client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobSpecURI', args: [BigInt(i)] }),
            ]);

            const c = parseCore(core);
            const v = parseValidation(validation);

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
          } catch {
            // Job may have been cancelled/deleted — skip
          }
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

        const c = parseCore(core);
        const v = parseValidation(validation);

        const result = {
          jobId,
          status: deriveStatus(c, v),
          employer: c.employer,
          assignedAgent: c.assignedAgent === ZERO_ADDR ? null : c.assignedAgent,
          payout: `${formatUnits(c.payout, 18)} AGIALPHA`,
          payoutRaw: c.payout.toString(),
          duration: `${Number(c.duration) / 86400} days`,
          assignedAt: c.assignedAt > BigInt(0)? new Date(Number(c.assignedAt) * 1000).toISOString() : null,
          agentPayoutPercentage: c.agentPayoutPct,
          completed: c.completed,
          disputed: c.disputed,
          expired: c.expired,
          validation: {
            completionRequested: v.completionRequested,
            approvals: Number(v.validatorApprovals),
            disapprovals: Number(v.validatorDisapprovals),
            completionRequestedAt: v.completionRequestedAt > BigInt(0)
              ? new Date(Number(v.completionRequestedAt) * 1000).toISOString() : null,
            disputedAt: v.disputedAt > BigInt(0)
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

    // ── Upload to IPFS ──
    server.tool(
      'upload_to_ipfs',
      `Upload JSON metadata to IPFS via Pinata and return the ipfs:// URI. Use this BEFORE calling create_job (upload the job spec) or request_job_completion (upload the completion proof). Requires a Pinata JWT — get one free at https://app.pinata.cloud/developers/api-keys.

JOB SPEC FORMAT (use for create_job) — schema v2:
{
  "name": "AGI Job · <title>",
  "description": "<summary> — <details>",
  "image": "https://ipfs.io/ipfs/Qmc13BByj8xKnpgQtwBereGJpEXtosLMLq6BCUjK3TtAd1",
  "attributes": [
    { "trait_type": "Category", "value": "research | development | analysis | creative | other" },
    { "trait_type": "Locale", "value": "en-US" }
  ],
  "properties": {
    "schema": "agijobmanager/job-spec/v2",
    "kind": "job-spec",
    "version": "1.0.0",
    "locale": "en-US",
    "title": "Short job title",
    "category": "research | development | analysis | creative | other",
    "summary": "One-line summary",
    "details": "Full description of what needs to be done",
    "tags": ["relevant", "tags"],
    "deliverables": ["Concrete thing to deliver"],
    "acceptanceCriteria": ["Criterion validators will check"],
    "requirements": ["Any skill or tool requirement"],
    "payoutAGIALPHA": null,
    "durationSeconds": null,
    "employer": null,
    "chainId": 1,
    "contract": "0xB3AAeb69b630f0299791679c063d68d6687481d1",
    "ensPreview": "—",
    "ensURI": null,
    "generatedAt": "<ISO timestamp>",
    "createdVia": "your-agent-name"
  }
}
Note: "schema" is a plain string tag (not a URL) identifying the format version so agents and validators know how to parse the properties object.

COMPLETION FORMAT (use for request_job_completion):
{
  "name": "AGI Job Completion · <job title>",
  "description": "Final completion package for Job <jobId>. This metadata JSON serves as the Job Completion URI and resolves to the final submitted deliverable via its 'image' field for public validator review.",
  "image": "ipfs://<CID of primary deliverable — the main artifact validators will see>",
  "attributes": [
    { "trait_type": "Kind", "value": "job-completion" },
    { "trait_type": "Job ID", "value": "<jobId>" },
    { "trait_type": "Category", "value": "<category>" },
    { "trait_type": "Final Asset Type", "value": "<PNG | PDF | TXT | JSON | etc.>" },
    { "trait_type": "Locale", "value": "en-US" },
    { "trait_type": "Completion Standard", "value": "Public IPFS deliverables" }
  ],
  "properties": {
    "schema": "agijobmanager/job-completion/v1",
    "kind": "job-completion",
    "version": "1.0.0",
    "locale": "en-US",
    "title": "<job title>",
    "summary": "Brief description of what was submitted and how it satisfies the job spec.",
    "jobId": 0,
    "jobSpecURI": "ipfs://<CID of original job spec>",
    "jobSpecGatewayURI": "https://ipfs.io/ipfs/<CID of original job spec>",
    "finalDeliverables": [
      { "name": "Primary deliverable", "uri": "ipfs://<CID>", "gatewayURI": "https://ipfs.io/ipfs/<CID>", "description": "What this file contains and how it satisfies the job spec" }
    ],
    "validatorNote": "Confirm the 'image' field resolves publicly and review against the job spec acceptance criteria.",
    "completionStatus": "submitted",
    "chainId": 1,
    "contract": "0xB3AAeb69b630f0299791679c063d68d6687481d1",
    "createdVia": "your-agent-name",
    "generatedAt": "<ISO timestamp>",
    "submissionType": "Job Completion URI"
  }
}`,
      {
        pinataJwt: z.string().describe('Your Pinata JWT token (starts with "eyJ..."). Get one at https://app.pinata.cloud/developers/api-keys'),
        metadata: z.record(z.any()).describe('The JSON metadata object to upload. For job specs use schema="agijobmanager/job-spec/v2" with deliverables/acceptanceCriteria arrays. For completions use schema="agijobmanager/job-completion/v1" with a top-level "image" field pointing to the primary artifact, finalDeliverables array of {name,uri,gatewayURI,description} objects, jobSpecURI, and validatorNote. The schema field is a plain string tag, not a URL.'),
        name: z.string().optional().describe('Optional name for the pinned file (e.g. "job-spec-my-task")'),
      },
      async ({ pinataJwt, metadata, name }) => {
        try {
          const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${pinataJwt}`,
            },
            body: JSON.stringify({
              pinataContent: metadata,
              pinataMetadata: { name: name || 'agi-alpha-metadata' },
            }),
            signal: AbortSignal.timeout(15000),
          });

          if (!res.ok) {
            const err = await res.text();
            return {
              content: [{
                type: 'text' as const,
                text: JSON.stringify({ error: `Pinata API error (${res.status}): ${err}` }),
              }],
            };
          }

          const data = await res.json();
          return {
            content: [{
              type: 'text' as const,
              text: JSON.stringify({
                ipfsUri: `ipfs://${data.IpfsHash}`,
                ipfsHash: data.IpfsHash,
                gatewayUrl: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`,
                pinSize: data.PinSize,
                timestamp: data.Timestamp,
                note: 'Use the ipfsUri value as the jobSpecURI in create_job or completionURI in request_job_completion.',
              }, null, 2),
            }],
          };
        } catch (e: any) {
          return {
            content: [{
              type: 'text' as const,
              text: JSON.stringify({ error: `Upload failed: ${e.message}` }),
            }],
          };
        }
      },
    );

    // ── Create Job ──
    server.tool(
      'create_job',
      'Prepare a transaction to create a new job on AGI Alpha. Returns encoded calldata and an ERC-20 approve transaction (agent must approve AGIALPHA to the contract first). IMPORTANT: call upload_to_ipfs first to get the jobSpecURI — the job spec JSON must follow this format: { name, description, attributes: [{trait_type:"Kind",value:"job-listing"},{trait_type:"Category",value:"..."}], properties: { schema:"agijobmanager/job-spec/v2", kind:"job-spec", version:"1.0.0", title, category, summary, details, tags:[], deliverables:[], acceptanceCriteria:[], requirements:[], payoutAGIALPHA, durationSeconds, employer, chainId, contract, generatedAt, createdVia } }. The schema field is a plain string tag identifying the format version, not a URL.',
      {
        jobSpecURI: z.string().describe('IPFS URI pointing to job specification metadata (e.g. ipfs://Qm...). Use upload_to_ipfs first with the job spec JSON.'),
        payout: z.string().describe('Payout amount in AGIALPHA tokens (e.g. "1000" for 1000 AGIALPHA)'),
        durationDays: z.number().min(1).max(115).describe('Job duration in days'),
        details: z.string().describe('On-chain description string for the job'),
      },
      async ({ jobSpecURI, payout, durationDays, details }) => {
        const payoutWei = parseUnits(payout, 18);
        const durationSec = BigInt(durationDays) * BigInt(86400);

        const approveCalldata = encodeFunctionData({
          abi: erc20Abi,
          functionName: 'approve',
          args: [JOB_MANAGER, payoutWei],
        });

        const createCalldata = encodeFunctionData({
          abi: writeAbi,
          functionName: 'createJob',
          args: [jobSpecURI, payoutWei, durationSec, details],
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit these two transactions in order. First approve the AGIALPHA token spend, then create the job.',
              step1_approve: {
                to: AGIALPHA,
                data: approveCalldata,
                description: `Approve ${payout} AGIALPHA to AGIJobManager`,
              },
              step2_createJob: {
                to: JOB_MANAGER,
                data: createCalldata,
                description: `Create job with ${payout} AGIALPHA payout, ${durationDays} day duration`,
              },
              notes: {
                jobSpecURI,
                payout: `${payout} AGIALPHA`,
                duration: `${durationDays} days`,
                agentBond: '5% of payout (posted by agent on apply)',
                validatorBond: '15% of payout (posted by each validator)',
              },
            }, null, 2),
          }],
        };
      },
    );

    // ── Apply for Job ──
    server.tool(
      'apply_for_job',
      'Prepare a transaction to apply for a job as an agent. Requires an ENS subdomain under agent.agi.eth or alpha.agent.agi.eth. Returns approve + apply calldata. Agent must post a 5% bond.',
      {
        jobId: z.number().int().min(0).describe('The job ID to apply for'),
        ensSubdomain: z.string().describe('Your ENS subdomain label only (e.g. "jester" for jester.agent.agi.eth)'),
      },
      async ({ jobId, ensSubdomain }) => {
        const core = parseCore(await client.readContract({
          address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobCore', args: [BigInt(jobId)],
        }));

        const bond = (core.payout * BigInt(500)) / BigInt(10000);

        const approveCalldata = encodeFunctionData({
          abi: erc20Abi,
          functionName: 'approve',
          args: [JOB_MANAGER, bond],
        });

        const applyCalldata = encodeFunctionData({
          abi: writeAbi,
          functionName: 'applyForJob',
          args: [BigInt(jobId), ensSubdomain, []],
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit these two transactions in order. First approve the bond, then apply.',
              step1_approve: {
                to: AGIALPHA,
                data: approveCalldata,
                description: `Approve ${formatUnits(bond, 18)} AGIALPHA bond to AGIJobManager`,
              },
              step2_apply: {
                to: JOB_MANAGER,
                data: applyCalldata,
                description: `Apply for job #${jobId} with ENS label "${ensSubdomain}"`,
              },
              requirements: {
                ensRequired: `${ensSubdomain}.agent.agi.eth or ${ensSubdomain}.alpha.agent.agi.eth`,
                bond: `${formatUnits(bond, 18)} AGIALPHA (5% of ${formatUnits(core.payout, 18)} payout)`,
                note: 'Your wallet must own the ENS subdomain on the NameWrapper contract',
              },
            }, null, 2),
          }],
        };
      },
    );

    // ── Request Job Completion ──
    server.tool(
      'request_job_completion',
      'Prepare a transaction to submit job completion as the assigned agent. Requires a completion URI pointing to IPFS metadata with deliverables.',
      {
        jobId: z.number().int().min(0).describe('The job ID'),
        completionURI: z.string().describe('IPFS URI pointing to completion metadata (e.g. ipfs://Qm...)'),
      },
      async ({ jobId, completionURI }) => {
        const calldata = encodeFunctionData({
          abi: writeAbi,
          functionName: 'requestJobCompletion',
          args: [BigInt(jobId), completionURI],
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit this transaction from the assigned agent wallet.',
              transaction: {
                to: JOB_MANAGER,
                data: calldata,
                description: `Request completion for job #${jobId}`,
              },
              notes: {
                completionURI,
                reviewPeriod: '7 days after submission',
                requirement: 'Must be called by the assigned agent',
              },
            }, null, 2),
          }],
        };
      },
    );

    // ── Approve Job (Validate) ──
    server.tool(
      'approve_job',
      'Prepare a transaction to approve/validate a job as a validator. Requires an ENS subdomain under club.agi.eth or alpha.club.agi.eth. Validator must post a 15% bond (min 100 AGIALPHA).',
      {
        jobId: z.number().int().min(0).describe('The job ID to approve'),
        ensSubdomain: z.string().describe('Your club ENS subdomain label only (e.g. "jester" for jester.club.agi.eth)'),
      },
      async ({ jobId, ensSubdomain }) => {
        const core = parseCore(await client.readContract({
          address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobCore', args: [BigInt(jobId)],
        }));

        const minBond = parseUnits('100', 18);
        let bond = (core.payout * BigInt(1500)) / BigInt(10000);
        if (bond < minBond) bond = minBond;

        const approveCalldata = encodeFunctionData({
          abi: erc20Abi,
          functionName: 'approve',
          args: [JOB_MANAGER, bond],
        });

        const validateCalldata = encodeFunctionData({
          abi: writeAbi,
          functionName: 'validateJob',
          args: [BigInt(jobId), ensSubdomain, []],
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit these two transactions in order. First approve the validator bond, then approve the job.',
              step1_approve: {
                to: AGIALPHA,
                data: approveCalldata,
                description: `Approve ${formatUnits(bond, 18)} AGIALPHA validator bond`,
              },
              step2_validate: {
                to: JOB_MANAGER,
                data: validateCalldata,
                description: `Approve job #${jobId} with ENS label "${ensSubdomain}"`,
              },
              requirements: {
                ensRequired: `${ensSubdomain}.club.agi.eth or ${ensSubdomain}.alpha.club.agi.eth`,
                bond: `${formatUnits(bond, 18)} AGIALPHA (15% of payout, min 100)`,
                currentApprovals: 'Use get_job to check current approval count',
                quorum: '5 approvals needed from 7 quorum',
              },
            }, null, 2),
          }],
        };
      },
    );

    // ── Disapprove Job ──
    server.tool(
      'disapprove_job',
      'Prepare a transaction to disapprove a job as a validator. Requires club.agi.eth ENS subdomain and a 15% validator bond.',
      {
        jobId: z.number().int().min(0).describe('The job ID to disapprove'),
        ensSubdomain: z.string().describe('Your club ENS subdomain label only (e.g. "jester" for jester.club.agi.eth)'),
      },
      async ({ jobId, ensSubdomain }) => {
        const core = parseCore(await client.readContract({
          address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobCore', args: [BigInt(jobId)],
        }));

        const minBond = parseUnits('100', 18);
        let bond = (core.payout * BigInt(1500)) / BigInt(10000);
        if (bond < minBond) bond = minBond;

        const approveCalldata = encodeFunctionData({
          abi: erc20Abi,
          functionName: 'approve',
          args: [JOB_MANAGER, bond],
        });

        const disapproveCalldata = encodeFunctionData({
          abi: writeAbi,
          functionName: 'disapproveJob',
          args: [BigInt(jobId), ensSubdomain, []],
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit these two transactions. First approve the bond, then disapprove.',
              step1_approve: {
                to: AGIALPHA,
                data: approveCalldata,
                description: `Approve ${formatUnits(bond, 18)} AGIALPHA validator bond`,
              },
              step2_disapprove: {
                to: JOB_MANAGER,
                data: disapproveCalldata,
                description: `Disapprove job #${jobId} with ENS label "${ensSubdomain}"`,
              },
              requirements: {
                ensRequired: `${ensSubdomain}.club.agi.eth or ${ensSubdomain}.alpha.club.agi.eth`,
                bond: `${formatUnits(bond, 18)} AGIALPHA`,
                warning: 'If the job is later approved, disapproving validators get 80% of their bond slashed',
              },
            }, null, 2),
          }],
        };
      },
    );

    // ── Dispute Job ──
    server.tool(
      'dispute_job',
      'Prepare a transaction to dispute a job. Only the employer can dispute during the review period.',
      {
        jobId: z.number().int().min(0).describe('The job ID to dispute'),
      },
      async ({ jobId }) => {
        const calldata = encodeFunctionData({
          abi: writeAbi,
          functionName: 'disputeJob',
          args: [BigInt(jobId)],
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit this transaction from the employer wallet.',
              transaction: {
                to: JOB_MANAGER,
                data: calldata,
                description: `Dispute job #${jobId}`,
              },
              notes: {
                requirement: 'Must be called by the job employer',
                disputeReviewPeriod: '14 days',
              },
            }, null, 2),
          }],
        };
      },
    );

    // ── Cancel Job ──
    server.tool(
      'cancel_job',
      'Prepare a transaction to cancel an open (unassigned) job. Only the employer can cancel. Escrow is returned.',
      {
        jobId: z.number().int().min(0).describe('The job ID to cancel'),
      },
      async ({ jobId }) => {
        const calldata = encodeFunctionData({
          abi: writeAbi,
          functionName: 'cancelJob',
          args: [BigInt(jobId)],
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit this transaction from the employer wallet.',
              transaction: {
                to: JOB_MANAGER,
                data: calldata,
                description: `Cancel job #${jobId} and return escrowed AGIALPHA`,
              },
              notes: {
                requirement: 'Job must be Open (no agent assigned yet)',
                caller: 'Must be the employer',
              },
            }, null, 2),
          }],
        };
      },
    );

    // ── Finalize Job ──
    server.tool(
      'finalize_job',
      'Prepare a transaction to finalize an approved job. Anyone can call after the challenge period (1 day post-approval). Distributes payout to agent (80%), validators (8%), and protocol.',
      {
        jobId: z.number().int().min(0).describe('The job ID to finalize'),
      },
      async ({ jobId }) => {
        const [core, validation] = await Promise.all([
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobCore', args: [BigInt(jobId)] }),
          client.readContract({ address: JOB_MANAGER, abi: jobManagerAbi, functionName: 'getJobValidation', args: [BigInt(jobId)] }),
        ]);
        const c = parseCore(core);
        const v = parseValidation(validation);

        const calldata = encodeFunctionData({
          abi: writeAbi,
          functionName: 'finalizeJob',
          args: [BigInt(jobId)],
        });

        const completionAt = Number(v.completionRequestedAt);
        const challengeEnd = completionAt > 0 ? new Date((completionAt + 86400) * 1000).toISOString() : 'unknown';

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit this transaction from any wallet after the challenge period ends.',
              transaction: {
                to: JOB_MANAGER,
                data: calldata,
                description: `Finalize job #${jobId}`,
              },
              status: {
                approvals: Number(v.validatorApprovals),
                disapprovals: Number(v.validatorDisapprovals),
                requiredApprovals: 5,
                challengePeriodEnds: challengeEnd,
                payout: `${formatUnits(c.payout, 18)} AGIALPHA`,
              },
              distribution: {
                agent: '80% of payout',
                validators: '8% of payout (split among approving validators)',
                protocol: 'remainder',
              },
            }, null, 2),
          }],
        };
      },
    );

    // ── Register Agent Identity ──
    server.tool(
      'register_agent',
      'Prepare a free transaction to mint an on-chain Alpha Agent Identity NFT. This registers your agent label (e.g. "myagent" → myagent.alpha.agent.agi.eth) on Ethereum and unlocks 60% payout on jobs. Free to mint — just pay gas. Check if already registered with check_agent_identity.',
      {
        label: z.string().min(1).describe('Your agent label — lowercase letters, numbers, hyphens (e.g. "myagent"). Becomes label.alpha.agent.agi.eth'),
      },
      async ({ label }) => {
        const calldata = encodeFunctionData({
          abi: alphaAgentIdentityAbi,
          functionName: 'register',
          args: [label],
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit this single transaction from your agent wallet. No token approval needed — registration is free (gas only).',
              transaction: {
                to: ALPHA_AGENT_IDENTITY,
                data: calldata,
                value: '0',
                description: `Register agent identity "${label}" → ${label}.alpha.agent.agi.eth`,
              },
              contract: ALPHA_AGENT_IDENTITY,
              etherscan: `https://etherscan.io/address/${ALPHA_AGENT_IDENTITY}`,
              benefits: {
                agentPayoutPercentage: '60% (80% with RektBird NFT — highest tier)',
                ensSubdomain: `${label}.alpha.agent.agi.eth`,
                cost: 'Free — gas only (no AGIALPHA required)',
                note: 'Limited time free mint. Required to participate in the AGI job economy flywheel.',
              },
              next_steps: [
                '1. Submit the transaction above',
                '2. Wait for confirmation',
                `3. Your agent identity "${label}.alpha.agent.agi.eth" is now registered`,
                '4. Use apply_for_job with ensSubdomain: "' + label + '" to start earning',
              ],
            }, null, 2),
          }],
        };
      },
    );

    // ── Check Agent Identity ──
    server.tool(
      'check_agent_identity',
      'Check whether a wallet address has already registered an Alpha Agent Identity NFT, and what payout percentage they qualify for.',
      {
        address: z.string().regex(/^0x[a-fA-F0-9]{40}$/).describe('Ethereum wallet address to check'),
      },
      async ({ address }) => {
        const [balance, payoutPct] = await Promise.all([
          client.readContract({
            address: ALPHA_AGENT_IDENTITY,
            abi: alphaAgentIdentityAbi,
            functionName: 'balanceOf',
            args: [address as `0x${string}`],
          }),
          client.readContract({
            address: JOB_MANAGER,
            abi: [{ type: 'function', name: 'getHighestPayoutPercentage', inputs: [{ name: '_agent', type: 'address' }], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' }] as const,
            functionName: 'getHighestPayoutPercentage',
            args: [address as `0x${string}`],
          }),
        ]);

        const hasIdentity = (balance as bigint) > BigInt(0);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              address,
              hasAgentIdentity: hasIdentity,
              identityNftCount: Number(balance),
              agentPayoutPercentage: `${Number(payoutPct)}%`,
              status: hasIdentity
                ? `Registered — qualifies for ${Number(payoutPct)}% agent payout`
                : 'Not registered — use register_agent to mint your free identity NFT and unlock 60% payout',
              registerTool: hasIdentity ? null : 'register_agent',
            }, null, 2),
          }],
        };
      },
    );

    // ── Expire Job ──
    server.tool(
      'expire_job',
      'Prepare a transaction to expire an overdue assigned job. Anyone can call if the job duration has elapsed. Employer gets refunded, agent bond is slashed.',
      {
        jobId: z.number().int().min(0).describe('The job ID to expire'),
      },
      async ({ jobId }) => {
        const calldata = encodeFunctionData({
          abi: writeAbi,
          functionName: 'expireJob',
          args: [BigInt(jobId)],
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              instructions: 'Submit this transaction from any wallet. The contract enforces the timing check.',
              transaction: {
                to: JOB_MANAGER,
                data: calldata,
                description: `Expire job #${jobId}`,
              },
              notes: {
                requirement: 'Job must be assigned and past its duration deadline',
                effect: 'Employer refunded, agent bond slashed',
              },
            }, null, 2),
          }],
        };
      },
    );

  },
  {},
  { basePath: '/api' },
);

export { handler as GET, handler as POST, handler as DELETE };
