# Firecrawl Credit Optimization Guide

## Understanding Your Credits

**Free Plan:** 500 credits/month

### Credit Usage
- **Firecrawl scrape:** 1 credit per URL
- **Local scrape (cheerio):** FREE (0 credits)

## Default Strategy (Smart Fallback)

Morning Brief now uses a **credit-optimized strategy**:

```
1. Try local scrape first (FREE)
   ├─ If successful (>200 chars) → Use it (0 credits)
   └─ If insufficient content → Fall back to Firecrawl (1 credit)

2. Only use Firecrawl when:
   ├─ Local scrape fails/insufficient
   └─ URL marked as requireFirecrawl: true
```

## Credit Usage Tracking

Every run logs credit usage:
```
[INFO] Scraping complete: 3 Firecrawl credits used, 6 local scrapes (free)
```

## Estimating Monthly Usage

### Current Configuration (9 URLs)
Running **daily at 5:00 AM** with smart fallback:

| Scenario | Local Success | Firecrawl Used | Monthly Credits |
|----------|---------------|----------------|-----------------|
| Best case | 9/9 URLs | 0 per day | **0 credits/month** |
| Mixed | 6/9 URLs | 3 per day | **90 credits/month** |
| Worst case | 0/9 URLs | 9 per day | **270 credits/month** |

**With smart fallback, you'll likely use 50-150 credits/month** (depending on which sites work with local scraping).

## Optimizing Per-URL

### Option 1: String Format (Default - Try Local First)
```yaml
scrape_sources:
  urls:
    - https://example.com/news  # Will try local first, then Firecrawl
```

### Option 2: Object Format (Force Firecrawl)
```yaml
scrape_sources:
  urls:
    - url: https://example.com/app
      requireFirecrawl: true  # Skip local, use Firecrawl immediately
```

### When to Use `requireFirecrawl: true`

Use Firecrawl immediately for:
- ✅ JavaScript-heavy SPAs (React/Vue/Angular apps)
- ✅ Sites with client-side rendering
- ✅ Pages requiring authentication/cookies
- ✅ Sites with aggressive bot detection

Try local first (default) for:
- ✅ Static HTML blogs
- ✅ News sites with server-side rendering
- ✅ Documentation sites
- ✅ GitHub/GitLab pages

## Credit-Saving Strategies

### 1. Test Local Scraping First
Before marking `requireFirecrawl: true`, test if local works:
```bash
curl -s https://example.com | grep -i "expected content"
```

If you see the content, local scraping will work (FREE).

### 2. Prioritize Important URLs
Only scrape high-value sources daily. Move lower-priority sources to:
- Weekly runs (reduce to ~4 credits/month per URL)
- Manual runs (on-demand only)

### 3. Reduce Scrape Frequency
Edit the schedule in `com.morning-brief.daily.plist.template`:
```xml
<!-- Run every 2 days instead of daily -->
<key>StartCalendarInterval</key>
<array>
  <dict>
    <key>Weekday</key>
    <integer>1</integer>  <!-- Monday -->
    <key>Hour</key>
    <integer>5</integer>
  </dict>
  <dict>
    <key>Weekday</key>
    <integer>3</integer>  <!-- Wednesday -->
    <key>Hour</key>
    <integer>5</integer>
  </dict>
  <dict>
    <key>Weekday</key>
    <integer>5</integer>  <!-- Friday -->
    <key>Hour</key>
    <integer>5</integer>
  </dict>
</array>
```

### 4. Use RSS Feeds When Possible
RSS feeds are always FREE. Check if your scrape-only sources offer RSS:
```bash
curl -s https://example.com | grep -i "rss\|feed\|atom"
```

Move any discovered feeds from `scrape_sources` to the appropriate tier in `feeds`.

## Monitoring Credit Usage

### Check Logs
```bash
grep "Firecrawl credits used" logs/morning.log
```

### Calculate Monthly Usage
```bash
# Count Firecrawl uses in last 30 days
grep "Firecrawl scrape success (1 credit)" logs/morning.log | wc -l
```

### Check Firecrawl Dashboard
Visit [Firecrawl Dashboard](https://firecrawl.dev/dashboard) to see:
- Remaining credits
- Usage history
- Credit reset date

## Example: Optimized Configuration

```yaml
scrape_sources:
  urls:
    # Static sites - local works great (FREE)
    - https://www.anthropic.com/news
    - https://deepmind.google/research
    - https://docs.cloud.google.com/architecture

    # Try local first, Firecrawl as fallback
    - url: https://nvd.nist.gov/vuln
      requireFirecrawl: false

    # JS-heavy site - always use Firecrawl
    - url: https://app.example.com/dashboard
      requireFirecrawl: true  # 1 credit per run
```

## Troubleshooting

### "Running out of credits too fast"
1. Check which URLs use Firecrawl: `grep "Firecrawl scrape success" logs/morning.log`
2. Test those URLs with local scraping
3. Remove URLs that don't provide value
4. Reduce run frequency

### "Local scrape returns insufficient content"
Some sites work but return minimal content. You can:
1. Adjust the threshold in `firecrawl.ts` (currently 200 chars)
2. Inspect what local scraping returns: `curl -sL https://example.com | html2text | wc -c`
3. Mark site as `requireFirecrawl: true` if needed

### "Firecrawl scrape success but empty content"
Firecrawl succeeded but returned nothing useful:
1. The site may block Firecrawl too
2. Remove the URL from `scrape_sources`
3. Look for an RSS feed alternative

## Summary

With the **smart fallback strategy**, you'll maximize your 500 free credits while still getting comprehensive coverage. Most static sites work with local scraping (FREE), and Firecrawl is only used when necessary.

**Expected result: 50-150 credits/month** instead of 270 credits/month, giving you plenty of room for growth or failures.
