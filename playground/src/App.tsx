import { ALL_THEMES } from "@codellyson/justui";
import { useTheme } from "@codellyson/justui/react";
import { MDXProvider } from "@mdx-js/react";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { mdxComponents } from "./mdx-components.js";

interface Page {
  slug: string;
  title: string;
  group: string;
  Content: ComponentType;
}

const modules = import.meta.glob<{
  default: ComponentType;
  title?: string;
  group?: string;
}>("./docs/*.mdx", { eager: true });

const GROUP_ORDER = ["Getting started", "Foundations", "Forms", "Overlays", "Display"];

const pages: Page[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.replace("./docs/", "").replace(".mdx", "");
    return {
      slug,
      title: mod.title ?? slug,
      group: mod.group ?? "Components",
      Content: mod.default,
    };
  })
  .sort((a, b) => {
    const g = GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group);
    return g !== 0 ? g : a.title.localeCompare(b.title);
  });

const groups = GROUP_ORDER.filter((g) => pages.some((p) => p.group === g)).map((g) => ({
  name: g,
  items: pages.filter((p) => p.group === g),
}));

function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash.slice(1) || pages[0]?.slug || "");
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash.slice(1) || pages[0]?.slug || "");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

function ThemeBar() {
  const { themeId, mode, setThemeId, toggleMode } = useTheme();
  // Proves the px type scale: the controls must not resize when the host does.
  const [rootFontSize, setRootFontSize] = useState(16);

  useEffect(() => {
    document.documentElement.style.fontSize = `${rootFontSize}px`;
  }, [rootFontSize]);

  const active = ALL_THEMES.find((t) => t.id === themeId) ?? ALL_THEMES[0];

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border bg-bg/90 px-6 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">theme</span>
        <div className="flex flex-wrap gap-1">
          {ALL_THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              title={`${t.label}${t.description ? ` — ${t.description}` : ""}`}
              onClick={() => setThemeId(t.id)}
              aria-pressed={t.id === themeId}
              className={
                "h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 " +
                (t.id === themeId ? "border-accent" : "border-border")
              }
              style={{ background: mode === "dark" ? t.swatch.dark : t.swatch.light }}
            >
              <span className="sr-only">{t.label}</span>
            </button>
          ))}
        </div>
        <span className="min-w-[7rem] text-xs text-secondary">{active?.label}</span>
      </div>

      <button
        type="button"
        onClick={toggleMode}
        className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary hover:border-accent hover:text-primary"
      >
        {mode === "dark" ? "◐ dark" : "◑ light"}
      </button>

      <label className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        root font size
        <select
          value={rootFontSize}
          onChange={(e) => setRootFontSize(Number(e.target.value))}
          className="rounded-md border border-border bg-bg-secondary px-2 py-1 text-primary"
        >
          <option value={16}>16px</option>
          <option value={15}>15px</option>
          <option value={18}>18px</option>
        </select>
      </label>
    </header>
  );
}

export function App() {
  const slug = useHashRoute();
  const page = pages.find((p) => p.slug === slug) ?? pages[0];

  // Name the browser tab after the page, so several gallery tabs stay tellable
  // apart. Leading with the component name because tab titles truncate.
  useEffect(() => {
    document.title = page ? `${page.title} — JustUI` : "JustUI — component gallery";
  }, [page]);

  return (
    <div className="min-h-screen">
      <ThemeBar />
      <div className="mx-auto flex max-w-[1180px] gap-10 px-6">
        <nav className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-52 shrink-0 overflow-y-auto py-8 md:block">
          {groups.map((g) => (
            <div key={g.name} className="mb-6">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                {g.name}
              </div>
              <ul className="space-y-0.5">
                {g.items.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={`#${p.slug}`}
                      aria-current={p.slug === page?.slug ? "page" : undefined}
                      className={
                        "block rounded px-2 py-1 text-sm transition-colors " +
                        (p.slug === page?.slug
                          ? "bg-bg-secondary font-medium text-accent"
                          : "text-secondary hover:bg-bg-secondary hover:text-primary")
                      }
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <main className="min-w-0 flex-1 py-8 pb-32">
          <MDXProvider components={mdxComponents}>{page && <page.Content />}</MDXProvider>
        </main>
      </div>
    </div>
  );
}
