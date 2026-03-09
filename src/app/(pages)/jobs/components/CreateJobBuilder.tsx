'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  X, Briefcase, Plus, Trash2, ChevronRight, ChevronLeft,
  Upload, Eye, CheckCircle2, Loader2, Copy, ExternalLink,
  FileJson, Globe, Tag, ListChecks, FileText,
} from 'lucide-react';
import { parseUnits } from 'viem';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS, agiJobManagerAbi, erc20Abi } from '../lib/contracts';

// ─── Types ──────────────────────────────────────────────────────────────────

interface JobSpec {
  title: string;
  summary: string;
  category: string;
  tags: string[];
  deliverables: string[];
  acceptanceCriteria: string[];
  requirements: string[];
  coverImageURI: string;
  externalRefURI: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

// ─── Constants ──────────────────────────────────────────────────────────────


const DURATION_PRESETS = [
  { label: '1 day', seconds: '86400' },
  { label: '3 days', seconds: '259200' },
  { label: '1 week', seconds: '604800' },
  { label: '2 weeks', seconds: '1209600' },
  { label: '1 month', seconds: '2592000' },
] as const;

const STEPS = ['Job Details', 'Requirements', 'Review & Pin'] as const;

// ─── Pinata IPFS upload ──────────────────────────────────────────────────────

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT ?? '';
const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY ?? 'https://gateway.pinata.cloud';

async function pinToIPFS(json: object, name: string): Promise<string> {
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('file', blob, `${name}.json`);
  formData.append('pinataMetadata', JSON.stringify({ name }));

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: { Authorization: `Bearer ${PINATA_JWT}` },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinata upload failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return `ipfs://${data.IpfsHash}`;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function CreateJobBuilder({ open, onClose }: Props) {
  const { address, isConnected } = useAccount();

  // Step tracker
  const [step, setStep] = useState(0);

  // Step 1: Job details
  const [spec, setSpec] = useState<JobSpec>({
    title: '',
    summary: '',
    category: '',
    tags: [],
    deliverables: [''],
    acceptanceCriteria: [''],
    requirements: [''],
    coverImageURI: 'https://ipfs.io/ipfs/Qmc13BByj8xKnpgQtwBereGJpEXtosLMLq6BCUjK3TtAd1',
    externalRefURI: '',
  });
  const [tagInput, setTagInput] = useState('');

  // Step 2: On-chain params
  const [payout, setPayout] = useState('');
  const [duration, setDuration] = useState('');
  const [details, setDetails] = useState('');

  // Step 3: Pinning + submission
  const [pinning, setPinning] = useState(false);
  const [pinError, setPinError] = useState('');
  const [pinnedURI, setPinnedURI] = useState('');
  const [pinnedCID, setPinnedCID] = useState('');

  // Contract interaction
  const { writeContract: approveToken, data: approveHash, isPending: isApproving } = useWriteContract();
  const { isLoading: isApproveConfirming, isSuccess: approveConfirmed } = useWaitForTransactionReceipt({ hash: approveHash });

  const { writeContract: createJobTx, data: createJobHash, isPending: isCreating } = useWriteContract();
  const { isLoading: isCreateConfirming, isSuccess: createConfirmed } = useWaitForTransactionReceipt({ hash: createJobHash });

  const { data: tokenAllowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACTS.AGIALPHA_OFFICIAL,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.AGI_JOB_MANAGER] : undefined,
    query: { enabled: !!address },
  });

  // ── Derived ─────────────────────────────────────────────────────────────

  const metadata = useMemo(() => ({
    name: spec.title || 'Untitled Job',
    description: spec.summary,
    image: spec.coverImageURI || undefined,
    external_url: spec.externalRefURI || undefined,
    properties: {
      title: spec.title,
      summary: spec.summary,
      category: spec.category,
      tags: spec.tags.filter(Boolean),
      deliverables: spec.deliverables.filter(Boolean),
      acceptanceCriteria: spec.acceptanceCriteria.filter(Boolean),
      requirements: spec.requirements.filter(Boolean),
      payoutAGIALPHA: payout || undefined,
      durationSeconds: duration ? Number(duration) : undefined,
      employer: address,
    },
    attributes: [
      { trait_type: 'Category', value: spec.category },
      { trait_type: 'Payout', value: payout ? `${payout} AGIALPHA` : '—' },
      { trait_type: 'Duration', value: duration ? `${Number(duration) / 86400}d` : '—' },
    ],
  }), [spec, payout, duration, address]);

  const metadataJSON = useMemo(() => JSON.stringify(metadata, null, 2), [metadata]);

  const needsApproval = useMemo(() => {
    if (!payout || !tokenAllowance) return true;
    try {
      return parseUnits(payout, 18) > (tokenAllowance as bigint);
    } catch {
      return true;
    }
  }, [payout, tokenAllowance]);

  const canProceedStep0 = spec.title.trim().length > 0 && spec.category.length > 0 && spec.summary.trim().length > 0;
  const canProceedStep1 = !!payout && !!duration && parseFloat(payout) > 0 && Number(duration) > 0;

  // ── Handlers ────────────────────────────────────────────────────────────

  function updateSpec<K extends keyof JobSpec>(key: K, val: JobSpec[K]) {
    setSpec(prev => ({ ...prev, [key]: val }));
  }

  function addListItem(key: 'deliverables' | 'acceptanceCriteria' | 'requirements') {
    setSpec(prev => ({ ...prev, [key]: [...prev[key], ''] }));
  }

  function updateListItem(key: 'deliverables' | 'acceptanceCriteria' | 'requirements', index: number, val: string) {
    setSpec(prev => {
      const arr = [...prev[key]];
      arr[index] = val;
      return { ...prev, [key]: arr };
    });
  }

  function removeListItem(key: 'deliverables' | 'acceptanceCriteria' | 'requirements', index: number) {
    setSpec(prev => {
      const arr = [...prev[key]];
      arr.splice(index, 1);
      return { ...prev, [key]: arr.length === 0 ? [''] : arr };
    });
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !spec.tags.includes(t)) {
      updateSpec('tags', [...spec.tags, t]);
    }
    setTagInput('');
  }

  function removeTag(t: string) {
    updateSpec('tags', spec.tags.filter(x => x !== t));
  }

  const handlePin = useCallback(async () => {
    if (!PINATA_JWT) {
      setPinError('NEXT_PUBLIC_PINATA_JWT not configured. Set it in .env.local');
      return;
    }
    setPinning(true);
    setPinError('');
    try {
      const name = `job-spec-${spec.title.toLowerCase().replace(/\s+/g, '-').slice(0, 40)}-${Date.now()}`;
      const uri = await pinToIPFS(metadata, name);
      const cid = uri.replace('ipfs://', '');
      setPinnedURI(uri);
      setPinnedCID(cid);
    } catch (err) {
      setPinError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setPinning(false);
    }
  }, [metadata, spec.title]);

  function handleApprove() {
    if (!payout) return;
    approveToken({
      address: CONTRACTS.AGIALPHA_OFFICIAL,
      abi: erc20Abi,
      functionName: 'approve',
      args: [CONTRACTS.AGI_JOB_MANAGER, parseUnits(payout, 18)],
    });
  }

  function handleCreateJob() {
    if (!pinnedURI || !payout || !duration) return;
    createJobTx({
      address: CONTRACTS.AGI_JOB_MANAGER,
      abi: agiJobManagerAbi,
      functionName: 'createJob',
      args: [pinnedURI, parseUnits(payout, 18), BigInt(duration), details],
    });
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  // ── Guard ─────────────────────────────────────────────────────────────

  if (!open) return null;

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      onClick={onClose}
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
          <div className="flex items-center gap-3">
            <Briefcase className="size-5 text-[#805abe]" />
            <h2 className="text-lg font-bold font-degular text-heading">Create Job</h2>
          </div>
          <button onClick={onClose} className="text-text hover:text-heading transition-colors">
            <X className="size-5" />
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-1 px-6 pt-4 pb-2 shrink-0">
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && <div className="flex-1 h-px bg-black/5 dark:bg-white/5 mx-1" />}
              <button
                onClick={() => {
                  if (i === 0) setStep(0);
                  else if (i === 1 && canProceedStep0) setStep(1);
                  else if (i === 2 && canProceedStep0 && canProceedStep1) setStep(2);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-degular-medium transition-all ${
                  step === i
                    ? 'bg-[#805abe]/20 text-[#805abe] border border-[#805abe]/30'
                    : step > i
                    ? 'text-emerald-400 border border-emerald-500/20 bg-emerald-500/5'
                    : 'text-text/40 border border-black/5 dark:border-white/5'
                }`}
              >
                {step > i ? <CheckCircle2 className="size-3" /> : <span className="text-[10px]">{i + 1}</span>}
                {label}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 min-h-0 space-y-4" onWheel={(e) => e.stopPropagation()}>
          {!isConnected && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-amber-400 text-xs font-degular-medium">
              Connect your wallet to create a job.
            </div>
          )}

          {/* ═══ Step 0: Job Details ═══ */}
          {step === 0 && (
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">Job Title *</label>
                <input
                  value={spec.title}
                  onChange={(e) => updateSpec('title', e.target.value)}
                  placeholder="e.g. Build staking dashboard for AGI protocol"
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-sm font-degular placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">Category *</label>
                <input
                  value={spec.category}
                  onChange={(e) => updateSpec('category', e.target.value)}
                  placeholder="e.g. Smart Contract Development, Frontend, Security Audit"
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-sm font-degular placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium flex items-center gap-1">
                  <Tag className="size-3" /> Tags
                </label>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {spec.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#805abe]/10 text-[#805abe] text-xs font-degular-medium border border-[#805abe]/20">
                      {t}
                      <button onClick={() => removeTag(t)} className="hover:text-red-400 transition-colors">
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-xs font-degular placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors"
                  />
                  <button
                    onClick={addTag}
                    disabled={!tagInput.trim()}
                    className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 text-text/40 hover:text-[#805abe] hover:border-[#805abe]/30 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-degular-medium transition-all"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">Summary *</label>
                <textarea
                  value={spec.summary}
                  onChange={(e) => updateSpec('summary', e.target.value)}
                  rows={3}
                  placeholder="Brief overview of the job scope and objectives..."
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-sm font-degular placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Deliverables */}
              <ListEditor
                label="Deliverables"
                icon={<ListChecks className="size-3" />}
                items={spec.deliverables}
                placeholder="e.g. Deployed smart contract on Ethereum mainnet"
                onUpdate={(i, v) => updateListItem('deliverables', i, v)}
                onAdd={() => addListItem('deliverables')}
                onRemove={(i) => removeListItem('deliverables', i)}
              />

              {/* Acceptance Criteria */}
              <ListEditor
                label="Acceptance Criteria"
                icon={<CheckCircle2 className="size-3" />}
                items={spec.acceptanceCriteria}
                placeholder="e.g. All tests pass, code reviewed by validators"
                onUpdate={(i, v) => updateListItem('acceptanceCriteria', i, v)}
                onAdd={() => addListItem('acceptanceCriteria')}
                onRemove={(i) => removeListItem('acceptanceCriteria', i)}
              />

              {/* Cover Image + External Ref */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">Cover Image URI</label>
                  <input
                    value={spec.coverImageURI}
                    onChange={(e) => updateSpec('coverImageURI', e.target.value)}
                    placeholder="ipfs://... or https://..."
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-xs font-mono placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors"
                  />
                  {spec.coverImageURI && (
                    <div className="mt-2 w-full h-28 rounded-lg bg-black/5 dark:bg-white/5 overflow-hidden border border-black/5 dark:border-white/5">
                      <img
                        src={spec.coverImageURI.startsWith('ipfs://') ? `https://ipfs.io/ipfs/${spec.coverImageURI.slice(7)}` : spec.coverImageURI}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">External Reference</label>
                  <input
                    value={spec.externalRefURI}
                    onChange={(e) => updateSpec('externalRefURI', e.target.value)}
                    placeholder="https://github.com/..."
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-xs font-mono placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ═══ Step 1: Requirements (Payout + Duration + Details) ═══ */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Requirements list */}
              <ListEditor
                label="Requirements"
                icon={<FileText className="size-3" />}
                items={spec.requirements}
                placeholder="e.g. Must hold agent.agi.eth subdomain"
                onUpdate={(i, v) => updateListItem('requirements', i, v)}
                onAdd={() => addListItem('requirements')}
                onRemove={(i) => removeListItem('requirements', i)}
              />

              {/* Payout */}
              <div>
                <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">Payout ($AGIALPHA) *</label>
                <input
                  type="number"
                  value={payout}
                  onChange={(e) => setPayout(e.target.value)}
                  placeholder="0.00"
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-sm font-mono placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">Duration *</label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {DURATION_PRESETS.map(({ label, seconds }) => (
                    <button
                      key={seconds}
                      onClick={() => setDuration(seconds)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-degular-medium transition-all ${
                        duration === seconds
                          ? 'bg-[#805abe]/20 text-[#805abe] border border-[#805abe]/30'
                          : 'border border-black/5 dark:border-white/5 text-text/50 hover:text-text hover:border-white/10'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="86400"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-sm font-mono placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-xs text-text/40 font-degular-medium shrink-0">
                    {duration ? `= ${(Number(duration) / 86400).toFixed(1)} days` : 'seconds'}
                  </span>
                </div>
              </div>

              {/* On-chain details */}
              <div>
                <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">On-chain Details (optional)</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={2}
                  placeholder="Short on-chain note (stored in contract calldata)"
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-sm font-degular placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* ═══ Step 2: Review & Pin ═══ */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Metadata preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium flex items-center gap-1">
                    <FileJson className="size-3" /> Metadata Preview
                  </label>
                  <button
                    onClick={() => copyToClipboard(metadataJSON)}
                    className="flex items-center gap-1 text-[10px] text-text/40 hover:text-[#805abe] font-degular-medium transition-colors"
                  >
                    <Copy className="size-3" /> Copy
                  </button>
                </div>
                <pre className="w-full max-h-48 overflow-auto px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.02] text-xs font-mono text-text/70 leading-relaxed">
                  {metadataJSON}
                </pre>
              </div>

              {/* ENS Job Page Preview */}
              <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="size-3.5 text-[#805abe]" />
                  <span className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">ENS Job Page Preview</span>
                </div>
                <div className="rounded-lg border border-black/5 dark:border-white/5 bg-white/[0.01] p-4 space-y-3">
                  {spec.coverImageURI && (
                    <div className="w-full h-32 rounded-lg bg-black/5 dark:bg-white/5 overflow-hidden">
                      <img
                        src={spec.coverImageURI.startsWith('ipfs://') ? `https://ipfs.io/ipfs/${spec.coverImageURI.slice(7)}` : spec.coverImageURI}
                        alt="Cover"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <h3 className="text-base font-degular-semibold text-heading">{spec.title || 'Untitled Job'}</h3>
                  <p className="text-xs text-text/60 font-degular leading-relaxed">{spec.summary || 'No summary provided.'}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {spec.category && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#805abe]/10 text-[#805abe] border border-[#805abe]/20 font-degular-medium">{spec.category}</span>
                    )}
                    {spec.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-black/5 dark:bg-white/5 text-text/50 font-degular-medium">{t}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-text/30 font-degular-medium">Payout</span>
                      <p className="text-heading font-degular-semibold">{payout ? `${Number(payout).toLocaleString()} AGIALPHA` : '—'}</p>
                    </div>
                    <div>
                      <span className="text-text/30 font-degular-medium">Duration</span>
                      <p className="text-heading font-degular-semibold">{duration ? `${(Number(duration) / 86400).toFixed(1)} days` : '—'}</p>
                    </div>
                  </div>
                  {spec.deliverables.filter(Boolean).length > 0 && (
                    <div>
                      <span className="text-[10px] text-text/30 font-degular-medium uppercase">Deliverables</span>
                      <ul className="mt-1 space-y-1">
                        {spec.deliverables.filter(Boolean).map((d, i) => (
                          <li key={i} className="flex gap-1.5 text-xs text-text/60 font-degular">
                            <span className="text-text/20">•</span>{d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Pin to IPFS */}
              <div className="rounded-xl border border-black/5 dark:border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Upload className="size-3.5 text-[#805abe]" />
                  <span className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium">Pin to IPFS via Pinata</span>
                </div>

                {!pinnedURI ? (
                  <>
                    <button
                      onClick={handlePin}
                      disabled={pinning || !PINATA_JWT}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#805abe]/10 border border-[#805abe]/20 text-[#805abe] text-sm font-degular-medium hover:bg-[#805abe]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      {pinning ? (
                        <><Loader2 className="size-4 animate-spin" /> Uploading...</>
                      ) : (
                        <><Upload className="size-4" /> Pin Metadata to IPFS</>
                      )}
                    </button>
                    {!PINATA_JWT && (
                      <p className="mt-2 text-[11px] text-amber-400 font-degular">
                        Set NEXT_PUBLIC_PINATA_JWT in .env.local to enable IPFS pinning.
                      </p>
                    )}
                    {pinError && (
                      <p className="mt-2 text-[11px] text-red-400 font-degular break-all">{pinError}</p>
                    )}
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-emerald-400 font-degular">
                      <CheckCircle2 className="size-4" /> Pinned successfully!
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs text-text/60 font-mono truncate">{pinnedURI}</code>
                      <button onClick={() => copyToClipboard(pinnedURI)} className="text-text/40 hover:text-[#805abe] transition-colors">
                        <Copy className="size-3.5" />
                      </button>
                      <a
                        href={`${PINATA_GATEWAY}/ipfs/${pinnedCID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text/40 hover:text-[#805abe] transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Success */}
              {createConfirmed && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-emerald-400 text-xs font-degular-medium flex items-center gap-2">
                  <CheckCircle2 className="size-4" />
                  Job created successfully!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-black/10 dark:border-white/10 shrink-0">
          {/* Left: Back button */}
          <div>
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-text hover:text-heading text-sm font-degular-medium transition-all"
              >
                <ChevronLeft className="size-4" /> Back
              </button>
            )}
          </div>

          {/* Right: Next / Submit */}
          <div className="flex gap-3">
            {step === 0 && (
              <button
                onClick={() => setStep(1)}
                disabled={!canProceedStep0}
                className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-[#805abe] hover:bg-[#9370cb] text-white text-sm font-degular-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="size-4" />
              </button>
            )}

            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-[#805abe] hover:bg-[#9370cb] text-white text-sm font-degular-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Review &amp; Pin <ChevronRight className="size-4" />
              </button>
            )}

            {step === 2 && !createConfirmed && (
              <>
                {needsApproval ? (
                  <button
                    onClick={handleApprove}
                    disabled={!isConnected || !payout || !pinnedURI || isApproving || isApproveConfirming}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-degular-medium text-sm transition-all hover:bg-amber-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {(isApproving || isApproveConfirming) && <Loader2 className="size-4 animate-spin" />}
                    {isApproveConfirming ? 'Confirming...' : isApproving ? 'Approve in wallet...' : 'Approve $AGIALPHA'}
                  </button>
                ) : (
                  <button
                    onClick={handleCreateJob}
                    disabled={!isConnected || !pinnedURI || !payout || !duration || isCreating || isCreateConfirming}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#805abe] hover:bg-[#9370cb] text-white font-degular-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {(isCreating || isCreateConfirming) && <Loader2 className="size-4 animate-spin" />}
                    {isCreateConfirming ? 'Confirming...' : isCreating ? 'Confirm in wallet...' : 'Create Job'}
                  </button>
                )}
              </>
            )}

            {step === 2 && createConfirmed && (
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-degular-medium text-sm transition-all hover:bg-emerald-500/30"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── List Editor Component ──────────────────────────────────────────────────

function ListEditor({
  label,
  icon,
  items,
  placeholder,
  onUpdate,
  onAdd,
  onRemove,
}: {
  label: string;
  icon: React.ReactNode;
  items: string[];
  placeholder: string;
  onUpdate: (index: number, val: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div>
      <label className="text-[10px] text-text/40 uppercase tracking-wider font-degular-medium flex items-center gap-1">
        {icon} {label}
      </label>
      <div className="space-y-2 mt-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-text/20 text-xs font-mono shrink-0 w-4 text-right">{i + 1}.</span>
            <input
              value={item}
              onChange={(e) => onUpdate(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-heading text-xs font-degular placeholder:text-text/20 focus:border-[#805abe]/50 focus:outline-none transition-colors"
            />
            {items.length > 1 && (
              <button
                onClick={() => onRemove(i)}
                className="text-text/20 hover:text-red-400 transition-colors shrink-0"
              >
                <Trash2 className="size-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onAdd}
        className="mt-2 flex items-center gap-1 text-[11px] text-text/40 hover:text-[#805abe] font-degular-medium transition-colors"
      >
        <Plus className="size-3" /> Add {label.toLowerCase().replace(/s$/, '')}
      </button>
    </div>
  );
}
