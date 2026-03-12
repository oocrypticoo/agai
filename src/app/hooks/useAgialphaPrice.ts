"use client";
import { useState, useEffect, useCallback } from "react";

const POLL_INTERVAL = 5 * 60_000; // 5 minutes
const DEXSCREENER_URL =
  "https://api.dexscreener.com/latest/dex/tokens/0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA";

interface PriceData {
  priceUsd: number | null;
  priceChange24h: number | null;
}

let cachedPrice: PriceData = { priceUsd: null, priceChange24h: null };
let lastFetch = 0;
let fetchPromise: Promise<PriceData> | null = null;

async function fetchPrice(): Promise<PriceData> {
  const now = Date.now();
  // Return cache if fresh
  if (cachedPrice.priceUsd !== null && now - lastFetch < POLL_INTERVAL) {
    return cachedPrice;
  }
  // Deduplicate in-flight requests
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const res = await fetch(DEXSCREENER_URL);
      const json = await res.json();
      const pair = json?.pairs?.[0];
      if (pair) {
        cachedPrice = {
          priceUsd: parseFloat(pair.priceUsd),
          priceChange24h: pair.priceChange?.h24 ? parseFloat(pair.priceChange.h24) : null,
        };
        lastFetch = Date.now();
      }
    } catch {
      // keep previous cached value
    }
    fetchPromise = null;
    return cachedPrice;
  })();

  return fetchPromise;
}

export function useAgialphaPrice(): PriceData {
  const [price, setPrice] = useState<PriceData>(cachedPrice);

  const refresh = useCallback(async () => {
    const data = await fetchPrice();
    setPrice({ ...data });
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  return price;
}
