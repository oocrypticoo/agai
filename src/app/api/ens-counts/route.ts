import { NextResponse } from 'next/server';

const GRAPH_API_KEY = process.env.GRAPH_API_KEY ?? '';
const SUBGRAPH_ID = '5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH';

const ENDPOINTS = [
  ...(GRAPH_API_KEY
    ? [`https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/${SUBGRAPH_ID}`]
    : []),
  'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
];

const QUERY = `{
  validators: wrappedDomains(where: {name_ends_with: ".club.agi.eth"}, first: 1000) { id }
  agents: wrappedDomains(where: {name_ends_with: ".agent.agi.eth"}, first: 1000) { id }
}`;

export async function GET() {
  for (const endpoint of ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: QUERY }),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!res.ok) continue;

      const json = await res.json();
      if (json?.data) {
        return NextResponse.json(
          {
            validators: json.data.validators?.length ?? 0,
            agents: json.data.agents?.length ?? 0,
          },
          { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600' } }
        );
      }
    } catch {
      // try next endpoint
    }
  }

  return NextResponse.json({ validators: null, agents: null }, { status: 502 });
}
