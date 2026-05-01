import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { useNullaiOnChain } from "@/hooks/useNullaiOnChain";
import { Activity, Flame, RefreshCw, Coins } from "lucide-react";

function StatCard({
  index,
  label,
  value,
  sub,
  live,
  pulse,
  testId,
  icon: Icon,
}) {
  return (
    <div
      data-testid={testId}
      className="relative flex flex-col gap-4 bg-black p-7"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/40">
          {index} / {label}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] ${
            live ? "text-[#3D7BFF]" : "text-white/35"
          }`}
        >
          <span
            key={pulse}
            className={`h-1.5 w-1.5 ${
              live ? "animate-ping bg-[#3D7BFF]" : "bg-white/30"
            }`}
            style={{ animationDuration: "1.2s", animationIterationCount: 1 }}
          />
          {live ? "LIVE" : "STATIC"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {Icon ? <Icon className="h-4 w-4 text-[#3D7BFF]" /> : null}
        <div className="font-mono text-[18px] leading-snug tracking-[-0.005em] text-white sm:text-[20px]">
          {value}
        </div>
      </div>
      {sub ? (
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
          {sub}
        </div>
      ) : null}
      <div className="mt-auto h-px w-full bg-gradient-to-r from-[#0052FF]/60 via-[#0052FF]/20 to-transparent" />
    </div>
  );
}

function ScarcityPulse({ ratio, pulse, live }) {
  const clamped = Math.max(0, Math.min(100, ratio));
  return (
    <div
      data-testid="scarcity-pulse"
      className="relative flex flex-col gap-4 bg-black p-7"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/40">
          // Scarcity Pulse
        </span>
        <span
          key={pulse}
          className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] ${
            live ? "text-[#3D7BFF]" : "text-white/35"
          }`}
        >
          <Activity
            className="h-3 w-3"
            style={{
              animation: live ? "pulse 1.6s ease-in-out infinite" : "none",
            }}
          />
          {live ? "BEATING" : "STAND-BY"}
        </span>
      </div>

      <div className="flex items-baseline gap-3">
        <div
          data-testid="scarcity-pulse-value"
          className="font-mono text-[36px] leading-none tracking-[-0.02em] text-white sm:text-[44px]"
          style={{
            textShadow: live ? "0 0 24px rgba(0,82,255,0.35)" : "none",
          }}
        >
          {clamped.toFixed(4)}
          <span className="text-white/45">%</span>
        </div>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/40">
          burn ratio
        </div>
      </div>

      {/* Bar */}
      <div className="relative h-1.5 w-full overflow-hidden bg-white/[0.06]">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0052FF] via-[#3D7BFF] to-white"
          style={{
            width: `${Math.max(clamped, 0.25)}%`,
            transition: "width 700ms cubic-bezier(.2,.8,.2,1)",
          }}
        />
        {/* Heartbeat marker */}
        <div
          key={pulse}
          className="absolute inset-y-0 w-[2px] bg-white/80"
          style={{
            left: `${Math.max(clamped, 0.25)}%`,
            transform: "translateX(-1px)",
            animation: "scarcityHeartbeat 1.2s ease-out 1",
          }}
        />
      </div>

      <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/35">
        {clamped <= 0
          ? "no compression yet · vortex idle"
          : "compression active · vortex extracting"}
      </div>
    </div>
  );
}

function relativeTime(ms) {
  if (!ms) return "—";
  const diff = Math.max(0, Date.now() - ms);
  if (diff < 2000) return "just now";
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  return `${Math.floor(diff / 60_000)}m ago`;
}

export default function TokenomicsPanel() {
  const chain = useNullaiOnChain({ intervalMs: 15_000 });
  const { items } = siteConfig.tokenomics;

  const isLive = chain.status === "live";
  const totalSupplyDisplay = `${chain.format(chain.totalSupply, 0)} NULLAI`;
  const burnedDisplay = `${chain.format(chain.burned, 0)} NULLAI`;
  const burnRatioDisplay = `${chain.burnRatio.toFixed(4)}%`;

  return (
    <section
      data-testid="tokenomics-section"
      id="tokenomics"
      className="mx-auto max-w-[1400px] px-6 pt-24"
    >
      <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[#3D7BFF]">
            // 05 — Supply Telemetry
          </div>
          <h2 className="mt-3 font-mono text-[28px] tracking-[-0.01em] text-white sm:text-[36px]">
            Tokenomics{" "}
            <span className="text-white/45">/ Live On-Chain</span>
          </h2>
        </div>
        <div
          data-testid="tokenomics-rpc-status"
          className="inline-flex items-center gap-3 border border-white/10 px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.22em]"
        >
          <span
            className={`h-1.5 w-1.5 ${
              isLive
                ? "animate-pulse bg-[#3D7BFF]"
                : "bg-white/40"
            }`}
          />
          <span className={isLive ? "text-white" : "text-white/55"}>
            {isLive ? "RPC · BASE MAINNET" : "RPC · FALLBACK"}
          </span>
          <span className="text-white/35">|</span>
          <span className="text-white/45">
            sync · {relativeTime(chain.lastSyncMs)}
          </span>
          <button
            type="button"
            onClick={chain.refresh}
            data-testid="tokenomics-refresh-btn"
            className="ml-1 inline-flex items-center gap-1 text-white/55 transition-colors hover:text-[#3D7BFF]"
            aria-label="Refresh on-chain data"
          >
            <RefreshCw className="h-3 w-3" />
            sync
          </button>
        </div>
      </div>

      {/* Live telemetry row */}
      <div
        data-testid="tokenomics-live-grid"
        className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          index="01"
          label="Total Supply (live)"
          value={totalSupplyDisplay}
          sub={`Original · ${chain.format(chain.originalSupply, 0)}`}
          live={isLive}
          pulse={chain.pulse}
          testId="tokenomics-live-totalsupply"
          icon={Coins}
        />
        <StatCard
          index="02"
          label="Burned"
          value={burnedDisplay}
          sub={
            chain.burned > 0
              ? "extracted by vortex engine"
              : "cooldown · no burns yet"
          }
          live={isLive}
          pulse={chain.pulse}
          testId="tokenomics-live-burned"
          icon={Flame}
        />
        <StatCard
          index="03"
          label="Burn Ratio"
          value={burnRatioDisplay}
          sub="of original 1B supply"
          live={isLive}
          pulse={chain.pulse}
          testId="tokenomics-live-burnratio"
          icon={Activity}
        />
        <ScarcityPulse
          ratio={chain.burnRatio}
          pulse={chain.pulse}
          live={isLive}
        />
      </div>

      {/* Static spec row (preserved) */}
      <div
        data-testid="tokenomics-static-grid"
        className="mt-px grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3"
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            data-testid={`tokenomics-item-${i}`}
            className="flex flex-col gap-4 bg-black p-7"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/40">
                {String(i + 1).padStart(2, "0")} / {item.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                STATIC
              </span>
            </div>
            <div className="font-mono text-[16px] leading-snug tracking-[-0.005em] text-white sm:text-[18px]">
              {item.value}
            </div>
            <div className="mt-auto h-px w-full bg-gradient-to-r from-[#0052FF]/60 via-[#0052FF]/20 to-transparent" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/35">
        <span>RPC ·</span>
        <span className="text-white/55">
          {chain.rpcUsed || "selecting endpoint…"}
        </span>
        <span>·</span>
        <span>contract ·</span>
        <a
          href={`https://basescan.org/address/${chain.tokenAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-white/70 transition-colors hover:text-[#3D7BFF]"
        >
          {chain.tokenAddress}
        </a>
      </div>
    </section>
  );
}
