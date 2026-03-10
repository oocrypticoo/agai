export const CONTRACTS = {
  // ── Ethereum ──
  AGI_JOB_MANAGER: '0xB3AAeb69b630f0299791679c063d68d6687481d1' as `0x${string}`,
  AGIALPHA_OFFICIAL: '0xa61a3b3a130a9c20768eebf97e21515a6046a1fa' as `0x${string}`,
  AGIALPHA_BRIDGED: '0x2e8Fb54C3eC41F55F06C1F082C081a609EaA4ebe' as `0x${string}`,
  MINTER_VAULT: '0x27d6fe8668c6f652ac26ffae020d949f03af80d8' as `0x${string}`,
  ENS_JOB_PAGES: '0xc19A84D10ed28c2642EfDA532eC7f3dD88E5ed94' as `0x${string}`,
  ENS_NAME_WRAPPER: '0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401' as `0x${string}`,
  // ── Solana ──
  AGIALPHA_SOLANA: 'tWKHzXd5PRmxTF5cMfJkm2Ua3TcjwNNoSRUqx6Apump',
} as const;

// ── Solana / deBridge constants ───────────────────────────────────────────
export const SOLANA_MINT = CONTRACTS.AGIALPHA_SOLANA;
export const DEBRIDGE_SRC_CHAIN = '7565164';   // Solana
export const DEBRIDGE_DST_CHAIN = '1';         // Ethereum

// Deployment block — avoids scanning from genesis
export const DEPLOYMENT_BLOCK = BigInt(21780000);

// ─── Verified ABI from Etherscan (Solidity 0.8.23) ──────────────────────────

export const agiJobManagerAbi = [
  // ── Public state variable getters (auto-generated) ──
  { type: 'function', name: 'nextJobId', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'agiToken', inputs: [], outputs: [{ name: '', type: 'address' }], stateMutability: 'view' },
  { type: 'function', name: 'paused', inputs: [], outputs: [{ name: '', type: 'bool' }], stateMutability: 'view' },
  { type: 'function', name: 'requiredValidatorApprovals', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'requiredValidatorDisapprovals', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'voteQuorum', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'completionReviewPeriod', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'disputeReviewPeriod', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'challengePeriodAfterApproval', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'maxJobPayout', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'jobDurationLimit', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'maxActiveJobsPerAgent', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'validatorSlashBps', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'agentBondBps', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'agentBondMin', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'agentBondMax', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'validatorBondBps', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'validatorBondMin', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'validatorBondMax', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'validationRewardPercentage', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'agiTypes', inputs: [{ name: '', type: 'uint256' }], outputs: [{ name: 'nftAddress', type: 'address' }, { name: 'payoutPercentage', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'settlementPaused', inputs: [], outputs: [{ name: '', type: 'bool' }], stateMutability: 'view' },
  { type: 'function', name: 'reputation', inputs: [{ name: '', type: 'address' }], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'withdrawableAGI', inputs: [], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'getHighestPayoutPercentage', inputs: [{ name: '_agent', type: 'address' }], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },

  // ── Verified read functions ──
  {
    type: 'function',
    name: 'getJobCore',
    inputs: [{ name: 'jobId', type: 'uint256' }],
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
    type: 'function',
    name: 'getJobValidation',
    inputs: [{ name: 'jobId', type: 'uint256' }],
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
  { type: 'function', name: 'tokenURI', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ name: '', type: 'string' }], stateMutability: 'view' },

  // ── Verified write functions ──
  {
    type: 'function',
    name: 'createJob',
    inputs: [
      { name: '_jobSpecURI', type: 'string' },
      { name: '_payout', type: 'uint256' },
      { name: '_duration', type: 'uint256' },
      { name: '_details', type: 'string' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'applyForJob',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: 'subdomain', type: 'string' },
      { name: 'proof', type: 'bytes32[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'requestJobCompletion',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: '_jobCompletionURI', type: 'string' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'validateJob',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: 'subdomain', type: 'string' },
      { name: 'proof', type: 'bytes32[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'disapproveJob',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: 'subdomain', type: 'string' },
      { name: 'proof', type: 'bytes32[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'disputeJob',
    inputs: [{ name: '_jobId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cancelJob',
    inputs: [{ name: '_jobId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'expireJob',
    inputs: [{ name: '_jobId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'finalizeJob',
    inputs: [{ name: '_jobId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // ── Events (for log-based job discovery) ──
  {
    type: 'event',
    name: 'JobCreated',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'jobSpecURI', type: 'string', indexed: false },
      { name: 'payout', type: 'uint256', indexed: true },
      { name: 'duration', type: 'uint256', indexed: true },
      { name: 'details', type: 'string', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'JobApplied',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'agent', type: 'address', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'JobCompletionRequested',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'agent', type: 'address', indexed: true },
      { name: 'jobCompletionURI', type: 'string', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'JobValidated',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'validator', type: 'address', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'JobDisapproved',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'validator', type: 'address', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'JobCompleted',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'agent', type: 'address', indexed: true },
      { name: 'reputationPoints', type: 'uint256', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'JobCancelled',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'JobDisputed',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'disputant', type: 'address', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'JobExpired',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'employer', type: 'address', indexed: true },
      { name: 'agent', type: 'address', indexed: false },
      { name: 'payout', type: 'uint256', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'DisputeResolvedWithCode',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'resolver', type: 'address', indexed: true },
      { name: 'resolutionCode', type: 'uint8', indexed: true },
      { name: 'reason', type: 'string', indexed: false },
    ],
  },
] as const;

// ── ENS ──────────────────────────────────────────────────────────────────────

export const ensNameWrapperAbi = [
  {
    type: 'function',
    name: 'ownerOf',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
] as const;

export const ENS_SUBDOMAINS = {
  agent: 'agent.agi.eth',
  club: 'club.agi.eth',
} as const;

// ── ERC20 ────────────────────────────────────────────────────────────────────

export const erc20Abi = [
  { type: 'function', name: 'balanceOf', inputs: [{ name: 'account', type: 'address' }], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'approve', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ name: '', type: 'bool' }], stateMutability: 'nonpayable' },
  { type: 'function', name: 'allowance', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'decimals', inputs: [], outputs: [{ name: '', type: 'uint8' }], stateMutability: 'view' },
  { type: 'function', name: 'symbol', inputs: [], outputs: [{ name: '', type: 'string' }], stateMutability: 'view' },
] as const;

// ── MinterVault ABI ───────────────────────────────────────────────────────
export const minterVaultAbi = [
  {
    type: 'function',
    name: 'depositExact',
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'minMintOut', type: 'uint256' },
    ],
    outputs: [{ name: 'minted', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
] as const;
