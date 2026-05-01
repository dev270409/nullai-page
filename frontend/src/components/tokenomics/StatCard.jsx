import React from "react";

/**
 * Generic live-telemetry stat card used in the Tokenomics live grid.
 */
export default function StatCard({
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
