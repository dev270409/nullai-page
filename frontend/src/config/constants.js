// Shared, reusable constants for the NULLAI front-end.
// Centralised so values aren't duplicated across components.

export const COPY_FEEDBACK_MS = 1600;
export const MINUTE_IN_MS = 60_000;
export const SECOND_IN_MS = 1_000;
export const POLLING_INTERVAL_MS = 15_000;
export const RECENT_SYNC_THRESHOLD_MS = 2_000;

// On-chain
export const NULLAI_TOKEN_ADDRESS =
  "0x86aC40CD4c57f68E89c515BF45d9fD19d7CcF095";
export const ORIGINAL_SUPPLY_NULLAI = 1_000_000_000; // 1B

// Public Base mainnet RPC endpoints (no API key) used as a failover chain.
export const BASE_RPC_URLS = Object.freeze([
  "https://base.llamarpc.com",
  "https://base.publicnode.com",
  "https://base-mainnet.public.blastapi.io",
  "https://1rpc.io/base",
  "https://mainnet.base.org",
]);

// ERC-20 read selectors
export const ERC20_TOTAL_SUPPLY_SELECTOR = "0x18160ddd";
export const ERC20_DECIMALS_SELECTOR = "0x313ce567";
