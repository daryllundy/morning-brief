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

  return {
    tiers,
    crawl: doc.crawl_sources,
    meta: doc.meta,
  };
}
