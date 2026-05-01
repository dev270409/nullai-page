# NULLAI Protocol — V2 Landing Page

## Original Problem Statement
Content-only V2 upgrade of the NULLAI landing page for **Base Mainnet live status**, preserving the black-first cyber-tech identity, large `0` logomark, and minimalist composition. Add: top status banner, mainnet hero copy, smart contracts panel with copy + BaseScan, audit verdict (Antigravity AI, 01/05/26), V2 features grid, whitepaper section (6 numbered passages), tokenomics panel, and updated socials (X / Telegram).

## Architecture & Tech Stack
- **Frontend:** React (CRA + craco), Tailwind CSS, lucide-react icons, JetBrains Mono typography.
- **Backend:** FastAPI (template, untouched — site is fully static/content-driven).
- **Single source of truth:** `/app/frontend/src/config/siteConfig.js` (status, banner, hero, links, contracts, audit, features, whitepaper, tokenomics, footer).

## User Personas
- **Crypto investors / community members** evaluating mainnet readiness, audit, and tokenomics.
- **Technical reviewers** copying contract addresses and verifying on BaseScan.
- **Newcomers** reading the whitepaper to understand the autonomous scarcity thesis.

## Core Requirements (static)
- Black-first composition with subtle Base-blue (#0052FF) accents.
- All status copy points to **LIVE ON BASE MAINNET / V2 SECURED**.
- CTA `Launchpad Incoming` rendered as active placeholder (`href="#"`, disabled styling) until PinkSale URL is ready.
- Every interactive element exposes a `data-testid`.

## What's Been Implemented (2026-01)
- `TopBanner` — `MAINNET PROTOCOL DEPLOYED — V2 SECURED`.
- `HeroSection` — `The Autonomous Scarcity Organism` headline, live status pill, large `0` logomark with Base-blue conic glow, primary CTA `Launchpad Incoming` + secondary `Read the Manifesto`.
- `PrimaryContractBox` — Official Contract Address (NULLAI Token) with copy-to-clipboard.
- `ContractsList` — 3-row table (NULLAI Token / VortexEngine / OracleManager) each with copy button + BaseScan external link.
- `AuditBadge` — `VERDICT: SAFE FOR MAINNET` · Antigravity AI · 01/05/26.
- `FeaturesGrid` — 5 cards: Anti-Flashloan TWAP Oracle, Vortex Engine, Reentrancy Protected Reserves, Adaptive Entropy Tax, Hardware-Bound Governance.
- `WhitepaperSection` — 6 numbered passages (Thesis, Vision, Core Architecture, Mainnet Security Model, Economic Logic, Protocol Philosophy).
- `TokenomicsPanel` — **Live On-Chain telemetry** (Total Supply / Burned / Burn Ratio + Scarcity Pulse) polling every 15s via public Base RPC failover (llamarpc → publicnode → blastapi → 1rpc → mainnet.base.org). Static V2 spec values preserved as a second row. Powered by `useNullaiOnChain` hook (read-only `eth_call` for `totalSupply()` + `decimals()`, no API keys). Auto-fallback to static numbers if every RPC fails.
- `VortexEventTicker` — **Bloomberg-style live event stream** (NEW). Reads NULLAI token Transfer events via `eth_getLogs` on Base mainnet (last 500 blocks), classifies each as BURN / TAX / VORTEX / FLOW based on counter-party, fetches block timestamps for relative-time display, polls every 20s. Empty state shows "AWAITING EVENTS · VORTEX IDLE" (correct on-chain outcome — token has zero Transfers as of deployment). Each row links to BaseScan transaction. Built on shared `BASE_RPC_URLS` failover chain.
- `Footer` — X, Telegram, Whitepaper / Contracts / Audit anchors, disclaimer, launchpad placeholder.

## Verification
- `iteration_1.json` — V2 content suite: 100% spec coverage, 0 bugs, 0 console errors.
- `iteration_2.json` — Live on-chain tokenomics: 100% (10/10 assertions). RPC settled on `base.publicnode.com`, scarcity pulse `BEATING`, refresh button working.
- `iteration_3.json` — Code-quality refactor regression: 100%, 0 console errors, 0 React key warnings.
- `iteration_4.json` — Vortex Event Ticker: 100% (12/12 assertions). Empty state matches on-chain truth.

## Prioritized Backlog
- **P1** Replace `Launchpad Incoming` with `JOIN THE FAIR LAUNCH ON PINKSALE` once PinkSale URL is live (`siteConfig.links.pinksale`).
- **P2** Add live on-chain telemetry (circulating supply / holders count) via a Base RPC call.
- **P2** Add hover-to-copy short addresses + toast confirmation reuse from `sonner`.
- **P3** Add a downloadable PDF of the whitepaper.
- **P3** SEO: OG image + `<meta>` social cards.

## Next Tasks
1. Provide final PinkSale URL → flip CTA + footer launchpad row.
2. Optional: integrate a one-shot Base RPC call to render live total supply.
