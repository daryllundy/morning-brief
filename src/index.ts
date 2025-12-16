import { loadFeeds } from "./feeds";
import { collectRSS } from "./rss";
import { scrape } from "./firecrawl";
import { loadHistory, saveHistory } from "./rotation";
import { selectArticles } from "./selection";
import { generateFollowUps } from "./followups";
import { writeMarkdown } from "./markdown";
import { log } from "./logger";

async function run() {
  log("Morning brief started");

  const history = loadHistory();
  const { tiers, scrape: scrapeCfg, meta } = loadFeeds();

  const rssRaw = await collectRSS(tiers, meta.time_window_hours);
  const selectedRSS = selectArticles(rssRaw, tiers, history);
  const followups = generateFollowUps(selectedRSS);
  const scraped = await scrape(scrapeCfg.urls);

  const output = writeMarkdown(selectedRSS, scraped, followups);

  saveHistory(history);
  log(`Brief generated → ${output}`);
}

run();

