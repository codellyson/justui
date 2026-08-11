import type { ComponentProps, ReactNode } from "react";
import { Live } from "./Live.js";

const slug = (children: ReactNode): string =>
  String(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const mdxComponents = {
  Live,
  h1: (p: ComponentProps<"h1">) => (
    <h1 className="mb-2 mt-0 text-4xl font-semibold tracking-tight text-primary" {...p} />
  ),
  h2: ({ children, ...p }: ComponentProps<"h2">) => (
    <h2
      id={slug(children)}
      className="mb-3 mt-12 scroll-mt-24 border-b border-border pb-2 text-xl font-semibold text-primary"
      {...p}
    >
      {children}
    </h2>
  ),
  h3: (p: ComponentProps<"h3">) => (
    <h3 className="mb-2 mt-8 text-base font-semibold text-primary" {...p} />
  ),
  p: (p: ComponentProps<"p">) => (
    <p className="my-4 max-w-[68ch] text-sm leading-relaxed text-secondary" {...p} />
  ),
  ul: (p: ComponentProps<"ul">) => (
    <ul className="my-4 max-w-[68ch] list-disc space-y-1.5 pl-5 text-sm text-secondary" {...p} />
  ),
  ol: (p: ComponentProps<"ol">) => (
    <ol className="my-4 max-w-[68ch] list-decimal space-y-1.5 pl-5 text-sm text-secondary" {...p} />
  ),
  a: (p: ComponentProps<"a">) => (
    <a className="text-accent underline underline-offset-2 hover:text-accent-hover" {...p} />
  ),
  strong: (p: ComponentProps<"strong">) => <strong className="font-semibold text-primary" {...p} />,
  hr: (p: ComponentProps<"hr">) => <hr className="my-10 border-border" {...p} />,
  blockquote: (p: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-4 max-w-[68ch] border-l-2 border-accent bg-bg-secondary py-2 pl-4 pr-3 text-sm text-secondary"
      {...p}
    />
  ),
  // Inline code only — fenced blocks arrive wrapped in <pre>, handled below.
  code: (p: ComponentProps<"code">) => (
    <code
      className="rounded border border-border bg-bg-secondary px-1 py-0.5 font-mono text-[0.85em] text-primary"
      {...p}
    />
  ),
  pre: (p: ComponentProps<"pre">) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg border border-border bg-bg-secondary p-4 font-mono text-xs leading-relaxed text-primary [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
      {...p}
    />
  ),
  table: (p: ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm" {...p} />
    </div>
  ),
  th: (p: ComponentProps<"th">) => (
    <th
      className="border-b border-border bg-bg-secondary px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.08em] text-muted"
      {...p}
    />
  ),
  td: (p: ComponentProps<"td">) => (
    <td className="border-b border-border px-3 py-2 align-top text-secondary [&:first-child]:font-mono [&:first-child]:text-primary" {...p} />
  ),
};
