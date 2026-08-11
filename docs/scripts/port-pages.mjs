#!/usr/bin/env node
// Ports the gallery's MDX into Starlight's docs collection and extracts every
// ```jsx live fence into a real component file. Real components server-render, so
// a demo's markup is in the HTML: no layout shift as islands hydrate, and the
// examples are type-checked instead of being strings evaluated in the browser.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, "../../playground/src/docs");
const pagesOut = resolve(here, "../src/content/docs");
const demosOut = resolve(here, "../src/components/demos");

const GROUP_ORDER = ["Getting started", "Foundations", "Forms", "Overlays", "Display"];
const HOOKS = ["useState", "useEffect", "useRef", "useMemo", "useCallback", "useId"];

const justui = await import(pathToFileURL(resolve(here, "../../dist/react/index.js")).href);
const JUSTUI = new Set(Object.keys(justui));
// The icons module re-exports (`export { A, B } from …`) rather than declaring,
// so both forms have to be read or every icon import is silently skipped.
const iconsSource = readFileSync(resolve(here, "../src/components/icons.tsx"), "utf8");
const ICONS = new Set([
  ...[...iconsSource.matchAll(/export const ([A-Za-z0-9_]+)/g)].map((m) => m[1]),
  ...[...iconsSource.matchAll(/export\s*\{([^}]*)\}/g)].flatMap((m) =>
    m[1]
      .split(",")
      .map((part) => part.trim().split(/\s+as\s+/).pop()?.trim())
      .filter(Boolean),
  ),
]);
if (ICONS.size === 0) throw new Error("no icon exports parsed — check icons.tsx");

const yaml = (v) => `"${String(v).replace(/"/g, '\\"')}"`;

const describe = (body) => {
  const p = body
    .replace(/^import .*$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#{1,6} .*$/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .split(/\n\s*\n/)
    .map((x) => x.replace(/\s+/g, " ").trim())
    .find((x) => x.length > 30);
  if (!p) return null;
  return p.length > 155 ? `${p.slice(0, 152).trimEnd()}…` : p;
};

// The expression handed to render(), plus the code with that call removed.
function splitRender(code) {
  const at = code.lastIndexOf("render(");
  if (at === -1) return { body: code, expr: null };
  let depth = 0;
  let i = at + "render".length;
  for (; i < code.length; i += 1) {
    if (code[i] === "(") depth += 1;
    else if (code[i] === ")") {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  const expr = code.slice(at + "render(".length, i).trim();
  const rest = code.slice(i + 1).replace(/^\s*;?\s*/, "");
  return { body: (code.slice(0, at) + rest).trim(), expr };
}

function imports(code) {
  // Not just capitalised names: hooks like useTheme are exports too.
  const used = new Set([...code.matchAll(/\b([A-Za-z_$][A-Za-z0-9_$]*)\b/g)].map((m) => m[1]));
  const fromJustui = [...used].filter((n) => JUSTUI.has(n)).sort();
  const fromIcons = [...used].filter((n) => ICONS.has(n)).sort();
  const hooks = HOOKS.filter((h) => new RegExp(`\\b${h}\\b`).test(code));

  const lines = [];
  if (/\bReact\./.test(code)) lines.push(`import * as React from "react";`);
  if (hooks.length) lines.push(`import { ${hooks.join(", ")} } from "react";`);
  if (fromJustui.length) lines.push(`import { ${fromJustui.join(", ")} } from "@codellyson/justui/react";`);
  if (fromIcons.length) lines.push(`import { ${fromIcons.join(", ")} } from "../../icons";`);
  return lines.join("\n");
}

function demoSource(code, noInline) {
  if (noInline) {
    const { body, expr } = splitRender(code);
    return `${imports(code)}\n\n${body}\n\nexport default function JustuiDemo() {\n  return (\n    ${expr}\n  );\n}\n`;
  }
  return `${imports(code)}\n\nexport default function JustuiDemo() {\n  return (\n${code
    .split("\n")
    .map((l) => (l.trim() ? `    ${l}` : l))
    .join("\n")}\n  );\n}\n`;
}

rmSync(pagesOut, { recursive: true, force: true });
rmSync(demosOut, { recursive: true, force: true });
mkdirSync(pagesOut, { recursive: true });

const pages = [];
let demoCount = 0;

for (const file of readdirSync(source).filter((f) => f.endsWith(".mdx"))) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = readFileSync(join(source, file), "utf8");

  const title = raw.match(/export const title\s*=\s*"([^"]+)"/)?.[1] ?? slug;
  const group = raw.match(/export const group\s*=\s*"([^"]+)"/)?.[1] ?? "Display";

  let body = raw
    .replace(/^export const (title|group)\s*=\s*"[^"]*";\s*$/gm, "")
    .replace(/^#\s+.+$/m, "")
    .replace(/^\s+/, "");

  const description = describe(body);
  const demoImports = [];
  let n = 0;

  body = body.replace(/```jsx([^\n]*)\n([\s\S]*?)```/g, (whole, meta, code) => {
    if (!/\blive\b/.test(meta)) return whole;
    const noInline = /\bnoInline\b/.test(meta);
    const name = `Demo${n}`;
    const rel = `${slug}/${n}`;

    mkdirSync(join(demosOut, slug), { recursive: true });
    writeFileSync(join(demosOut, slug, `${n}.tsx`), demoSource(code.trim(), noInline), "utf8");
    demoImports.push(`import ${name} from "../../components/demos/${rel}";`);
    n += 1;
    demoCount += 1;

    // client:visible still hydrates, but the markup is already in the HTML.
    // The shown source drops react-live's render() call, which is not a real API.
    const shown = noInline ? splitRender(code.trim()).body : code.trim();
    return `<Preview>\n  <${name} client:visible />\n</Preview>\n\n\`\`\`jsx\n${shown}\n\`\`\``;
  });

  const frontmatter = [
    "---",
    `title: ${yaml(title)}`,
    ...(description ? [`description: ${yaml(description)}`] : []),
    "---",
    "",
  ].join("\n");

  const head = demoImports.length
    ? `import Preview from "../../components/Preview.astro";\n${demoImports.join("\n")}\n\n`
    : "";
  writeFileSync(join(pagesOut, file), `${frontmatter}${head}${body.trimEnd()}\n`, "utf8");
  pages.push({ slug, title, group });
}

const sidebar = GROUP_ORDER.filter((g) => pages.some((p) => p.group === g)).map((label) => ({
  label,
  items: pages
    .filter((p) => p.group === label)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((p) => (p.slug === "index" ? { label: p.title, link: "/" } : { label: p.title, slug: p.slug })),
}));

writeFileSync(
  resolve(here, "../sidebar.mjs"),
  `// Generated by scripts/port-pages.mjs — do not edit.\nexport const sidebar = ${JSON.stringify(sidebar, null, 2)};\n`,
  "utf8",
);

console.log(`ported ${pages.length} pages, extracted ${demoCount} demos`);
