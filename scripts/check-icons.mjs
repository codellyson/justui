#!/usr/bin/env node
// Fails when a character is passed where an icon component belongs.
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import { argv, exit } from "node:process";

const ICON_PROPS = "icon|leftIcon|rightIcon|leftSection|rightSection|bullet|chevron";
const ELEMENT = /<(span|div|p|i|b)\b[^>]*>\s*([^<>{}]{1,4})\s*<\/\1>/;

const files = argv.slice(2).length
  ? argv.slice(2)
  : [
      ...globSync("src/**/*.{ts,tsx}"),
      ...globSync("playground/src/**/*.{ts,tsx,mdx}"),
    ];

const offences = [];

for (const file of files) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  text.split("\n").forEach((line, i) => {
    if (line.includes("check-icons-ignore")) return;

    // An icon-ish prop whose value is an element wrapping a bare character.
    const propMatch = new RegExp(`(?:${ICON_PROPS})\\s*[=:]\\s*\\{?\\s*(${ELEMENT.source})`).exec(line);
    if (propMatch) {
      offences.push({ file, line: i + 1, found: propMatch[1].trim(), why: "character used as an icon" });
      return;
    }
    // Emoji anywhere in an icon-ish prop.
    const emoji = new RegExp(`(?:${ICON_PROPS})\\s*[=:][^\\n]*?(\\p{Extended_Pictographic})`, "u").exec(line);
    if (emoji) {
      offences.push({ file, line: i + 1, found: emoji[1], why: "emoji used as an icon" });
    }
  });
}

if (offences.length === 0) {
  console.log("check-icons: clean");
  exit(0);
}

console.error(`check-icons: ${offences.length} offence(s) — use a real icon component, not a character.\n`);
for (const o of offences) {
  console.error(`  ${o.file}:${o.line}  ${o.why}\n    ${o.found}`);
}
console.error(
  "\nImport from @heroicons/react/16/solid (or playground/src/icons.tsx in docs)." +
    "\nAppend `check-icons-ignore` to the line if a character is genuinely correct.",
);
exit(1);
