import { loadFeeds } from "./feeds";
import { collectRSS } from "./rss";
import { crawl } from "./firecrawl";
import { loadHistory, saveHistory } from "./rotation";
import { selectArticles } from "./selection";
import { generateFollowUps } from "./followups";
import { writeMarkdown } from "./markdown";
import { log } from "./logger";

async function run() {
  log("Morning brief started");

  const history = loadHistory();
  const { tiers, crawl: crawlCfg, meta } = loadFeeds();

  const rssRaw = await collectRSS(tiers, meta.time_window_hours);
  const selectedRSS = selectArticles(rssRaw, tiers, history);
  const followups = generateFollowUps(selectedRSS);
  const crawled = await crawl(crawlCfg.urls);

  const output = writeMarkdown(selectedRSS, crawled, followups);

  saveHistory(history);
  log(`Brief generated → ${output}`);
}

run();

