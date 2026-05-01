import React from "react";

/**
 * Static V2 spec row preserved beneath the live telemetry grid.
 */
export default function TokenomicsStaticRow({ items }) {
  return (
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
  );
}
