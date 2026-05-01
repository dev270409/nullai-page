import React from "react";
import { siteConfig } from "@/config/siteConfig";

export default function TokenomicsPanel() {
  const { items } = siteConfig.tokenomics;

  return (
    <section
      data-testid="tokenomics-section"
      id="tokenomics"
      className="mx-auto max-w-[1400px] px-6 pt-24"
    >
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[#3D7BFF]">
            // 05 — Supply Telemetry
          </div>
          <h2 className="mt-3 font-mono text-[28px] tracking-[-0.01em] text-white sm:text-[36px]">
            Tokenomics
          </h2>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/45 md:flex">
          <span className="h-1.5 w-1.5 animate-pulse bg-[#3D7BFF]" />
          Real-time data panel
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
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
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#3D7BFF]">
                LIVE
              </span>
            </div>
            <div className="font-mono text-[18px] leading-snug tracking-[-0.005em] text-white sm:text-[20px]">
              {item.value}
            </div>
            <div className="mt-auto h-px w-full bg-gradient-to-r from-[#0052FF]/60 via-[#0052FF]/20 to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}
