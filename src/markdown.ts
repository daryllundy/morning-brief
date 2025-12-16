import { mkdirSync, writeFileSync } from "fs";

mkdirSync("output", { recursive: true });

export function writeMarkdown(
  rss: any[],
  crawled: any[],
  followups: any[]
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

  if (followups.length) {
    md += `---

## 🔖 Follow-Up Candidates (Human Review)
`;
    for (const f of followups) {
      md += `- ${f.title} → ${f.link}\n`;
    }
    md += "\n";
  }

  if (crawled.length) {
    md += `---

## Crawled Sources
`;
    for (const c of crawled) {
      md += `### ${c.title}
${c.content}

---
`;
    }
  }

  writeFileSync(path, md);
  return path;
}

