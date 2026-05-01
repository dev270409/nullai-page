import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { ArrowUpRight, Lock } from "lucide-react";

export default function HeroSection() {
  const { hero, status } = siteConfig;

  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden border-b border-white/5"
    >
      {/* Grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 30% 40%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 40%, #000 30%, transparent 75%)",
        }}
      />
      {/* Soft base-blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,82,255,0.18), rgba(0,82,255,0))",
        }}
      />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 pb-28 pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-36 lg:pt-24">
        {/* Left: copy */}
        <div className="lg:col-span-7">
          <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
            <span
              data-testid="hero-status-pill"
              className="inline-flex items-center gap-2 rounded-full border border-[#0052FF]/40 bg-[#0052FF]/10 px-3 py-1 text-[#9DB8FF]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#3D7BFF]" />
              {status}
            </span>
            <span className="text-white/35">/</span>
            <span className="text-white/55">PROTOCOL · V{siteConfig.version}</span>
            <span className="text-white/35">/</span>
            <span className="text-white/55">BASE CHAIN</span>
          </div>

          <h1
            data-testid="hero-title"
            className="font-mono text-[44px] leading-[1.02] tracking-[-0.02em] text-white sm:text-[58px] lg:text-[76px]"
          >
            {hero.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-white/55">{hero.title.split(" ").slice(-1)}</span>
          </h1>

          <p
            data-testid="hero-subtitle"
            className="mt-7 max-w-xl font-mono text-[13.5px] leading-[1.7] text-white/60 sm:text-[14.5px]"
          >
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              data-testid="hero-cta-primary"
              type="button"
              disabled
              aria-disabled="true"
              className="group inline-flex cursor-not-allowed items-center gap-3 border border-white/15 bg-white/[0.03] px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 transition-colors"
            >
              <Lock className="h-3.5 w-3.5 text-[#3D7BFF]" />
              {hero.ctaPrimary}
              <span className="ml-1 text-white/35">// SOON</span>
            </button>
            <a
              data-testid="hero-cta-manifesto"
              href={siteConfig.links.whitepaper}
              className="group inline-flex items-center gap-2 border border-white/10 px-5 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#0052FF]/60 hover:text-white"
            >
              Read the Manifesto
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-px border border-white/10 bg-white/[0.02] font-mono text-[10.5px] uppercase tracking-[0.16em]">
            {[
              { k: "Chain", v: "Base" },
              { k: "Status", v: "Live" },
              { k: "Audit", v: "Safe" },
            ].map((item) => (
              <div
                key={item.k}
                className="flex flex-col gap-1 bg-black px-4 py-3"
              >
                <span className="text-white/35">{item.k}</span>
                <span className="text-white">{item.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 0 logomark */}
        <div className="relative lg:col-span-5">
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
              style={{
                fontWeight: 300,
                textShadow: "0 0 80px rgba(0,82,255,0.2)",
              }}
            >
              0
            </span>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
              NULLAI / SCARCITY ENGINE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
