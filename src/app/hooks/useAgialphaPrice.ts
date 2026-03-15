"use client";
import { useState, useEffect, useCallback } from "react";

const POLL_INTERVAL = 5 * 60_000; // 5 minutes

// GeckoTerminal pool endpoint — more reliable than DexScreener for this pool
const GECKO_URL =
  "https://api.geckoterminal.com/api/v2/networks/eth/pools/0x4b54f2736c729220aa14c06636dd5c92a85d69a5";

// DexScreener fallback
const DEXSCREENER_URL =
  "https://api.dexscreener.com/latest/dex/pairs/ethereum/0x4b54f2736c729220aa14c06636dd5c92a85d69a5";

interface PriceData {
  priceUsd: number | null;
  priceChange24h: number | null;
}

let cachedPrice: PriceData = { priceUsd: null, priceChange24h: null };
let lastFetch = 0;
let fetchPromise: Promise<PriceData> | null = null;

async function fetchPrice(): Promise<PriceData> {
  const now = Date.now();
  if (cachedPrice.priceUsd !== null && now - lastFetch < POLL_INTERVAL) {
    return cachedPrice;
  }
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    // Try GeckoTerminal first
    try {
      const res = await fetch(GECKO_URL);
      const json = await res.json();
      const pool = json?.data?.attributes;
      if (pool?.base_token_price_usd) {
        cachedPrice = {
          priceUsd: parseFloat(pool.base_token_price_usd),
          priceChange24h: pool.price_change_percentage?.h24
            ? parseFloat(pool.price_change_percentage.h24)
            : null,
        };
        lastFetch = Date.now();
        fetchPromise = null;
        return cachedPrice;
      }
    } catch {
      // fall through to DexScreener
    }

    // Fallback: DexScreener
    try {
      const res = await fetch(DEXSCREENER_URL);
      const json = await res.json();
      const pair = json?.pair ?? json?.pairs?.[0];
      if (pair?.priceUsd) {
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
