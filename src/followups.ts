import { SECURITY_KEYWORDS } from "./config";

export function generateFollowUps(items: any[]) {
  return items.filter(item =>
    SECURITY_KEYWORDS.some(k =>
      item.title?.toLowerCase().includes(k)
    )
  );
}

