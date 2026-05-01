import React from "react";

/**
 * Concentric-rings + spinning conic accent + giant `0` glyph used in the hero.
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
      <span
        data-testid="hero-logomark"
        className="relative font-mono text-[260px] leading-none text-white sm:text-[320px]"
        style={{ fontWeight: 300, textShadow: "0 0 80px rgba(0,82,255,0.2)" }}
      >
        0
      </span>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
        NULLAI / SCARCITY ENGINE
      </div>
    </div>
  );
}
