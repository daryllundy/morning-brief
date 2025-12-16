# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Morning Brief is an automated news aggregation system that generates daily AI/Infrastructure/DevOps/InfoSec briefings. It combines RSS feed collection with web crawling to curate relevant technical content from tiered sources.

## Running the Application

```bash
# Install dependencies
bun install

# Run the brief generator
bun run src/index.ts

# Or use the cron script (update paths and API key first)
./cron.sh
```

The application can optionally use the `FIRECRAWL_API_KEY` environment variable for enhanced web crawling. If not set, the system automatically falls back to local HTML parsing using cheerio.

## Architecture

### Core Pipeline (src/index.ts)

The application follows a linear pipeline:

1. **Load Configuration** (`loadFeeds()`) - Parses `sources/feeds.yaml` to get tiered RSS feeds and crawl targets
2. **Collect RSS** (`collectRSS()`) - Fetches articles from all RSS feeds within the configured time window (18 hours default)
3. **Select Articles** (`selectArticles()`) - Applies tier-based capping and source rotation rules
4. **Generate Follow-ups** (`generateFollowUps()`) - Flags security-critical items based on keywords
5. **Crawl URLs** (`crawl()`) - Attempts Firecrawl API first, falls back to local HTML parsing with cheerio if Firecrawl fails or API key is not set
6. **Write Output** (`writeMarkdown()`) - Generates markdown brief in `output/`

### Tier System (config.ts)

Articles are organized into weighted tiers with different selection rules:

- **tier_security_critical** (cap: 6, no rotation) - Always included if available
- **tier_1_core** (cap: 8, no rotation) - Core ecosystem signals
- **tier_2_platform** (cap: 6, rotated) - Cloud and platform engineering
- **tier_3_devops** (cap: 6, rotated) - DevOps/SRE/observability
- **tier_security_general** (cap: 5, rotated) - General security analysis
- **tier_4_ai_systems** (cap: 4, rotated) - AI infrastructure
- **tier_5_research** (cap: 2, rotated) - Academic/research

### Source Rotation (rotation.ts)

Tiers marked with `rotate: true` use a cooldown system:
- Source history is persisted in `output/source_history.json`
- Default cooldown: 2 days (`SOURCE_COOLDOWN_DAYS`)
- Prevents over-representation from high-volume sources
- Critical tiers bypass rotation to always surface important content

### Security Flagging (followups.ts)

Articles matching security keywords are flagged for human review:
- Keywords include: CVE identifiers, "zero-day", "actively exploited", "RCE", "breach", etc.
- Flagged items appear in a separate "Follow-Up Candidates" section
- Used to surface critical security content regardless of tier

## Configuration Files

### sources/feeds.yaml

Main configuration defining:
- `meta.time_window_hours` - How far back to collect articles (default: 18)
- `feeds.*` - Tier definitions with RSS feed URLs
- `crawl_sources.urls` - Non-RSS URLs to scrape with Firecrawl

### sources/rss.txt & crawl.txt

Legacy feed lists (no longer actively used - feeds.yaml is the source of truth).

## Output

Generated briefs are written to `output/morning_brief_{date}.md` with sections:
- Headlines (all selected articles with metadata)
- Follow-Up Candidates (security-flagged items)
- Crawled Sources (full markdown content from crawled URLs)

## Development Notes

- Uses Bun runtime (but compatible with Node.js)
- TypeScript without explicit compilation (run directly)
- No test suite currently exists
- Logging goes to `logs/` directory (via logger.ts)
- Date handling via date-fns library
- RSS parsing via rss-parser library
- YAML parsing via js-yaml library
- HTML parsing via cheerio library (for local web crawling fallback)
- Web crawling uses dual-strategy: Firecrawl API (optional) with cheerio fallback
