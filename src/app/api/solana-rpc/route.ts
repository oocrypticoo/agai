import { NextRequest, NextResponse } from 'next/server';

const RPCS = [
  process.env.SOLANA_RPC_PRIVATE,
  'https://api.mainnet-beta.solana.com',
  'https://solana-mainnet.g.alchemy.com/v2/demo',
  'https://rpc.ankr.com/solana',
].filter(Boolean) as string[];

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  let lastError = '';
  for (const rpc of RPCS) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
      lastError = `${rpc}: ${res.status}`;
    } catch (err) {
      lastError = `${rpc}: ${err instanceof Error ? err.message : 'unknown'}`;
    }
  }

  return NextResponse.json({ error: lastError }, { status: 502 });
}
