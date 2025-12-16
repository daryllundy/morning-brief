import { shouldInclude } from "./rotation";
import { SOURCE_COOLDOWN_DAYS, TIER_RULES } from "./config";

export function selectArticles(
  articles: any[],
  tiers: any[],
  history: Record<string, string>
) {
  const selected: any[] = [];

  for (const tier of tiers) {
    const rule = TIER_RULES[tier.tier];
    if (!rule) continue;

    const tierItems = articles
      .filter(a => a.tier === tier.tier)
      .sort((a, b) => b.weight - a.weight);

    const filtered = rule.rotate
      ? tierItems.filter(a =>
          shouldInclude(a.source, history, SOURCE_COOLDOWN_DAYS)
        )
      : tierItems;

    const capped = filtered.slice(0, rule.cap);

    for (const item of capped) {
      selected.push({
        ...item,
        why: `Tier: ${tier.tier} — ${tier.description}`,
      });
      history[item.source] = new Date().toISOString();
    }
  }

  return selected;
}

