import Parser from "rss-parser";

const parser = new Parser();

const testFeeds = [
  "https://cloud.google.com/blog/topics/devops-sre/rss.xml",
  "https://netflixtechblog.com/feed",
  "https://grafana.com/blog/index.xml",
  "https://www.hashicorp.com/blog/products/terraform/feed",
];

async function test() {
  for (const url of testFeeds) {
    try {
      console.log(`Testing: ${url}`);
      const feed = await parser.parseURL(url);
      console.log(`✓ Success: ${feed.title} (${feed.items.length} items)`);
    } catch (err) {
      console.log(`✗ Failed: ${err}`);
    }
  }
}

test();
