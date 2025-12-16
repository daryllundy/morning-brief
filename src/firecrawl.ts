import { log } from "./logger";
import * as cheerio from "cheerio";

const SCRAPE_API = "https://api.firecrawl.dev/v1/scrape";
const KEY = process.env.FIRECRAWL_API_KEY!;

async function localScrape(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      log(`Local scrape failed: ${url} - Status ${response.status}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove script, style, and other non-content elements
    $("script, style, nav, header, footer, aside, iframe").remove();

    // Get text content from main content areas
    let content = "";

    // Try to find main content area
    const mainSelectors = ["main", "article", "[role='main']", ".content", "#content", "body"];
    for (const selector of mainSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text();
        break;
      }
    }

    // Clean up whitespace
    content = content
      .replace(/\s+/g, " ")
      .replace(/\n+/g, "\n")
      .trim();

    return content || null;
  } catch (err) {
    log(`Local scrape error: ${url} - ${err}`);
    return null;
  }
}

export async function scrape(urlConfigs: any[]) {
  const results = [];
  let firecrawlUsed = 0;
  let localUsed = 0;

  for (const config of urlConfigs) {
    const url = typeof config === 'string' ? config : config.url;
    const requireFirecrawl = typeof config === 'object' && config.requireFirecrawl;
    let success = false;

    // Strategy: Try local first (free), then Firecrawl (1 credit) if needed
    // Exception: If requireFirecrawl=true, skip local attempt

    if (!requireFirecrawl) {
      // Try local scrape first (saves Firecrawl credits)
      const content = await localScrape(url);
      if (content && content.length > 200) { // Ensure we got meaningful content
        results.push({
          title: url,
          link: url,
          content: content.slice(0, 4000),
        });
        log(`Local scrape success (0 credits): ${url}`);
        localUsed++;
        success = true;
      } else {
        log(`Local scrape insufficient (${content?.length || 0} chars), trying Firecrawl: ${url}`);
      }
    }

    // Try Firecrawl if: local failed OR requireFirecrawl=true
    if (!success && KEY) {
      try {
        const res = await fetch(SCRAPE_API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            formats: ["markdown"],
            onlyMainContent: true,
          }),
        });

        const json = await res.json();

        if (res.ok && json?.data?.markdown) {
          results.push({
            title: url,
            link: url,
            content: json.data.markdown.slice(0, 4000),
          });
          firecrawlUsed++;
          log(`Firecrawl scrape success (1 credit): ${url}`);
          success = true;
        } else {
          log(`Firecrawl scrape failed: ${url} - Status ${res.status}`);
        }
      } catch (err) {
        log(`Firecrawl scrape error: ${url} - ${err}`);
      }
    }

    if (!success) {
      log(`All scrape methods failed: ${url}`);
    }
  }

  log(`Scraping complete: ${firecrawlUsed} Firecrawl credits used, ${localUsed} local scrapes (free)`);
  return results;
}

