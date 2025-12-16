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

export const CVE_KEYWORDS = [
  "cve-",
  "vulnerability",
  "zero-day",
  "0-day",
  "zero day",
  "actively exploited",
  "critical vulnerability",
  "high severity",
  "security advisory",
  "security bulletin",
  "patch now",
  "urgent patch",
  "exploit",
];

export const SECURITY_KEYWORDS = [
  "rce",
  "remote code execution",
  "privilege escalation",
  "supply chain attack",
  "container escape",
  "ransomware",
  "data breach",
  "breach",
  "incident",
  "compromised",
  "malware",
  "backdoor",
  "authentication bypass",
];

