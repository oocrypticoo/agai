import { NextRequest, NextResponse } from 'next/server';

const PINATA_JWT = process.env.PINATA_JWT ?? '';
const PINATA_GATEWAY = process.env.PINATA_GATEWAY ?? 'https://gateway.pinata.cloud';

export async function POST(req: NextRequest) {
  if (!PINATA_JWT) {
    return NextResponse.json(
      { error: 'IPFS pinning not configured. Set PINATA_JWT in environment variables.' },
      { status: 503 },
    );
  }

  let body: { json: object; name: string };
  try {
    body = await req.json();
    if (!body.json || !body.name) throw new Error('missing fields');
  } catch {
    return NextResponse.json({ error: 'Invalid request. Expected { json, name }.' }, { status: 400 });
  }

  try {
    const blob = new Blob([JSON.stringify(body.json, null, 2)], { type: 'application/json' });
    const formData = new FormData();
    formData.append('file', blob, `${body.name}.json`);
    formData.append('pinataMetadata', JSON.stringify({ name: body.name }));

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: { Authorization: `Bearer ${PINATA_JWT}` },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Pinata upload failed: ${res.status} ${text}` }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({
      uri: `ipfs://${data.IpfsHash}`,
      cid: data.IpfsHash,
      gateway: `${PINATA_GATEWAY}/ipfs/${data.IpfsHash}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed' },
      { status: 500 },
    );
  }
}
