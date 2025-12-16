import { mkdirSync, writeFileSync } from "fs";

mkdirSync("output", { recursive: true });

export function writeMarkdown(
  rss: any[],
  scraped: any[],
  followups: { cveItems: any[]; securityItems: any[] }
) {
  const date = new Date().toISOString().split("T")[0];
  const path = `output/morning_brief_${date}.md`;

  let md = `# Morning AI / Infra / DevOps / Infosec Brief — ${date}

**Scope:** Last 18 hours
**Mode:** Detection, not analysis

---

## Headlines
`;

  for (const r of rss) {
    md += `### ${r.title}
- Source: ${r.source}
- Link: ${r.link}
- Why: ${r.why}
- Notes: _Review if relevant_

`;
  }

  if (followups.cveItems.length) {
    md += `---

## 🚨 CVE & Critical Vulnerabilities

**PRIORITY: Review these immediately for patching requirements**

`;
    for (const f of followups.cveItems) {
      md += `### ${f.title}
- **Source:** ${f.source}
- **Link:** ${f.link}
- **Tier:** ${f.tier}
- **Published:** ${f.published.toISOString()}

`;
    }
  }

  if (followups.securityItems.length) {
    md += `---

## 🔖 Security Incidents & Threats (Human Review)
`;
    for (const f of followups.securityItems) {
      md += `- ${f.title} → ${f.link} (${f.source})\n`;
    }
    md += "\n";
  }

  if (scraped.length) {
    md += `---

## Scraped Sources
`;
    for (const s of scraped) {
      md += `### ${s.title}
${s.content}

---
`;
    }
  }

  writeFileSync(path, md);
  return path;
}

