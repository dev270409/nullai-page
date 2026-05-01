import React from "react";

const STATS = [
  { k: "Chain", v: "Base" },
  { k: "Status", v: "Live" },
  { k: "Audit", v: "Safe" },
];

/**
 * Compact 3-cell technical strip displayed below the hero copy.
 */
export default function HeroStatStrip() {
  return (
    <div className="mt-12 grid max-w-md grid-cols-3 gap-px border border-white/10 bg-white/[0.02] font-mono text-[10.5px] uppercase tracking-[0.16em]">
      {STATS.map((item) => (
        <div key={item.k} className="flex flex-col gap-1 bg-black px-4 py-3">
          <span className="text-white/35">{item.k}</span>
          <span className="text-white">{item.v}</span>
        </div>
      ))}
    </div>
  );
}
