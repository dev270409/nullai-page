import React from "react";
import { siteConfig } from "@/config/siteConfig";

export default function WhitepaperSection() {
  const { sections } = siteConfig.whitepaper;

  return (
    <section
      data-testid="whitepaper-section"
      id="whitepaper"
      className="mx-auto max-w-[1400px] px-6 pt-24"
    >
      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[#3D7BFF]">
            // 04 — Doctrine
          </div>
          <h2 className="mt-3 font-mono text-[34px] leading-[1.05] tracking-[-0.012em] text-white sm:text-[44px]">
            Whitepaper
          </h2>
          <p className="mt-5 font-mono text-[13px] leading-[1.7] text-white/55">
            Six numbered passages framing NULLAI as a scarcity machine — not a
            standard token. Read sequentially, or skim by index.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 border border-white/10 px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/55">
            <span className="h-1.5 w-1.5 bg-[#3D7BFF]" />
            Living document · v{siteConfig.version}
          </div>
        </div>

        <div className="lg:col-span-8">
          <ol className="border-l border-white/10">
            {sections.map((s) => (
              <li
                key={s.id}
                data-testid={`whitepaper-${s.id}`}
                className="relative grid grid-cols-1 gap-6 py-7 pl-8 sm:grid-cols-[80px_1fr] sm:gap-10"
              >
                <span
                  aria-hidden
                  className="absolute left-[-5px] top-9 h-2.5 w-2.5 rotate-45 border border-[#0052FF]/60 bg-black"
                />
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/35">
                  {s.index} / {s.heading}
                </div>
                <div>
                  <h3 className="font-mono text-[20px] leading-snug tracking-[-0.005em] text-white">
                    {s.heading}
                  </h3>
                  {s.body &&
                    s.body.map((p) => (
                      <p
                        key={`${s.id}-p-${p.slice(0, 32)}`}
                        className="mt-3 font-mono text-[13.5px] leading-[1.75] text-white/65"
                      >
                        {p}
                      </p>
                    ))}
                  {s.list && (
                    <ul className="mt-4 grid gap-2.5">
                      {s.list.map((item) => (
                        <li
                          key={`${s.id}-li-${item.slice(0, 32)}`}
                          className="flex gap-3 font-mono text-[13px] leading-[1.65] text-white/65"
                        >
                          <span className="mt-2 h-px w-3 shrink-0 bg-[#3D7BFF]/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
