import Parser from "rss-parser";
import { subHours, isAfter } from "date-fns";
import { log } from "./logger";
import https from "https";

// Create HTTPS agent that accepts self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const parser = new Parser({
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/rss+xml, application/xml, text/xml, application/atom+xml",
  },
  timeout: 20000, // Increased to 20 seconds for slow feeds
  requestOptions: {
    agent: httpsAgent,
  },
  customFields: {
    item: [
      ["description", "description"],
      ["content:encoded", "content"],
    ],
  },
});

// Sanitize XML to fix common malformed feed issues
function sanitizeXML(xmlString: string): string {
  return xmlString
    // Fix unescaped ampersands in URLs and text
    .replace(/&(?![a-zA-Z]+;|#[0-9]+;|#x[0-9a-fA-F]+;)/g, "&amp;")
    // Fix unescaped quotes in attributes
    .replace(/="([^"]*)"([^"]*)"([^"]*)">/g, (match, p1, p2, p3) => {
      return `="${p1}&quot;${p2}&quot;${p3}">`;
    })
    // Remove null bytes
    .replace(/\0/g, "")
    // Fix common encoding issues
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
}

// Retry logic with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;

      // Don't retry on certain errors
      if (err?.message?.includes("404") || err?.message?.includes("Not Found")) {
        throw err; // Don't retry 404s
      }

      if (attempt < maxRetries - 1) {
        const waitTime = delayMs * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
}

// Fetch and parse RSS with XML sanitization fallback
async function parseRSSWithSanitization(url: string): Promise<any> {
  try {
    // Try normal parsing first
    return await parser.parseURL(url);
  } catch (err: any) {
    // If it's an XML parsing error, try sanitizing
    if (err?.message?.includes("Invalid character") || err?.message?.includes("XML")) {
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/rss+xml, application/xml, text/xml, application/atom+xml",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        let xml = await response.text();
        xml = sanitizeXML(xml);

        return await parser.parseString(xml);
      } catch (sanitizeErr) {
        throw err; // Throw original error if sanitization fails
      }
    }
    throw err;
  }
}

export async function collectRSS(tiers: any[], hours: number) {
  const cutoff = subHours(new Date(), hours);
  const results: any[] = [];
  let successCount = 0;
  let failCount = 0;
  let retryCount = 0;

  for (const tier of tiers) {
    for (const url of tier.rss) {
      try {
        // Use retry logic with exponential backoff
        const feed = await retryWithBackoff(
          async () => await parseRSSWithSanitization(url),
          3, // max retries
          500 // initial delay 500ms
        );

        let itemCount = 0;

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
            itemCount++;
          }
        }

        successCount++;
        if (itemCount > 0) {
          log(`RSS success: ${url} (${itemCount} recent items from "${feed.title}")`);
        } else {
          log(`RSS success: ${url} (0 recent items, feed has ${feed.items.length} total)`);
        }

        // Small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (err: any) {
        failCount++;
        const errorMsg = err?.message || String(err);

        // Categorize common errors for better debugging
        if (errorMsg.includes("certificate")) {
          log(`RSS failed: ${url} - SSL certificate error: ${errorMsg}`);
        } else if (errorMsg.includes("429") || errorMsg.includes("rate limit")) {
          log(`RSS failed: ${url} - Rate limited (429)`);
        } else if (errorMsg.includes("404") || errorMsg.includes("Not Found")) {
          log(`RSS failed: ${url} - Feed not found (404)`);
        } else if (errorMsg.includes("timeout") || errorMsg.includes("ETIMEDOUT")) {
          log(`RSS failed: ${url} - Request timeout`);
        } else if (errorMsg.includes("Invalid character") || errorMsg.includes("XML")) {
          log(`RSS failed: ${url} - Invalid XML (tried sanitization): ${errorMsg.substring(0, 100)}`);
        } else {
          log(`RSS failed: ${url} - ${errorMsg}`);
        }
      }
    }
  }

  log(`RSS collection complete: ${successCount} succeeded, ${failCount} failed, ${results.length} articles collected`);
  return results;
}

