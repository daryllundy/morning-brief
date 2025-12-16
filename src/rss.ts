import Parser from "rss-parser";
import { subHours, isAfter } from "date-fns";
import { log } from "./logger";

const parser = new Parser();

export async function collectRSS(tiers: any[], hours: number) {
  const cutoff = subHours(new Date(), hours);
  const results: any[] = [];

  for (const tier of tiers) {
    for (const url of tier.rss) {
      try {
        const feed = await parser.parseURL(url);
        for (const item of feed.items) {
          if (!item.pubDate) continue;

          const published = new Date(item.pubDate);
          if (isAfter(published, cutoff)) {
            results.push({
              title: item.title,
              link: item.link,
              source: feed.title,
              tier: tier.tier,
              weight: tier.weight,
              published,
            });
          }
        }
      } catch {
        log(`RSS failed: ${url}`);
      }
    }
  }

  return results;
}

