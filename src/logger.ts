import { appendFileSync, mkdirSync } from "fs";

mkdirSync("logs", { recursive: true });

export function log(msg: string) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  console.log(line.trim());
  appendFileSync("logs/morning.log", line);
}

