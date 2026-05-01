import React from "react";
import { useVortexEvents } from "@/hooks/useVortexEvents";
import {
  MINUTE_IN_MS,
  RECENT_SYNC_THRESHOLD_MS,
  SECOND_IN_MS,
  TICKER_POLL_INTERVAL_MS,
} from "@/config/constants";
import { ArrowUpRight, Flame, Zap, Activity, RefreshCw } from "lucide-react";

const KIND_STYLES = {
  BURN: {
    color: "text-[#FF7A59]",
    border: "border-[#FF7A59]/30",
    bg: "bg-[#FF7A59]/[0.06]",
    label: "BURN",
    icon: Flame,
  },
  TAX: {
    color: "text-[#3D7BFF]",
    border: "border-[#0052FF]/40",
    bg: "bg-[#0052FF]/[0.07]",
    label: "TAX → VORTEX",
    icon: Zap,
  },
  VORTEX: {
    color: "text-[#9DB8FF]",
    border: "border-[#9DB8FF]/30",
    bg: "bg-[#9DB8FF]/[0.05]",
    label: "VORTEX OUT",
    icon: Activity,
  },
  FLOW: {
    color: "text-white/70",
    border: "border-white/10",
    bg: "bg-white/[0.02]",
    label: "TRANSFER",
    icon: ArrowUpRight,
  },
};

function relativeAge(ms) {
  if (!ms) return "—";
  const diff = Math.max(0, Date.now() - ms);
  if (diff < RECENT_SYNC_THRESHOLD_MS) return "now";
  if (diff < MINUTE_IN_MS) return `${Math.floor(diff / SECOND_IN_MS)}s`;
  if (diff < 60 * MINUTE_IN_MS) return `${Math.floor(diff / MINUTE_IN_MS)}m`;
  return `${Math.floor(diff / (60 * MINUTE_IN_MS))}h`;
}

function formatAmount(n) {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  if (n < 0.01) return n.toExponential(2);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function TickerHeader({ status, lastSyncMs, count, onRefresh }) {
  const isLive = status === "live";
  return (
    <div className="flex flex-col items-start justify-between gap-3 border-b border-white/10 px-5 py-3 md:flex-row md:items-center">
      <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]">
        <span
          className={`inline-flex h-1.5 w-1.5 ${
            isLive ? "animate-pulse bg-[#3D7BFF]" : "bg-white/30"
          }`}
        />
        <span className="text-white">// Vortex Event Stream</span>
        <span className="text-white/35">|</span>
        <span className="text-white/45">{count} events buffered</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
        <span>last sync · {relativeAge(lastSyncMs)} ago</span>
        <button
          type="button"
          onClick={onRefresh}
          data-testid="vortex-ticker-refresh-btn"
          className="inline-flex items-center gap-1 transition-colors hover:text-[#3D7BFF]"
          aria-label="Refresh Vortex event stream"
        >
          <RefreshCw className="h-3 w-3" />
          refresh
        </button>
      </div>
    </div>
  );
}

function TickerRow({ ev }) {
  const style = KIND_STYLES[ev.kind] || KIND_STYLES.FLOW;
  const Icon = style.icon;
  return (
    <div
      data-testid={`vortex-ticker-row-${ev.id}`}
      className={`grid grid-cols-[60px_120px_1fr_120px_auto] items-center gap-4 border-b border-white/[0.04] px-5 py-3 font-mono text-[12px] transition-colors hover:bg-white/[0.025] ${style.bg}`}
    >
      <span className="text-[10.5px] uppercase tracking-[0.22em] text-white/40">
        {relativeAge(ev.tsMs)}
      </span>
      <span
        className={`inline-flex items-center gap-2 border ${style.border} px-2 py-1 text-[10px] uppercase tracking-[0.24em] ${style.color}`}
      >
        <Icon className="h-3 w-3" />
        {style.label}
      </span>
      <span className="text-white/80">
        {formatAmount(ev.amount)}{" "}
        <span className="text-white/35">NULLAI</span>{" "}
        <span className="text-white/35">·</span>{" "}
        <span className="text-white/45">
          {ev.fromShort} → {ev.toShort}
        </span>
      </span>
      <span className="text-[10.5px] uppercase tracking-[0.22em] text-white/35">
        block #{ev.blockNumber}
      </span>
      <a
        href={`https://basescan.org/tx/${ev.txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-[#3D7BFF]"
        aria-label="View transaction on BaseScan"
      >
        {ev.txHash.slice(0, 6)}…{ev.txHash.slice(-4)}
        <ArrowUpRight className="h-3 w-3" />
      </a>
    </div>
  );
}

function TickerEmpty({ status }) {
  return (
    <div
      data-testid="vortex-ticker-empty"
      className="flex items-center justify-between gap-4 px-5 py-10 font-mono text-[11px] uppercase tracking-[0.28em] text-white/40"
    >
      <div className="flex items-center gap-3">
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3D7BFF] opacity-50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3D7BFF]" />
        </span>
        <span>
          {status === "fallback"
            ? "rpc · stream temporarily unavailable"
            : "awaiting events · vortex idle"}
        </span>
      </div>
      <span className="text-white/30">
        polling every {TICKER_POLL_INTERVAL_MS / SECOND_IN_MS}s · last 500 blocks
      </span>
    </div>
  );
}

export default function VortexEventTicker() {
  const stream = useVortexEvents();

  return (
    <section
      data-testid="vortex-ticker-section"
      id="vortex-ticker"
      className="mx-auto mt-10 max-w-[1400px] px-6"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[#3D7BFF]">
            // 06 — Live Stream
          </div>
          <h3 className="mt-2 font-mono text-[20px] tracking-[-0.005em] text-white sm:text-[24px]">
            Vortex Event Ticker
            <span className="text-white/35"> / on-chain truth</span>
          </h3>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 md:flex">
          <span>eth_getLogs · base mainnet</span>
        </div>
      </div>

      <div
        data-testid="vortex-ticker-shell"
        className="overflow-hidden border border-white/10 bg-black"
      >
        <TickerHeader
          status={stream.status}
          lastSyncMs={stream.lastSyncMs}
          count={stream.events.length}
          onRefresh={stream.refresh}
        />

        {stream.events.length === 0 ? (
          <TickerEmpty status={stream.status} />
        ) : (
          <div data-testid="vortex-ticker-list">
            {stream.events.map((ev) => (
              <TickerRow key={ev.id} ev={ev} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
