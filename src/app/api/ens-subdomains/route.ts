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

// Priority order for agent subdomains — alpha variants have higher payout tier
function sortAgentPriority(names: string[]): string[] {
  return [...names].sort((a, b) => {
    const aAlpha = a.includes('.alpha.agent.agi.eth') ? 0 : 1;
    const bAlpha = b.includes('.alpha.agent.agi.eth') ? 0 : 1;
    return aAlpha - bAlpha;
  });
}

function sortClubPriority(names: string[]): string[] {
  return [...names].sort((a, b) => {
    const aAlpha = a.includes('.alpha.club.agi.eth') ? 0 : 1;
    const bAlpha = b.includes('.alpha.club.agi.eth') ? 0 : 1;
    return aAlpha - bAlpha;
  });
}

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address')?.toLowerCase();
  if (!address || !/^0x[a-f0-9]{40}$/.test(address)) {
    return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
  }

  // Query both owned and wrapped domains
  const query = `{
    domains(where: {owner: "${address}"}, first: 100) {
      name
    }
    wrappedDomains(where: {owner: "${address}"}, first: 100) {
      name
      domain { name }
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
        const allNames: string[] = [];

        if (json.data.domains) {
          for (const d of json.data.domains) {
            if (d.name) allNames.push(d.name);
          }
        }

        if (json.data.wrappedDomains) {
          for (const d of json.data.wrappedDomains) {
            // wrappedDomains may expose name directly or via domain.name
            const name = d.name ?? d.domain?.name;
            if (name) allNames.push(name);
          }
        }

        // Deduplicate
        const unique = [...new Set(allNames)];

        // Collect all matching agent/club subdomains
        const agentNames = sortAgentPriority(
          unique.filter(n => n.endsWith('.agent.agi.eth'))
        );
        const clubNames = sortClubPriority(
          unique.filter(n => n.endsWith('.club.agi.eth'))
        );

        // Best (highest payout priority) is first after sort
        const agent = agentNames[0] ?? null;
        const club = clubNames[0] ?? null;

        return NextResponse.json(
          { agent, club, agents: agentNames, clubs: clubNames, all: unique },
          { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
        );
      }
      lastError = `${endpoint}: no data in response`;
    } catch (err) {
      lastError = `${endpoint}: ${err instanceof Error ? err.message : 'unknown'}`;
    }
  }

  return NextResponse.json({ agent: null, club: null, agents: [], clubs: [], error: lastError }, { status: 502 });
}
