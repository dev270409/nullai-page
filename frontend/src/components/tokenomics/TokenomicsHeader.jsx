import React from "react";
import { RefreshCw } from "lucide-react";
import {
  MINUTE_IN_MS,
  RECENT_SYNC_THRESHOLD_MS,
  SECOND_IN_MS,
} from "@/config/constants";

function relativeTime(ms) {
  if (!ms) return "—";
  const diff = Math.max(0, Date.now() - ms);
  if (diff < RECENT_SYNC_THRESHOLD_MS) return "just now";
  if (diff < MINUTE_IN_MS) return `${Math.floor(diff / SECOND_IN_MS)}s ago`;
  return `${Math.floor(diff / MINUTE_IN_MS)}m ago`;
}

export default function TokenomicsHeader({ isLive, lastSyncMs, onRefresh }) {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
      <div>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[#3D7BFF]">
          // 05 — Supply Telemetry
        </div>
        <h2 className="mt-3 font-mono text-[28px] tracking-[-0.01em] text-white sm:text-[36px]">
          Tokenomics <span className="text-white/45">/ Live On-Chain</span>
        </h2>
      </div>
      <div
        data-testid="tokenomics-rpc-status"
        className="inline-flex items-center gap-3 border border-white/10 px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.22em]"
      >
        <span
          className={`h-1.5 w-1.5 ${
            isLive ? "animate-pulse bg-[#3D7BFF]" : "bg-white/40"
          }`}
        />
        <span className={isLive ? "text-white" : "text-white/55"}>
          {isLive ? "RPC · BASE MAINNET" : "RPC · FALLBACK"}
        </span>
        <span className="text-white/35">|</span>
        <span className="text-white/45">
          sync · {relativeTime(lastSyncMs)}
        </span>
        <button
          type="button"
          onClick={onRefresh}
          data-testid="tokenomics-refresh-btn"
          className="ml-1 inline-flex items-center gap-1 text-white/55 transition-colors hover:text-[#3D7BFF]"
          aria-label="Refresh on-chain data"
        >
          <RefreshCw className="h-3 w-3" />
          sync
        </button>
      </div>
    </div>
  );
}
