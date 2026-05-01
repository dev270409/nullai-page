import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Live on-chain telemetry for the NULLAI token on Base Mainnet.
 *
 * Reads:
 *   - totalSupply()    selector 0x18160ddd
 *   - decimals()       selector 0x313ce567 (cached after first read)
 *
 * Polls every `intervalMs` (default 15s).
 * Uses public Base RPC by default — no API key required, read-only.
 *
 * Returns a stable shape so the UI can always render either live or fallback values.
 */

const DEFAULT_RPCS = [
  "https://base.llamarpc.com",
  "https://base.publicnode.com",
  "https://base-mainnet.public.blastapi.io",
  "https://1rpc.io/base",
  "https://mainnet.base.org",
];
const TOKEN_ADDRESS = "0x86aC40CD4c57f68E89c515BF45d9fD19d7CcF095";
const ORIGINAL_SUPPLY = 1_000_000_000; // 1,000,000,000 NULLAI

const SEL_TOTAL_SUPPLY = "0x18160ddd";
const SEL_DECIMALS = "0x313ce567";

async function ethCall(rpcUrl, to, data) {
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "eth_call",
      params: [{ to, data }, "latest"],
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`RPC HTTP ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message || "RPC error");
  if (!json.result || json.result === "0x") throw new Error("Empty RPC result");
  return json.result; // hex string
}

/**
 * Try a list of RPC endpoints in order, returning the first successful result.
 * Records the endpoint that worked so subsequent calls reuse it for the session.
 */
async function ethCallWithFailover(rpcList, to, data, preferredRef) {
  const ordered = preferredRef?.current
    ? [preferredRef.current, ...rpcList.filter((u) => u !== preferredRef.current)]
    : rpcList;

  let lastError = null;
  for (const url of ordered) {
    try {
      const result = await ethCall(url, to, data);
      if (preferredRef) preferredRef.current = url;
      return { result, rpcUsed: url };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("All RPC endpoints failed");
}

function hexToBigInt(hex) {
  return BigInt(hex);
}

/**
 * Convert raw token units (BigInt) into a JS Number with two-decimal precision.
 * Safe for large supplies because we slice the string before converting.
 */
function rawToNumber(rawBig, decimals) {
  if (decimals === 0) return Number(rawBig);
  const s = rawBig.toString().padStart(decimals + 1, "0");
  const intPart = s.slice(0, s.length - decimals);
  const fracPart = s.slice(s.length - decimals).slice(0, 4); // 4 dp internal
  return parseFloat(`${intPart}.${fracPart}`);
}

function formatWithCommas(n, fractionDigits = 0) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function useNullaiOnChain({
  rpcUrls = DEFAULT_RPCS,
  intervalMs = 15_000,
} = {}) {
  const [state, setState] = useState({
    status: "idle", // 'idle' | 'loading' | 'live' | 'fallback'
    totalSupply: ORIGINAL_SUPPLY,
    burned: 0,
    burnRatio: 0, // percentage 0..100
    decimals: 18,
    lastSyncMs: null,
    error: null,
    pulse: 0, // increments every successful poll → drives animations
    rpcUsed: null,
  });

  const decimalsRef = useRef(null);
  const aliveRef = useRef(true);
  const timerRef = useRef(null);
  const preferredRpcRef = useRef(null);

  const fetchOnce = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      status: prev.status === "live" ? "live" : "loading",
    }));
    try {
      // Fetch decimals once (cached)
      if (decimalsRef.current == null) {
        const { result: decHex } = await ethCallWithFailover(
          rpcUrls,
          TOKEN_ADDRESS,
          SEL_DECIMALS,
          preferredRpcRef,
        );
        decimalsRef.current = Number(hexToBigInt(decHex));
      }
      const decimals = decimalsRef.current;

      const { result: tsHex, rpcUsed } = await ethCallWithFailover(
        rpcUrls,
        TOKEN_ADDRESS,
        SEL_TOTAL_SUPPLY,
        preferredRpcRef,
      );
      const tsRaw = hexToBigInt(tsHex);
      const totalSupplyHuman = rawToNumber(tsRaw, decimals);
      const burned = Math.max(ORIGINAL_SUPPLY - totalSupplyHuman, 0);
      const burnRatio = (burned / ORIGINAL_SUPPLY) * 100;

      if (!aliveRef.current) return;
      setState((prev) => ({
        status: "live",
        totalSupply: totalSupplyHuman,
        burned,
        burnRatio,
        decimals,
        lastSyncMs: Date.now(),
        error: null,
        pulse: prev.pulse + 1,
        rpcUsed,
      }));
    } catch (err) {
      if (!aliveRef.current) return;
      setState((prev) => ({
        ...prev,
        status: prev.status === "live" ? "live" : "fallback",
        error: err?.message || "RPC failure",
        lastSyncMs: prev.lastSyncMs ?? Date.now(),
      }));
    }
  }, [rpcUrls]);

  useEffect(() => {
    aliveRef.current = true;
    fetchOnce();
    timerRef.current = setInterval(fetchOnce, intervalMs);
    return () => {
      aliveRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchOnce, intervalMs]);

  return {
    ...state,
    originalSupply: ORIGINAL_SUPPLY,
    tokenAddress: TOKEN_ADDRESS,
    rpcUrls,
    refresh: fetchOnce,
    format: formatWithCommas,
  };
}
