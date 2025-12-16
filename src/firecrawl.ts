import { log } from "./logger";
import * as cheerio from "cheerio";

const API = "https://api.firecrawl.ai/v1/scrape";
const KEY = process.env.FIRECRAWL_API_KEY!;

async function localCrawl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      log(`Local crawl failed: ${url} - Status ${response.status}`);
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
    log(`Local crawl error: ${url} - ${err}`);
    return null;
  }
}

export async function crawl(urls: string[]) {
  const results = [];

  for (const url of urls) {
    let success = false;

    // Try Firecrawl first if API key is available
    if (KEY) {
      try {
        const res = await fetch(API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            formats: ["markdown"],
          }),
        });

        const json = await res.json();

        if (res.ok && json?.data?.markdown) {
          results.push({
            title: url,
            link: url,
            content: json.data.markdown.slice(0, 4000),
          });
          log(`Firecrawl success: ${url}`);
          success = true;
        } else {
          log(`Firecrawl failed: ${url} - Status ${res.status}, falling back to local crawl`);
        }
      } catch (err) {
        log(`Firecrawl error: ${url} - ${err}, falling back to local crawl`);
      }
    }

    // Fall back to local crawl if Firecrawl failed or no API key
    if (!success) {
      const content = await localCrawl(url);
      if (content) {
        results.push({
          title: url,
          link: url,
          content: content.slice(0, 4000),
        });
        log(`Local crawl success: ${url}`);
      } else {
        log(`Both Firecrawl and local crawl failed: ${url}`);
      }
    }
  }

  return results;
}

