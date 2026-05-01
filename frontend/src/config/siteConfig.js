// NULLAI Protocol - V2 site configuration (single source of truth)
export const siteConfig = {
  name: "NULLAI",
  version: "2.0",
  status: "LIVE ON BASE MAINNET",
  banner: "MAINNET PROTOCOL DEPLOYED — V2 SECURED",
  hero: {
    title: "The Autonomous Scarcity Organism",
    subtitle:
      "A machine-defined protocol that compresses supply, regulates entropy, and binds authority to hardware-secured execution.",
    ctaPrimary: "Launchpad Incoming",
    ctaPrimaryHref: "#",
    ctaPrimaryDisabled: true,
  },
  links: {
    manifesto: "#whitepaper",
    whitepaper: "#whitepaper",
    x: "https://x.com/NULLAIPROTOCOL?s=20",
    telegram: "https://t.me/NULLAI_protocol",
    pinksale: "",
  },
  contracts: [
    {
      label: "NULLAI Token",
      address: "0x86aC40CD4c57f68E89c515BF45d9fD19d7CcF095",
      role: "Unit of scarcity",
    },
    {
      label: "VortexEngine",
      address: "0xCfd7B82bbcDdDE5ec4F9c1DC93B3E75eFDaBD6c7",
      role: "Dynamic IEC taxation",
    },
    {
      label: "OracleManager",
      address: "0x966e642b582790D997db2F7d657b01B91544c451",
      role: "Anti-manipulation defense",
    },
  ],
  primaryContract: {
    label: "Official Contract Address",
    address: "0x86aC40CD4c57f68E89c515BF45d9fD19d7CcF095",
    note: "NULLAI Token / Base Mainnet",
  },
  audit: {
    verdict: "VERDICT: SAFE FOR MAINNET",
    note: "Audit performed by Antigravity AI on 01/05/26",
  },
  features: [
    {
      id: "twap",
      title: "Anti-Flashloan TWAP Oracle",
      body: "Mainnet oracle protection designed to resist flash-loan price distortion. Ring-buffer-based price memory hardens market reads.",
    },
    {
      id: "vortex",
      title: "Vortex Engine",
      body: "Dynamic IEC taxation active with Patch-2 decimal precision. Coordinates fee extraction and internal balancing.",
    },
    {
      id: "reentrancy",
      title: "Reentrancy Protected Reserves",
      body: "Reserve-sensitive flows protected against recursive execution paths and re-entry vectors.",
    },
    {
      id: "entropy",
      title: "Adaptive Entropy Tax",
      body: "Cooldown-active taxation layer designed for live market conditions. Behavior adjusts under entropy pressure.",
    },
    {
      id: "tangem",
      title: "Hardware-Bound Governance",
      body: "Administrative control restricted to Tangem-backed hardware signature. No soft governance theater.",
    },
  ],
  whitepaper: {
    sections: [
      {
        id: "thesis",
        index: "01",
        heading: "Thesis",
        body: [
          "NULLAI is an autonomous scarcity organism deployed on Base Mainnet.",
          "It is designed to compress supply, regulate entropy, and execute protocol logic through machine-defined rules rather than human discretion.",
        ],
      },
      {
        id: "vision",
        index: "02",
        heading: "Vision",
        list: [
          "Transform tokenomics into an adaptive, self-regulating system.",
          "Remove discretionary human governance from the core protocol path.",
          "Bind authority to hardware-secured execution.",
          "Make scarcity measurable, visible, and cryptographically enforced.",
        ],
      },
      {
        id: "architecture",
        index: "03",
        heading: "Core Architecture",
        list: [
          "NULLAI Token — the unit of scarcity and market interaction.",
          "VortexEngine — dynamic fee and reserve coordination layer.",
          "OracleManager — market-state observer and anti-manipulation defense.",
          "Tangem-secured admin path for hardware-bound control surfaces.",
        ],
      },
      {
        id: "security",
        index: "04",
        heading: "Mainnet Security Model",
        list: [
          "Anti-Flashloan TWAP Oracle.",
          "Ring-buffer-based price memory.",
          "Reentrancy-protected reserve interactions.",
          "Hardware-signature-restricted admin actions.",
          "Mainnet-verified contract deployment.",
        ],
      },
      {
        id: "economics",
        index: "05",
        heading: "Economic Logic",
        list: [
          "Adaptive Entropy Tax adjusts protocol behavior under live market conditions.",
          "Vortex system coordinates fee extraction and internal balancing.",
          "Scarcity is treated as an engineered outcome, not a narrative promise.",
        ],
      },
      {
        id: "philosophy",
        index: "06",
        heading: "Protocol Philosophy",
        list: [
          "No human promises.",
          "No soft governance theater.",
          "No marketing abstractions at the core layer.",
          "Only deployed logic, enforced constraints, and observable outcomes.",
        ],
      },
    ],
  },
  tokenomics: {
    items: [
      { label: "Total Supply", value: "1,000,000,000 NULLAI" },
      { label: "Initial Circulating Supply", value: "1,000,000 NULLAI (0.1%)" },
      {
        label: "Liquidity Status",
        value: "100% of liquidity raised on PinkSale will be automatically locked",
      },
    ],
  },
  footer: {
    disclaimer:
      "NULLAI is a live synthetic experiment on Base Mainnet. No human promises. Only code.",
  },
};
