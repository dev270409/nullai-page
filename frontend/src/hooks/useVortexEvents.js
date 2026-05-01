import { useEffect, useRef, useState, useCallback } from "react";
import {
  BASE_RPC_URLS,
  BURN_ADDRESSES,
  ERC20_TRANSFER_TOPIC0,
  NULLAI_TOKEN_ADDRESS,
  TICKER_LOOKBACK_BLOCKS,
  TICKER_MAX_EVENTS,
  TICKER_POLL_INTERVAL_MS,
  VORTEX_ENGINE_ADDRESS,
} from "@/config/constants";

/**
 * Streams the latest classified Transfer activity for the NULLAI token from
 * Base mainnet via eth_getLogs (read-only, no API key required).
 *
 * Each event is decoded + classified as:
 *   BURN     → transfer to 0x..dead / 0x..0000
 *   TAX      → transfer to the VortexEngine
 *   VORTEX   → transfer from the VortexEngine
 *   FLOW     → any other transfer (regular swap / wallet activity)
 *
 * Block timestamps are fetched once per unique block (cached for the session).
 */

// ─── RPC primitives ────────────────────────────────────────────────────────
let rpcRequestCounter = 0;

async function rpc(rpcUrl, method, params) {
  rpcRequestCounter += 1;
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: rpcRequestCounter,
      method,
      params,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`RPC HTTP ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message || "RPC error");
  return json.result;
}

async function rpcWithFailover(rpcList, method, params, preferredRef) {
  const ordered = preferredRef?.current
    ? [preferredRef.current, ...rpcList.filter((u) => u !== preferredRef.current)]
    : rpcList;

  let lastError = null;
  for (const url of ordered) {
    try {
      const result = await rpc(url, method, params);
      if (preferredRef) preferredRef.current = url;
      return { result, rpcUsed: url };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("All RPC endpoints failed");
}

// ─── Decoding helpers ───────────────────────────────────────────────────────
function topicToAddress(topicHex) {
  // 32-byte left-padded address → take last 20 bytes
  return ("0x" + topicHex.slice(-40)).toLowerCase();
}

function classifyTransfer(toAddr, fromAddr) {
  const lcTo = toAddr.toLowerCase();
  const lcFrom = fromAddr.toLowerCase();
  const vortex = VORTEX_ENGINE_ADDRESS.toLowerCase();
  if (BURN_ADDRESSES.includes(lcTo)) return "BURN";
  if (lcTo === vortex) return "TAX";
  if (lcFrom === vortex) return "VORTEX";
  return "FLOW";
}

function rawHexToHumanNumber(dataHex, decimals) {
  // dataHex is the raw 32-byte uint256 — convert via BigInt then scale.
  const raw = BigInt(dataHex);
  if (decimals === 0) return Number(raw);
  const s = raw.toString().padStart(decimals + 1, "0");
  const intPart = s.slice(0, s.length - decimals);
  const fracPart = s.slice(s.length - decimals).slice(0, 2);
  return parseFloat(`${intPart}.${fracPart}`);
}

function shortAddress(addr) {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

// ─── Hook ───────────────────────────────────────────────────────────────────
export function useVortexEvents({
  rpcUrls = BASE_RPC_URLS,
  intervalMs = TICKER_POLL_INTERVAL_MS,
  lookbackBlocks = TICKER_LOOKBACK_BLOCKS,
  maxEvents = TICKER_MAX_EVENTS,
  decimals = 18,
} = {}) {
  const [state, setState] = useState({
    status: "idle", // 'idle' | 'live' | 'fallback'
    events: [],
    lastSyncMs: null,
    rpcUsed: null,
    error: null,
  });

  const aliveRef = useRef(true);
  const preferredRpcRef = useRef(null);
  const blockTimestampCacheRef = useRef(new Map()); // blockNumber(hex) → seconds

  const fetchOnce = useCallback(async () => {
    try {
      // 1. Latest block number
      const { result: latestHex } = await rpcWithFailover(
        rpcUrls,
        "eth_blockNumber",
        [],
        preferredRpcRef,
      );
      const latest = Number(BigInt(latestHex));
      const fromBlock = Math.max(0, latest - lookbackBlocks);

      // 2. Get logs (Transfer events on NULLAI token)
      const { result: logs, rpcUsed } = await rpcWithFailover(
        rpcUrls,
        "eth_getLogs",
        [
          {
            address: NULLAI_TOKEN_ADDRESS,
            topics: [ERC20_TRANSFER_TOPIC0],
            fromBlock: "0x" + fromBlock.toString(16),
            toBlock: "latest",
          },
        ],
        preferredRpcRef,
      );

      const safeLogs = Array.isArray(logs) ? logs : [];

      // 3. Resolve unique block timestamps (cached)
      const uniqueBlocks = [
        ...new Set(safeLogs.map((l) => l.blockNumber)),
      ].filter((bn) => !blockTimestampCacheRef.current.has(bn));

      await Promise.all(
        uniqueBlocks.map(async (bn) => {
          try {
            const { result: block } = await rpcWithFailover(
              rpcUrls,
              "eth_getBlockByNumber",
              [bn, false],
              preferredRpcRef,
            );
            if (block?.timestamp) {
              blockTimestampCacheRef.current.set(
                bn,
                Number(BigInt(block.timestamp)) * 1000,
              );
            }
          } catch {
            // tolerate per-block failures — event will fall back to "—"
          }
        }),
      );

      // 4. Decode + classify
      const decoded = safeLogs
        .map((log) => {
          const fromAddr = topicToAddress(log.topics[1] || "0x" + "0".repeat(64));
          const toAddr = topicToAddress(log.topics[2] || "0x" + "0".repeat(64));
          const amount = rawHexToHumanNumber(log.data || "0x0", decimals);
          const kind = classifyTransfer(toAddr, fromAddr);
          const ts = blockTimestampCacheRef.current.get(log.blockNumber) || null;
          return {
            id: `${log.transactionHash}-${log.logIndex}`,
            txHash: log.transactionHash,
            blockNumber: Number(BigInt(log.blockNumber)),
            kind,
            from: fromAddr,
            to: toAddr,
            fromShort: shortAddress(fromAddr),
            toShort: shortAddress(toAddr),
            amount,
            tsMs: ts,
          };
        })
        .sort((a, b) => b.blockNumber - a.blockNumber)
        .slice(0, maxEvents);

      if (!aliveRef.current) return;
      setState({
        status: "live",
        events: decoded,
        lastSyncMs: Date.now(),
        rpcUsed,
        error: null,
      });
    } catch (err) {
      if (!aliveRef.current) return;
      // eslint-disable-next-line no-console
      console.warn("[NULLAI] Vortex events fetch failed:", err?.message || err);
      setState((prev) => ({
        ...prev,
        status: prev.status === "live" ? "live" : "fallback",
        error: err?.message || "RPC failure",
        lastSyncMs: prev.lastSyncMs ?? Date.now(),
      }));
    }
  }, [rpcUrls, lookbackBlocks, maxEvents, decimals]);

  useEffect(() => {
    aliveRef.current = true;
    fetchOnce();
    const handle = setInterval(fetchOnce, intervalMs);
    return () => {
      aliveRef.current = false;
      clearInterval(handle);
    };
  }, [fetchOnce, intervalMs]);

  return {
    ...state,
    refresh: fetchOnce,
  };
}
