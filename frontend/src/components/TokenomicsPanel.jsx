import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { useNullaiOnChain } from "@/hooks/useNullaiOnChain";
import { POLLING_INTERVAL_MS } from "@/config/constants";
import { Activity, Coins, Flame } from "lucide-react";

import StatCard from "@/components/tokenomics/StatCard";
import ScarcityPulse from "@/components/tokenomics/ScarcityPulse";
import TokenomicsStaticRow from "@/components/tokenomics/TokenomicsStaticRow";
import TokenomicsHeader from "@/components/tokenomics/TokenomicsHeader";

function TokenomicsFooterMeta({ rpcUsed, tokenAddress }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/35">
      <span>RPC ·</span>
      <span className="text-white/55">
        {rpcUsed || "selecting endpoint…"}
      </span>
      <span>·</span>
      <span>contract ·</span>
      <a
        href={`https://basescan.org/address/${tokenAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-white/70 transition-colors hover:text-[#3D7BFF]"
      >
        {tokenAddress}
      </a>
    </div>
  );
}

export default function TokenomicsPanel() {
  const chain = useNullaiOnChain({ intervalMs: POLLING_INTERVAL_MS });
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
      <TokenomicsHeader
        isLive={isLive}
        lastSyncMs={chain.lastSyncMs}
        onRefresh={chain.refresh}
      />

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

      <TokenomicsStaticRow items={siteConfig.tokenomics.items} />
      <TokenomicsFooterMeta
        rpcUsed={chain.rpcUsed}
        tokenAddress={chain.tokenAddress}
      />
    </section>
  );
}
