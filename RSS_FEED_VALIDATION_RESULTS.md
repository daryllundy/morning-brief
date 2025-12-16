# RSS Feed Validation Results

Validation completed: 2025-12-15

## Summary

- **Total feeds tested**: 31
- **Working feeds**: 24 (77%)
- **Broken feeds**: 6 (19%)
- **Already in feeds.yaml**: 1 (3%)

---

## AI / Research (3 working)

### ✅ Google AI Blog
- **URL**: `https://blog.google/technology/ai/rss/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/xml
- **Category**: AI Systems (tier_4_ai_systems)
- **Already in feeds.yaml**: No

### ✅ Microsoft Research Blog
- **URL**: `https://www.microsoft.com/en-us/research/blog/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: AI Systems (tier_4_ai_systems) or Research (tier_5_research)
- **Already in feeds.yaml**: No

### ✅ MIT Technology Review
- **URL**: `https://www.technologyreview.com/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Research (tier_5_research) or Tech News
- **Already in feeds.yaml**: No
- **Notes**: Full feed, not just AI section

---

## Tech News (7 working)

### ✅ Hacker Noon
- **URL**: `https://hackernoon.com/feed`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Tech News / General (tier_1_core or new tier)
- **Already in feeds.yaml**: No
- **Notes**: Very high volume, might need rotation

### ✅ The Verge
- **URL**: `https://www.theverge.com/rss/index.xml`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/xml
- **Category**: Tech News / General (tier_1_core or new tier)
- **Already in feeds.yaml**: No
- **Notes**: High volume mainstream tech news

### ✅ TechCrunch
- **URL**: `https://techcrunch.com/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Tech News / General (tier_1_core or new tier)
- **Already in feeds.yaml**: No
- **Notes**: High volume, startup/venture focus

### ✅ STAT News
- **URL**: `https://www.statnews.com/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Tech News / Healthcare Tech
- **Already in feeds.yaml**: No
- **Notes**: Health/medicine/biotech focus

### ✅ Ars Technica
- **URL**: `https://feeds.arstechnica.com/arstechnica/index`
- **Status**: Working (HTTP 200)
- **Content-Type**: text/xml
- **Category**: Tech News / General (tier_1_core)
- **Already in feeds.yaml**: No
- **Notes**: In-depth tech journalism

### ✅ Wired
- **URL**: `https://www.wired.com/feed/rss`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/xml
- **Category**: Tech News / General (tier_1_core)
- **Already in feeds.yaml**: No
- **Notes**: Broad tech/culture coverage

### ✅ VentureBeat
- **URL**: `https://venturebeat.com/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: text/xml
- **Category**: Tech News / AI/Gaming focus
- **Already in feeds.yaml**: No
- **Notes**: Strong AI/ML coverage

### ❌ TechTarget
- **URL**: N/A
- **Status**: No working RSS feed found
- **Notes**: Website has RSS links but they return HTML pages, not XML feeds

---

## Security (11 working)

### ✅ Daniel Miessler
- **URL**: `https://danielmiessler.com/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Security General (tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Security philosophy and analysis

### ✅ Threatpost
- **URL**: `https://threatpost.com/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Security Critical/General (tier_security_critical or tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Breaking security news

### ✅ The Hacker News (cybersecurity)
- **URL**: `https://feeds.feedburner.com/TheHackersNews`
- **Status**: Working (HTTP 200)
- **Content-Type**: text/xml
- **Category**: Security Critical/General (tier_security_critical or tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: High-volume cybersecurity news

### ✅ Malwarebytes Labs
- **URL**: `https://www.malwarebytes.com/blog/feed`
- **Status**: Working (HTTP 200)
- **Content-Type**: text/xml
- **Category**: Security General (tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Malware analysis and threat intelligence

### ✅ Schneier on Security
- **URL**: `https://www.schneier.com/feed/atom/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/atom+xml
- **Category**: Security General (tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Security expert commentary (Atom format)

### ✅ Sucuri Blog
- **URL**: `https://blog.sucuri.net/feed`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Security General (tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Website security focus

### ✅ Cisco Talos Blog
- **URL**: `https://blog.talosintelligence.com/rss/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Security Critical/General (tier_security_critical or tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Threat intelligence and vulnerability research

### ✅ Secjuice
- **URL**: `https://www.secjuice.com/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: text/xml
- **Category**: Security General (tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Security research and tutorials

### ✅ Dark Reading
- **URL**: `https://www.darkreading.com/rss.xml`
- **Status**: Working (HTTP 200)
- **Content-Type**: text/xml
- **Category**: Security General (tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Enterprise security news

### ✅ KitPloit
- **URL**: `https://feeds.feedburner.com/PentestTools`
- **Status**: Working (HTTP 200)
- **Content-Type**: text/xml
- **Category**: Security General (tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Hacking tools and pentesting

### ✅ Naked Security (Sophos)
- **URL**: `https://news.sophos.com/en-us/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Security General (tier_security_general)
- **Already in feeds.yaml**: No
- **Notes**: Alternative: `https://news.sophos.com/en-us/category/serious-security/feed/` for security-only

### ⚠️ BleepingComputer
- **URL**: `https://www.bleepingcomputer.com/feed/`
- **Status**: Already in feeds.yaml (tier_security_general)

### ⚠️ Krebs on Security
- **URL**: `https://krebsonsecurity.com/feed/`
- **Status**: Already in feeds.yaml (tier_security_general)

### ❌ Objective-See's Blog
- **URL**: N/A
- **Status**: No working RSS feed found
- **Notes**: Mac security blog, tried multiple RSS paths - all 404

### ❌ Cybersecurity Insiders
- **URL**: N/A
- **Status**: Server error (HTTP 500)
- **Notes**: Feed URL returns 500 error

---

## DevOps / Infrastructure (2 working)

### ✅ GitLab Blog
- **URL**: `https://about.gitlab.com/atom.xml`
- **Status**: Working (HTTP 200)
- **Content-Type**: text/xml
- **Category**: DevOps (tier_3_devops)
- **Already in feeds.yaml**: No
- **Notes**: Atom format

### ✅ AWS News Blog
- **URL**: `https://aws.amazon.com/blogs/aws/feed/`
- **Status**: Working (HTTP 200)
- **Content-Type**: application/rss+xml
- **Category**: Platform/Infrastructure (tier_2_platform)
- **Already in feeds.yaml**: No
- **Notes**: General AWS announcements (different from aws.amazon.com/blogs/architecture/feed/ already in feeds)

### ✅ Tailscale Blog
- **URL**: `https://tailscale.com/blog/index.xml`
- **Status**: Working (HTTP 200)
- **Content-Type**: text/xml
- **Category**: DevOps/Infrastructure (tier_3_devops)
- **Already in feeds.yaml**: No
- **Notes**: Networking and VPN technology

### ⚠️ OpenAI Blog
- **URL**: `https://openai.com/news/rss.xml`
- **Status**: Already in feeds.yaml (tier_4_ai_systems)

### ❌ The Zapier Blog
- **URL**: N/A
- **Status**: No working RSS feed found
- **Notes**: Blog exists but no RSS feed available

---

## Recommended Additions to feeds.yaml

### High Priority (Should Add)

**Security Tier (tier_security_general)**:
```yaml
- https://feeds.feedburner.com/TheHackersNews  # The Hacker News
- https://blog.talosintelligence.com/rss/  # Cisco Talos
- https://threatpost.com/feed/  # Threatpost
- https://www.schneier.com/feed/atom/  # Schneier on Security
- https://www.malwarebytes.com/blog/feed  # Malwarebytes Labs
- https://www.darkreading.com/rss.xml  # Dark Reading
- https://news.sophos.com/en-us/feed/  # Naked Security (Sophos)
```

**AI Systems Tier (tier_4_ai_systems)**:
```yaml
- https://blog.google/technology/ai/rss/  # Google AI Blog
- https://www.microsoft.com/en-us/research/blog/feed/  # Microsoft Research
```

**DevOps Tier (tier_3_devops)**:
```yaml
- https://about.gitlab.com/atom.xml  # GitLab Blog
- https://tailscale.com/blog/index.xml  # Tailscale Blog
```

**Platform Tier (tier_2_platform)**:
```yaml
- https://aws.amazon.com/blogs/aws/feed/  # AWS News Blog
```

### Medium Priority (Consider Adding)

**Research Tier (tier_5_research)**:
```yaml
- https://www.technologyreview.com/feed/  # MIT Technology Review
```

**Security Tier (tier_security_general)**:
```yaml
- https://danielmiessler.com/feed/  # Daniel Miessler
- https://blog.sucuri.net/feed  # Sucuri Blog
- https://www.secjuice.com/feed/  # Secjuice
- https://feeds.feedburner.com/PentestTools  # KitPloit
```

### Low Priority (High Volume / May Need Curation)

These are working feeds but may be too high-volume or too broad for the current brief focus:

**Tech News / General**:
```yaml
- https://feeds.arstechnica.com/arstechnica/index  # Ars Technica
- https://www.wired.com/feed/rss  # Wired
- https://venturebeat.com/feed/  # VentureBeat (strong AI coverage)
- https://techcrunch.com/feed/  # TechCrunch (startup focus)
- https://www.theverge.com/rss/index.xml  # The Verge
- https://hackernoon.com/feed  # Hacker Noon
```

**Specialized**:
```yaml
- https://www.statnews.com/feed/  # STAT News (health/biotech)
```

**Notes on General Tech News Feeds**:
- These feeds are very high volume and broad
- May dilute the focus on AI/Infra/DevOps/InfoSec
- Consider creating a new tier (e.g., `tier_tech_news`) with strict caps and rotation
- Alternatively, use as crawl-only sources instead of RSS feeds

---

## Broken / Unavailable Feeds

1. **TechTarget** - No working RSS feed (HTML pages instead of XML)
2. **Objective-See** - No RSS feed found (404 on all attempted paths)
3. **Cybersecurity Insiders** - Server error (HTTP 500)
4. **Zapier Blog** - No RSS feed available

---

## Notes

- All feeds validated on 2025-12-15
- Feeds tested with 10-second timeout
- User-Agent: Mozilla/5.0 to avoid bot blocking
- Some feeds use Atom format (compatible with RSS parsers)
- FeedBurner feeds (The Hacker News, KitPloit) are Google-hosted and stable
- Consider rotation for high-volume sources (The Hacker News, TechCrunch, etc.)

---

## Next Steps

1. Review recommended additions based on priority
2. Decide on tier placement for each feed
3. Configure caps and rotation settings for new feeds
4. Consider creating a new tier for general tech news if adding those feeds
5. Update `sources/feeds.yaml` with selected feeds
6. Test the full pipeline with new feeds
7. Monitor output quality and adjust caps/rotation as needed
