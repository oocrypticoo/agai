import { NextRequest, NextResponse } from 'next/server';

const GRAPH_API_KEY = process.env.GRAPH_API_KEY ?? '';
const SUBGRAPH_ID = '5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH';

const ENDPOINTS = [
  // Hosted service (reliable, free)
  'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  // Decentralized network (requires API key)
  ...(GRAPH_API_KEY
    ? [`https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/${SUBGRAPH_ID}`]
    : []),
];

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address')?.toLowerCase();
  if (!address || !/^0x[a-f0-9]{40}$/.test(address)) {
    return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
  }

  // Query for domains owned by this address (both wrapped and unwrapped)
  const query = `{
    domains(where: {owner: "${address}"}, first: 100) {
      name
      labelName
      parent { name }
    }
    wrappedDomains(where: {owner: "${address}"}, first: 100) {
      name
      domain { parent { name } }
    }
  }`;

  let lastError = '';
  for (const endpoint of ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!res.ok) {
        lastError = `${endpoint}: ${res.status}`;
        continue;
      }

      const json = await res.json();
      if (json?.data) {
        // Extract agent and club subdomains from both queries
        const allNames: string[] = [];

        // From domains query
        if (json.data.domains) {
          for (const d of json.data.domains) {
            if (d.name) allNames.push(d.name);
          }
        }

        // From wrappedDomains query
        if (json.data.wrappedDomains) {
          for (const d of json.data.wrappedDomains) {
            if (d.name) allNames.push(d.name);
          }
        }

        // Deduplicate
        const unique = [...new Set(allNames)];

        // Find agent and club subdomains
        const agent = unique.find(n => n.endsWith('.agent.agi.eth')) ?? null;
        const club = unique.find(n => n.endsWith('.club.agi.eth')) ?? null;

        return NextResponse.json({ agent, club, all: unique }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
        });
      }
      lastError = `${endpoint}: no data in response`;
    } catch (err) {
      lastError = `${endpoint}: ${err instanceof Error ? err.message : 'unknown'}`;
    }
  }

  return NextResponse.json({ agent: null, club: null, error: lastError }, { status: 502 });
}
