import { log } from "./logger";

const API = "https://api.firecrawl.ai/v1/scrape";
const KEY = process.env.FIRECRAWL_API_KEY!;

export async function crawl(urls: string[]) {
  const results = [];

  for (const url of urls) {
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
      const md = json?.data?.markdown;
      if (md) {
        results.push({
          title: url,
          link: url,
          content: md.slice(0, 4000),
        });
      }
    } catch {
      log(`Firecrawl failed: ${url}`);
    }
  }

  return results;
}

