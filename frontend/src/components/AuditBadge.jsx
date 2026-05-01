import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { CheckCircle2 } from "lucide-react";

export default function AuditBadge() {
  const { audit } = siteConfig;

  return (
    <section
      data-testid="audit-section"
      id="audit"
      className="mx-auto max-w-[1400px] px-6 pt-20"
    >
      <div className="relative grid grid-cols-1 gap-0 border border-[#0052FF]/30 bg-black md:grid-cols-[1fr_auto]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#0052FF]"
        />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/40">
            <span className="h-1.5 w-1.5 bg-[#3D7BFF]" />
            System Verification
          </div>
          <div
            data-testid="audit-verdict"
            className="mt-3 flex items-center gap-3 font-mono text-[20px] tracking-[-0.005em] text-white sm:text-[26px]"
          >
            <CheckCircle2 className="h-5 w-5 text-[#3D7BFF]" />
            {audit.verdict}
          </div>
          <div
            data-testid="audit-note"
            className="mt-3 font-mono text-[12.5px] text-white/55"
          >
            {audit.note}
          </div>
        </div>
        <div className="flex items-center justify-end gap-6 border-t border-white/10 px-6 py-5 font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/45 md:border-l md:border-t-0 md:px-8">
          <div className="flex flex-col gap-1">
            <span className="text-white/35">Auditor</span>
            <span className="text-white">Antigravity AI</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/35">Date</span>
            <span className="text-white">01/05/26</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/35">State</span>
            <span className="text-[#3D7BFF]">PASS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
