import React from "react";
import { siteConfig } from "@/config/siteConfig";

export default function FeaturesGrid() {
  return (
    <section
      data-testid="features-section"
      id="features"
      className="mx-auto max-w-[1400px] px-6 pt-24"
    >
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[#3D7BFF]">
            // 03 — Capabilities
          </div>
          <h2 className="mt-3 max-w-2xl font-mono text-[28px] leading-tight tracking-[-0.01em] text-white sm:text-[36px]">
            Technical Capabilities <span className="text-white/45">/ V2</span>
          </h2>
        </div>
        <div className="hidden font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/40 md:block">
          MAINNET ACTIVE
        </div>
      </div>

      <div
        className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        {siteConfig.features.map((f, i) => (
          <div
            key={f.id}
            data-testid={`feature-card-${f.id}`}
            className="group relative flex flex-col gap-5 bg-black p-7 transition-colors hover:bg-[#03102b]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/40">
                {String(i + 1).padStart(2, "0")} / SYSTEM
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#3D7BFF] opacity-60 transition-opacity group-hover:opacity-100" />
            </div>
            <h3 className="font-mono text-[18px] leading-snug tracking-[-0.005em] text-white">
              {f.title}
            </h3>
            <p className="font-mono text-[13px] leading-[1.65] text-white/55">
              {f.body}
            </p>
            <div className="mt-auto pt-4 font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/30">
              status · <span className="text-[#3D7BFF]">active</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
