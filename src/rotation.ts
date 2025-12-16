import { existsSync, readFileSync, writeFileSync } from "fs";
import { subDays, isAfter } from "date-fns";

const FILE = "output/source_history.json";

export function loadHistory(): Record<string, string> {
  if (!existsSync(FILE)) return {};
  return JSON.parse(readFileSync(FILE, "utf-8"));
}

export function saveHistory(history: Record<string, string>) {
  writeFileSync(FILE, JSON.stringify(history, null, 2));
}

export function shouldInclude(
  source: string,
  history: Record<string, string>,
  cooldownDays: number
) {
  const lastSeen = history[source];
  if (!lastSeen) return true;

  return isAfter(
    new Date(),
    subDays(new Date(lastSeen), -cooldownDays)
  );
}

