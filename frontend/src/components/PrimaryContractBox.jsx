import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { COPY_FEEDBACK_MS } from "@/config/constants";
import { Copy, Check, Shield } from "lucide-react";

export default function PrimaryContractBox() {
  const { primaryContract } = siteConfig;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(primaryContract.address);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[NULLAI] Failed to copy primary contract address:", err);
    }
  };

  return (
    <section
      data-testid="primary-contract-box"
      className="relative mx-auto max-w-[1400px] px-6 pt-16"
    >
      <div className="relative border border-[#0052FF]/30 bg-gradient-to-br from-[#04122e] via-black to-black p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-px left-0 h-px w-32 bg-[#3D7BFF]"
        />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center border border-[#0052FF]/40 bg-[#0052FF]/10">
              <Shield className="h-4 w-4 text-[#3D7BFF]" />
            </div>
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[#9DB8FF]">
                {primaryContract.label}
              </div>
              <div
                data-testid="primary-contract-address"
                className="mt-2 break-all font-mono text-[14px] text-white sm:text-[16px]"
              >
                {primaryContract.address}
              </div>
              <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/40">
                {primaryContract.note}
              </div>
            </div>
          </div>
          <button
            data-testid="primary-contract-copy-btn"
            onClick={handleCopy}
            type="button"
            className="inline-flex items-center justify-center gap-2 self-start border border-white/15 bg-white/[0.03] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/85 transition-colors hover:border-[#0052FF]/60 hover:bg-[#0052FF]/10 hover:text-white sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#3D7BFF]" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy address
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
