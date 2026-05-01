import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { ArrowUpRight, Lock } from "lucide-react";
import HeroLogomark from "@/components/hero/HeroLogomark";
import HeroStatStrip from "@/components/hero/HeroStatStrip";

function HeroBackdrop() {
  return (
    <>
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
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,82,255,0.18), rgba(0,82,255,0))",
        }}
      />
    </>
  );
}

function HeroPills({ status, version }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
      <span
        data-testid="hero-status-pill"
        className="inline-flex items-center gap-2 rounded-full border border-[#0052FF]/40 bg-[#0052FF]/10 px-3 py-1 text-[#9DB8FF]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#3D7BFF]" />
        {status}
      </span>
      <span className="text-white/35">/</span>
      <span className="text-white/55">PROTOCOL · V{version}</span>
      <span className="text-white/35">/</span>
      <span className="text-white/55">BASE CHAIN</span>
    </div>
  );
}

function HeroCTAs({ hero, manifestoHref }) {
  return (
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
        href={manifestoHref}
        className="group inline-flex items-center gap-2 border border-white/10 px-5 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#0052FF]/60 hover:text-white"
      >
        Read the Manifesto
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

export default function HeroSection() {
  const { hero, status, version, links } = siteConfig;
  const titleWords = hero.title.split(" ");
  const titleHead = titleWords.slice(0, -1).join(" ");
  const titleTail = titleWords.slice(-1).join(" ");

  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden border-b border-white/5"
    >
      <HeroBackdrop />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 pb-28 pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-36 lg:pt-24">
        <div className="lg:col-span-7">
          <HeroPills status={status} version={version} />

          <h1
            data-testid="hero-title"
            className="font-mono text-[44px] leading-[1.02] tracking-[-0.02em] text-white sm:text-[58px] lg:text-[76px]"
          >
            {titleHead} <span className="text-white/55">{titleTail}</span>
          </h1>

          <p
            data-testid="hero-subtitle"
            className="mt-7 max-w-xl font-mono text-[13.5px] leading-[1.7] text-white/60 sm:text-[14.5px]"
          >
            {hero.subtitle}
          </p>

          <HeroCTAs hero={hero} manifestoHref={links.whitepaper} />
          <HeroStatStrip />
        </div>

        <div className="relative lg:col-span-5">
          <HeroLogomark />
        </div>
      </div>
    </section>
  );
}
