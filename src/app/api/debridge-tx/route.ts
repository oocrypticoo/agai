import { NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { DeBridgeSolanaClient } from '@debridge-finance/solana-contracts-client';

const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://rpc.ankr.com/solana';
const SOLANA_CHAIN_ID = 7565164;
const ETH_CHAIN_ID = 1;
const AGIALPHA_MINT = 'tWKHzXd5PRmxTF5cMfJkm2Ua3TcjwNNoSRUqx6Apump';

// Cache the client across requests
let cachedClient: DeBridgeSolanaClient | null = null;
let cachedConnection: Connection | null = null;

async function getClient() {
  if (!cachedConnection) {
    cachedConnection = new Connection(SOLANA_RPC, 'confirmed');
  }
  if (!cachedClient) {
    cachedClient = new DeBridgeSolanaClient(cachedConnection, SOLANA_CHAIN_ID);
    await cachedClient.init();
  }
  return { client: cachedClient, connection: cachedConnection };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { senderAddress, recipientEthAddress, amountRaw } = body;

    if (!senderAddress || !recipientEthAddress || !amountRaw) {
      return NextResponse.json(
        { error: 'Missing required fields: senderAddress, recipientEthAddress, amountRaw' },
        { status: 400 },
      );
    }

    const { client, connection } = await getClient();

    const sender = new PublicKey(senderAddress);
    const tokenMint = new PublicKey(AGIALPHA_MINT);
    const receiverHex = recipientEthAddress.startsWith('0x')
      ? recipientEthAddress
      : `0x${recipientEthAddress}`;

    // Build send instruction via deBridge SDK (runs in Node.js — no WASM issues)
    const { transaction: sendTx } = await client.buildSendInstruction(
      sender,
      null,                    // auto-derive ATA
      BigInt(amountRaw),
      tokenMint,
      receiverHex,             // receiver on Ethereum
      ETH_CHAIN_ID,
      false,                   // useAssetFee = false (pay in SOL)
      0,                       // referralCode
      receiverHex,             // fallbackAddress
    );

    // Build the transaction
    const tx = new Transaction();
    tx.add(...sendTx.instructions);
    tx.feePayer = sender;
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    tx.recentBlockhash = blockhash;

    // Serialize unsigned for client-side signing
    const serialized = tx.serialize({ requireAllSignatures: false }).toString('base64');

    return NextResponse.json({
      transaction: serialized,
      blockhash,
      lastValidBlockHeight,
    });
  } catch (err: unknown) {
    console.error('debridge-tx API error:', err);
    // Reset cached client on error so next request re-initializes
    cachedClient = null;
    cachedConnection = null;
    let message = 'Failed to build bridge transaction';
    if (err instanceof Error) {
      message = err.message || err.toString();
      if (err.stack) console.error('Stack:', err.stack);
    } else if (typeof err === 'string') {
      message = err;
    } else {
      try { message = JSON.stringify(err); } catch { /* ignore */ }
    }
    return NextResponse.json(
      { error: message, type: err?.constructor?.name },
      { status: 500 },
    );
  }
}
