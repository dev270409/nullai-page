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

// ERC-20 Transfer(address indexed from, address indexed to, uint256 value) topic0
export const ERC20_TRANSFER_TOPIC0 =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

// Vortex / system addresses
export const VORTEX_ENGINE_ADDRESS =
  "0xCfd7B82bbcDdDE5ec4F9c1DC93B3E75eFDaBD6c7";
export const ORACLE_MANAGER_ADDRESS =
  "0x966e642b582790D997db2F7d657b01B91544c451";
export const BURN_ADDRESSES = Object.freeze([
  "0x000000000000000000000000000000000000dead",
  "0x0000000000000000000000000000000000000000",
]);

// Vortex event ticker config
export const TICKER_POLL_INTERVAL_MS = 20_000;
export const TICKER_LOOKBACK_BLOCKS = 500; // ~16 min on Base (2s blocks)
export const TICKER_MAX_EVENTS = 24;
