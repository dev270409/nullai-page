import React from "react";
import { siteConfig } from "@/config/siteConfig";

export default function TopBanner() {
  return (
    <div
      data-testid="top-banner"
      className="w-full border-b border-[#0a2a66] bg-black"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-2.5 font-mono text-[11px] tracking-[0.18em] text-white/80 sm:text-[12px]">
        <div className="flex items-center gap-3">
          <span
            data-testid="top-banner-status-dot"
            className="relative inline-flex h-1.5 w-1.5"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3D7BFF] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3D7BFF]" />
          </span>
          <span data-testid="top-banner-text" className="uppercase">
            {siteConfig.banner}
          </span>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <span className="uppercase text-white/40">SYS // BASE</span>
          <span className="uppercase text-[#3D7BFF]">v{siteConfig.version}</span>
        </div>
      </div>
    </div>
  );
}
