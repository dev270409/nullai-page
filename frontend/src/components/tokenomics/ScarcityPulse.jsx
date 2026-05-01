import React from "react";
import { Activity } from "lucide-react";

const PULSE_BAR_MIN_PCT = 0.25;

/**
 * Animated scarcity meter — burn ratio with a heartbeat marker.
 * Keyframes for `scarcityHeartbeat` live in App.css.
 */
export default function ScarcityPulse({ ratio, pulse, live }) {
  const clamped = Math.max(0, Math.min(100, ratio));
  const barWidthPct = Math.max(clamped, PULSE_BAR_MIN_PCT);

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

      <div className="relative h-1.5 w-full overflow-hidden bg-white/[0.06]">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0052FF] via-[#3D7BFF] to-white"
          style={{
            width: `${barWidthPct}%`,
            transition: "width 700ms cubic-bezier(.2,.8,.2,1)",
          }}
        />
        <div
          key={pulse}
          className="absolute inset-y-0 w-[2px] bg-white/80"
          style={{
            left: `${barWidthPct}%`,
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
