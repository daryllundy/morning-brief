import { CVE_KEYWORDS, SECURITY_KEYWORDS } from "./config";

export function generateFollowUps(items: any[]) {
  const cveItems = items.filter(item =>
    CVE_KEYWORDS.some(k =>
      item.title?.toLowerCase().includes(k.toLowerCase())
    )
  );

  const securityItems = items.filter(item => {
    const isCVE = CVE_KEYWORDS.some(k =>
      item.title?.toLowerCase().includes(k.toLowerCase())
    );
    const isSecurity = SECURITY_KEYWORDS.some(k =>
      item.title?.toLowerCase().includes(k.toLowerCase())
    );
    return !isCVE && isSecurity; // Only non-CVE security items
  });

  return { cveItems, securityItems };
}

