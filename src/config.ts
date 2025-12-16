export const TIER_RULES: Record<string, { cap: number; rotate: boolean }> = {
  tier_security_critical: { cap: 6, rotate: false },
  tier_1_core: { cap: 8, rotate: false },
  tier_2_platform: { cap: 6, rotate: true },
  tier_3_devops: { cap: 6, rotate: true },
  tier_security_general: { cap: 5, rotate: true },
  tier_4_ai_systems: { cap: 4, rotate: true },
  tier_5_research: { cap: 2, rotate: true },
};

export const SOURCE_COOLDOWN_DAYS = 2;

export const SECURITY_KEYWORDS = [
  "cve-",
  "zero-day",
  "actively exploited",
  "rce",
  "privilege escalation",
  "supply chain",
  "kubernetes",
  "container escape",
  "iam",
  "oauth",
  "misconfiguration",
  "breach",
  "incident",
];

