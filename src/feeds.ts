import yaml from "js-yaml";
import { readFileSync } from "fs";

export function loadFeeds() {
  const doc: any = yaml.load(
    readFileSync("sources/feeds.yaml", "utf-8")
  );

  const tiers = Object.entries(doc.feeds).map(
    ([tier, data]: any) => ({
      tier,
      weight: data.weight,
      description: data.description,
      rss: data.rss ?? [],
    })
  );

  // Normalize scrape URLs to support both string and object format
  const scrapeConfig = doc.scrape_sources || doc.crawl_sources;
  const scrapeUrls = scrapeConfig?.urls?.map((item: any) => {
    if (typeof item === 'string') {
      return { url: item, requireFirecrawl: false };
    }
    return { url: item.url, requireFirecrawl: item.requireFirecrawl || false };
  }) || [];

  return {
    tiers,
    scrape: { urls: scrapeUrls },
    meta: doc.meta,
  };
}
