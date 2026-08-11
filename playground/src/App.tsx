import { ALL_THEMES } from "@codellyson/justui";
import { Button, Select, useTheme } from "@codellyson/justui/react";
import { MDXProvider } from "@mdx-js/react";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { mdxComponents } from "./mdx-components.js";
import { useLinkInterceptor, useRoute } from "./router.js";

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

const GROUP_ORDER = [
  "Getting started",
  "Foundations",
  "Forms",
  "Overlays",
  "Display",
];

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

const groups = GROUP_ORDER.filter((g) => pages.some((p) => p.group === g)).map(
  (g) => ({
    name: g,
    items: pages.filter((p) => p.group === g),
  }),
);

function Toc({ slug }: { slug: string }) {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const headings = [...document.querySelectorAll<HTMLHeadingElement>("main h2[id]")];
    setItems(headings.map((h) => ({ id: h.id, text: h.textContent ?? "" })));
    setActive("");
  }, [slug]);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-72px 0px -68% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <aside className="sticky top-[61px] hidden h-[calc(100vh-61px)] w-56 shrink-0 overflow-y-auto py-8 xl:block">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        on this page
      </div>
      <ul className="space-y-0.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === active ? "true" : undefined}
              className={
                "-ml-px block border-l py-1 pl-3 text-sm transition-colors " +
                (item.id === active
                  ? "border-accent font-medium text-primary"
                  : "border-transparent text-secondary hover:border-border hover:text-primary")
              }
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
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
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          theme
        </span>
        <div className="flex flex-wrap gap-1">
          {ALL_THEMES.map((t) => (
            <Button
              key={t.id}
              type="button"
              title={`${t.label}${t.description ? ` — ${t.description}` : ""}`}
              onClick={() => setThemeId(t.id)}
              aria-pressed={t.id === themeId}
              className={
                "h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 " +
                (t.id === themeId ? "border-accent" : "border-border")
              }
              style={{
                background: mode === "dark" ? t.swatch.dark : t.swatch.light,
              }}
            >
              <span className="sr-only">{t.label}</span>
            </Button>
          ))}
        </div>
        <span className="min-w-[7rem] text-xs text-secondary">
          {active?.label}
        </span>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={toggleMode}
        className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary hover:border-accent hover:text-primary"
      >
        {mode === "dark" ? "◐ dark" : "◑ light"}
      </Button>

      <label className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        root font size
        <Select
          value={String(rootFontSize)}
          onChange={(e) => setRootFontSize(Number(e))}
          placeholder="Select a font size"
          className="rounded-md border border-border bg-bg-secondary px-2 py-1 text-primary"
          options={[
            {
              label: "16px",
              value: 16,
            },
            {
              label: "15px",
              value: 15,
            },
            {
              label: "18px",
              value: 18,
            },
          ]}
        />
      </label>
    </header>
  );
}

export function App() {
  const slug = useRoute(pages[0]?.slug ?? "");
  const page = pages.find((p) => p.slug === slug) ?? pages[0];
  useLinkInterceptor();

  // A section link can be followed before its page has mounted, so the scroll has
  // to happen after the content exists rather than on navigation.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [slug]);

  // Name the browser tab after the page, so several gallery tabs stay tellable
  // apart. Leading with the component name because tab titles truncate.
  useEffect(() => {
    document.title = page
      ? `${page.title} — JustUI`
      : "JustUI — component gallery";
  }, [page]);

  return (
    <div className="min-h-screen">
      <ThemeBar />
      <div className="mx-auto flex max-w-[1180px] gap-10 px-6 xl:max-w-[1440px]">
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
                      href={`/${p.slug}`}
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
          <MDXProvider components={mdxComponents}>
            {page && <page.Content />}
          </MDXProvider>
        </main>

        <Toc slug={slug} />
      </div>
    </div>
  );
}
