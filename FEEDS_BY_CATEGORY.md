# RSS Feeds Organized by Category

Quick reference guide for all validated feeds.

---

## AI / Research (3 feeds)

| Feed Name | URL | Status | Tier Suggestion |
|-----------|-----|--------|-----------------|
| Google AI Blog | `https://blog.google/technology/ai/rss/` | ✅ Working | tier_4_ai_systems |
| Microsoft Research Blog | `https://www.microsoft.com/en-us/research/blog/feed/` | ✅ Working | tier_4_ai_systems |
| MIT Technology Review | `https://www.technologyreview.com/feed/` | ✅ Working | tier_5_research |

---

## Security (13 feeds)

### Already in feeds.yaml (2)
| Feed Name | URL | Status | Current Tier |
|-----------|-----|--------|--------------|
| Krebs on Security | `https://krebsonsecurity.com/feed/` | ✅ Already added | tier_security_general |
| BleepingComputer | `https://www.bleepingcomputer.com/feed/` | ✅ Already added | tier_security_general |

### New Feeds - High Priority (7)
| Feed Name | URL | Status | Tier Suggestion |
|-----------|-----|--------|-----------------|
| The Hacker News | `https://feeds.feedburner.com/TheHackersNews` | ✅ Working | tier_security_general |
| Cisco Talos Blog | `https://blog.talosintelligence.com/rss/` | ✅ Working | tier_security_critical |
| Threatpost | `https://threatpost.com/feed/` | ✅ Working | tier_security_general |
| Schneier on Security | `https://www.schneier.com/feed/atom/` | ✅ Working | tier_security_general |
| Malwarebytes Labs | `https://www.malwarebytes.com/blog/feed` | ✅ Working | tier_security_general |
| Dark Reading | `https://www.darkreading.com/rss.xml` | ✅ Working | tier_security_general |
| Naked Security (Sophos) | `https://news.sophos.com/en-us/feed/` | ✅ Working | tier_security_general |

### New Feeds - Medium Priority (4)
| Feed Name | URL | Status | Tier Suggestion |
|-----------|-----|--------|-----------------|
| Daniel Miessler | `https://danielmiessler.com/feed/` | ✅ Working | tier_security_general |
| Sucuri Blog | `https://blog.sucuri.net/feed` | ✅ Working | tier_security_general |
| Secjuice | `https://www.secjuice.com/feed/` | ✅ Working | tier_security_general |
| KitPloit | `https://feeds.feedburner.com/PentestTools` | ✅ Working | tier_security_general |

### Unavailable (2)
| Feed Name | Status | Notes |
|-----------|--------|-------|
| Objective-See | ❌ No RSS | Mac security blog, no RSS feed found |
| Cybersecurity Insiders | ❌ Server Error | HTTP 500 on feed URL |

---

## Tech News (8 feeds)

### High Volume - Consider Carefully (7)
| Feed Name | URL | Status | Notes |
|-----------|-----|--------|-------|
| Hacker Noon | `https://hackernoon.com/feed` | ✅ Working | Very high volume |
| The Verge | `https://www.theverge.com/rss/index.xml` | ✅ Working | Mainstream tech news |
| TechCrunch | `https://techcrunch.com/feed/` | ✅ Working | Startup/VC focus |
| Ars Technica | `https://feeds.arstechnica.com/arstechnica/index` | ✅ Working | In-depth tech journalism |
| Wired | `https://www.wired.com/feed/rss` | ✅ Working | Tech/culture |
| VentureBeat | `https://venturebeat.com/feed/` | ✅ Working | Strong AI/ML coverage |
| STAT News | `https://www.statnews.com/feed/` | ✅ Working | Health/biotech focus |

### Unavailable (1)
| Feed Name | Status | Notes |
|-----------|--------|-------|
| TechTarget | ❌ No RSS | Returns HTML instead of XML |

---

## DevOps / Infrastructure (4 feeds)

### Already in feeds.yaml (1)
| Feed Name | URL | Status | Current Tier |
|-----------|-----|--------|--------------|
| OpenAI Blog | `https://openai.com/news/rss.xml` | ✅ Already added | tier_4_ai_systems |

### New Feeds - Recommended (3)
| Feed Name | URL | Status | Tier Suggestion |
|-----------|-----|--------|-----------------|
| GitLab Blog | `https://about.gitlab.com/atom.xml` | ✅ Working | tier_3_devops |
| Tailscale Blog | `https://tailscale.com/blog/index.xml` | ✅ Working | tier_3_devops |
| AWS News Blog | `https://aws.amazon.com/blogs/aws/feed/` | ✅ Working | tier_2_platform |

### Unavailable (1)
| Feed Name | Status | Notes |
|-----------|--------|-------|
| Zapier Blog | ❌ No RSS | Blog exists but no RSS feed |

---

## Summary Statistics

- **Total Feeds Requested**: 31
- **Already in feeds.yaml**: 3 (OpenAI, Krebs, BleepingComputer)
- **Working New Feeds**: 24
- **Unavailable/Broken**: 4
- **Validation Success Rate**: 77%

### By Category
- **AI/Research**: 3 working
- **Security**: 11 working, 2 unavailable
- **Tech News**: 7 working, 1 unavailable
- **DevOps/Infrastructure**: 3 working, 1 unavailable

---

## Quick Add Commands

### Recommended Security Additions
```yaml
# Add to tier_security_general in feeds.yaml
tier_security_general:
  weight: 4
  description: "Security research, cloud & container security"
  rss:
    # ... existing feeds ...
    - https://feeds.feedburner.com/TheHackersNews
    - https://blog.talosintelligence.com/rss/
    - https://threatpost.com/feed/
    - https://www.schneier.com/feed/atom/
    - https://www.malwarebytes.com/blog/feed
    - https://www.darkreading.com/rss.xml
    - https://news.sophos.com/en-us/feed/
```

### Recommended AI Additions
```yaml
# Add to tier_4_ai_systems in feeds.yaml
tier_4_ai_systems:
  weight: 2
  description: "AI as infrastructure, not hype"
  rss:
    # ... existing feeds ...
    - https://blog.google/technology/ai/rss/
    - https://www.microsoft.com/en-us/research/blog/feed/
```

### Recommended DevOps/Infrastructure Additions
```yaml
# Add to tier_3_devops in feeds.yaml
tier_3_devops:
  weight: 3
  description: "Hands-on infra, tooling, incidents"
  rss:
    # ... existing feeds ...
    - https://about.gitlab.com/atom.xml
    - https://tailscale.com/blog/index.xml

# Add to tier_2_platform in feeds.yaml
tier_2_platform:
  weight: 4
  description: "Cloud architecture, reliability, scale"
  rss:
    # ... existing feeds ...
    - https://aws.amazon.com/blogs/aws/feed/
```
