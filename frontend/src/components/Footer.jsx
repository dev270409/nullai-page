import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { ArrowUpRight } from "lucide-react";

function FooterBrand() {
  return (
    <div className="lg:col-span-5">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[44px] leading-none text-white">0</span>
        <span className="font-mono text-[12px] uppercase tracking-[0.32em] text-white/55">
          NULLAI · v{siteConfig.version}
        </span>
      </div>
      <p
        data-testid="footer-disclaimer"
        className="mt-6 max-w-md font-mono text-[12.5px] leading-[1.7] text-white/45"
      >
        {siteConfig.footer.disclaimer}
      </p>
    </div>
  );
}

function FooterLink({ href, external = false, testId, children }) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      data-testid={testId}
      href={href}
      {...externalProps}
      className="group inline-flex items-center gap-2 transition-colors hover:text-[#3D7BFF]"
    >
      {children}
      {external ? (
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : null}
    </a>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/35">
        {title}
      </div>
      <ul className="grid gap-3 font-mono text-[13px] text-white/80">
        {children}
      </ul>
    </div>
  );
}

function FooterSocialColumn() {
  return (
    <FooterColumn title="Social">
      <li>
        <FooterLink href={siteConfig.links.x} external testId="footer-link-x">
          X / Twitter
        </FooterLink>
      </li>
      <li>
        <FooterLink
          href={siteConfig.links.telegram}
          external
          testId="footer-link-telegram"
        >
          Telegram
        </FooterLink>
      </li>
    </FooterColumn>
  );
}

function FooterProtocolColumn() {
  return (
    <FooterColumn title="Protocol">
      <li>
        <FooterLink href="#whitepaper" testId="footer-link-whitepaper">
          Whitepaper / Manifesto
        </FooterLink>
      </li>
      <li>
        <FooterLink href="#contracts" testId="footer-link-contracts">
          Smart Contracts
        </FooterLink>
      </li>
      <li>
        <FooterLink href="#audit" testId="footer-link-audit">
          Audit Report
        </FooterLink>
      </li>
    </FooterColumn>
  );
}

function FooterLaunchColumn() {
  return (
    <div>
      <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/35">
        Launch
      </div>
      <ul className="grid gap-3 font-mono text-[13px]">
        <li>
          <span
            data-testid="footer-launchpad-state"
            className="inline-flex items-center gap-2 text-white/55"
          >
            <span className="h-1.5 w-1.5 bg-[#3D7BFF]" />
            Launchpad Incoming
          </span>
        </li>
        <li className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
          PinkSale URL pending
        </li>
      </ul>
    </div>
  );
}

function FooterMeta() {
  return (
    <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} NULLAI Protocol · BASE MAINNET</span>
      <span className="text-[#3D7BFF]/70">
        MAINNET PROTOCOL DEPLOYED — V2 SECURED
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="mx-auto mt-32 max-w-[1400px] border-t border-white/10 px-6 pb-12 pt-16"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <FooterBrand />
        <div className="grid grid-cols-2 gap-10 lg:col-span-7 lg:grid-cols-3">
          <FooterSocialColumn />
          <FooterProtocolColumn />
          <FooterLaunchColumn />
        </div>
      </div>
      <FooterMeta />
    </footer>
  );
}
