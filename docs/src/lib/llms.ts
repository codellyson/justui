import { getCollection } from "astro:content";
import { sidebar } from "../../sidebar.mjs";

export const TITLE = "JustUI";
export const SUMMARY =
  "Design system for the just* app family: theme tokens, twelve themes, around fifty React components on Radix, Astro adapters, and a Tailwind v4 design config.";

export const SETUP = `Install with \`pnpm add @codellyson/justui\` plus the peers
\`@heroicons/react\`, \`tailwindcss\` (v4) and the Geist fonts. One CSS import wires
everything up:

\`\`\`css
@import "@codellyson/justui/tailwind.css";
\`\`\`

Components come from \`@codellyson/justui/react\`. Conventions worth knowing:
\`variant\` and \`color\` are separate props, sizes are \`xs|sm|md|lg\`, form controls
own their \`label\`/\`description\`/\`error\`, \`onChange\` receives the value rather than
an event, and overlays take \`opened\`/\`onClose\`.`;

/** Strips the MDX machinery, keeping prose, tables and the example code fences. */
export function toPlainMarkdown(body: string): string {
  return body
    .replace(/^import .*$/gm, "")
    .replace(/^<\/?Preview>\s*$/gm, "")
    .replace(/^\s*<Demo\d+\s+client:visible\s*\/>\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export interface LlmsPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  group: string;
  body: string;
}

/** Docs pages in sidebar order, so the listing reads the way the site does. */
export async function llmsPages(): Promise<LlmsPage[]> {
  const docs = await getCollection("docs");
  const byId = new Map(docs.map((entry) => [entry.id, entry]));

  const ordered: LlmsPage[] = [];
  for (const group of sidebar) {
    for (const item of group.items) {
      const slug = "slug" in item ? item.slug : "index";
      const entry = byId.get(slug) ?? byId.get(slug || "index");
      if (!entry) continue;
      ordered.push({
        slug,
        path: slug === "index" ? "/" : `/${slug}/`,
        title: entry.data.title,
        description: entry.data.description ?? "",
        group: group.label,
        body: toPlainMarkdown(entry.body ?? ""),
      });
    }
  }
  return ordered;
}

export const url = (site: URL | undefined, path: string) =>
  site ? new URL(path, site).href : path;
