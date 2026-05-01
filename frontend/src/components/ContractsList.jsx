import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { COPY_FEEDBACK_MS } from "@/config/constants";
import { Copy, Check, ExternalLink } from "lucide-react";

function ContractRow({ contract, idx }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contract.address);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(
        `[NULLAI] Failed to copy ${contract.label} address:`,
        err,
      );
    }
  };

  const baseScanUrl = `https://basescan.org/address/${contract.address}`;

  return (
    <div
      data-testid={`contract-row-${contract.label.toLowerCase().replace(/\s+/g, "-")}`}
      className="group grid grid-cols-1 items-center gap-4 border-t border-white/10 px-6 py-5 transition-colors hover:bg-[#0052FF]/[0.04] md:grid-cols-[80px_1fr_auto] md:gap-6 md:px-8"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/35">
        {String(idx + 1).padStart(2, "0")}
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9DB8FF]">
          {contract.label}
          <span className="ml-2 text-white/30">// {contract.role}</span>
        </div>
        <div
          data-testid={`contract-address-${contract.label.toLowerCase().replace(/\s+/g, "-")}`}
          className="mt-2 truncate font-mono text-[13px] text-white sm:text-[14.5px]"
          title={contract.address}
        >
          {contract.address}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          data-testid={`contract-copy-${contract.label.toLowerCase().replace(/\s+/g, "-")}`}
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-2 border border-white/10 bg-transparent px-3.5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:border-[#0052FF]/60 hover:text-white"
          aria-label={`Copy ${contract.label} address`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#3D7BFF]" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
        <a
          data-testid={`contract-scan-${contract.label.toLowerCase().replace(/\s+/g, "-")}`}
          href={baseScanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white/10 px-3.5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:border-[#0052FF]/60 hover:text-white"
          aria-label={`View ${contract.label} on BaseScan`}
        >
          BaseScan
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

export default function ContractsList() {
  return (
    <section
      data-testid="contracts-section"
      id="contracts"
      className="mx-auto max-w-[1400px] px-6 pt-20"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[#3D7BFF]">
            // 02 — Deployment
          </div>
          <h2 className="mt-3 font-mono text-[28px] tracking-[-0.01em] text-white sm:text-[36px]">
            Smart Contracts
          </h2>
        </div>
        <div className="hidden font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/40 sm:block">
          BASE MAINNET
        </div>
      </div>

      <div className="border border-white/10 bg-white/[0.015]">
        <div className="grid grid-cols-1 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35 md:grid-cols-[80px_1fr_auto] md:gap-6 md:px-8">
          <div>Idx</div>
          <div>Contract / Address</div>
          <div className="hidden md:block">Actions</div>
        </div>
        {siteConfig.contracts.map((c, i) => (
          <ContractRow key={c.label} contract={c} idx={i} />
        ))}
      </div>
    </section>
  );
}
