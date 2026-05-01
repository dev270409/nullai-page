import React from "react";
import NullaiZeroMark from "@/components/brand/NullaiZeroMark";

/**
 * Concentric-rings + spinning conic accent + official `0` logomark
 * used in the hero. The mark itself is the SVG NullaiZeroMark.
 */
export default function HeroLogomark() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="absolute inset-6 rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden
        className="absolute inset-14 rounded-full border border-[#0052FF]/15"
      />
      <div
        aria-hidden
        className="absolute inset-0 animate-[spin_60s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(0,82,255,0.35) 18deg, transparent 60deg, transparent 360deg)",
          WebkitMask:
            "radial-gradient(circle, transparent 58%, #000 58.5%, #000 60%, transparent 60.5%)",
          mask:
            "radial-gradient(circle, transparent 58%, #000 58.5%, #000 60%, transparent 60.5%)",
        }}
      />
      <NullaiZeroMark
        data-testid="hero-logomark"
        title="NULLAI"
        className="relative h-[78%] w-auto text-white"
        style={{
          filter:
            "drop-shadow(0 0 32px rgba(0,82,255,0.28)) drop-shadow(0 0 4px rgba(255,255,255,0.08))",
        }}
      />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
        NULLAI / SCARCITY ENGINE
      </div>
    </div>
  );
}
