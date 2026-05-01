import { useEffect, useRef, useState, useCallback } from "react";
import {
  BASE_RPC_URLS,
  ERC20_DECIMALS_SELECTOR,
  ERC20_TOTAL_SUPPLY_SELECTOR,
  NULLAI_TOKEN_ADDRESS,
  ORIGINAL_SUPPLY_NULLAI,
  POLLING_INTERVAL_MS,
} from "@/config/constants";

/**
 * Live on-chain telemetry for the NULLAI token on Base Mainnet.
 *   - Polls totalSupply() every `intervalMs` (default 15s).
 *   - Reads decimals() once and caches it for the session.
 *   - Fails over across multiple public RPC endpoints (no API key required).
 *   - Returns a stable shape so the UI can always render either live or fallback values.
 */

// ─── RPC helpers ────────────────────────────────────────────────────────────
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
  return json.result;
}

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

// ─── Pure utilities (no React, no hooks) ────────────────────────────────────
function hexToBigInt(hex) {
  return BigInt(hex);
}

/**
 * Convert raw token units (BigInt) into a JS Number with 4dp internal precision.
 * Safe for very large supplies — strings are sliced before parseFloat.
 */
function rawToNumber(rawBig, decimals) {
  if (decimals === 0) return Number(rawBig);
  const s = rawBig.toString().padStart(decimals + 1, "0");
  const intPart = s.slice(0, s.length - decimals);
  const fracPart = s.slice(s.length - decimals).slice(0, 4);
  return parseFloat(`${intPart}.${fracPart}`);
}

function formatWithCommas(n, fractionDigits = 0) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function deriveSupplyMetrics(totalSupplyHuman) {
  const burned = Math.max(ORIGINAL_SUPPLY_NULLAI - totalSupplyHuman, 0);
  const burnRatio = (burned / ORIGINAL_SUPPLY_NULLAI) * 100;
  return { burned, burnRatio };
}

const INITIAL_STATE = {
  status: "idle", // 'idle' | 'loading' | 'live' | 'fallback'
  totalSupply: ORIGINAL_SUPPLY_NULLAI,
  burned: 0,
  burnRatio: 0,
  decimals: 18,
  lastSyncMs: null,
  error: null,
  pulse: 0,
  rpcUsed: null,
};

// ─── Hook ───────────────────────────────────────────────────────────────────
export function useNullaiOnChain({
  rpcUrls = BASE_RPC_URLS,
  intervalMs = POLLING_INTERVAL_MS,
} = {}) {
  const [state, setState] = useState(INITIAL_STATE);

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
      if (decimalsRef.current == null) {
        const { result: decHex } = await ethCallWithFailover(
          rpcUrls,
          NULLAI_TOKEN_ADDRESS,
          ERC20_DECIMALS_SELECTOR,
          preferredRpcRef,
        );
        decimalsRef.current = Number(hexToBigInt(decHex));
      }
      const decimals = decimalsRef.current;

      const { result: tsHex, rpcUsed } = await ethCallWithFailover(
        rpcUrls,
        NULLAI_TOKEN_ADDRESS,
        ERC20_TOTAL_SUPPLY_SELECTOR,
        preferredRpcRef,
      );
      const totalSupplyHuman = rawToNumber(hexToBigInt(tsHex), decimals);
      const { burned, burnRatio } = deriveSupplyMetrics(totalSupplyHuman);

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
      // Surface the failure in dev tools but keep the UI in fallback mode.
      // eslint-disable-next-line no-console
      console.warn("[NULLAI] RPC fetch failed:", err?.message || err);
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
    const handle = setInterval(fetchOnce, intervalMs);
    timerRef.current = handle;
    return () => {
      aliveRef.current = false;
      clearInterval(handle);
    };
  }, [fetchOnce, intervalMs]);

  return {
    ...state,
    originalSupply: ORIGINAL_SUPPLY_NULLAI,
    tokenAddress: NULLAI_TOKEN_ADDRESS,
    rpcUrls,
    refresh: fetchOnce,
    format: formatWithCommas,
  };
}
