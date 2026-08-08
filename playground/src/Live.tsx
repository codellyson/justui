import * as JustUI from "@codellyson/justui/react";
import { useState } from "react";
import * as React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import * as Icons from "./icons.js";

const scope = {
  ...JustUI,
  ...Icons,
  React,
  useState,
  useEffect: React.useEffect,
  useRef: React.useRef,
};

// Plain colors would fight the active theme, so every value is a token lookup —
// prism-react-renderer applies these as inline styles, where var() resolves.
const prismTheme = {
  plain: { color: "rgb(var(--text-primary))", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "rgb(var(--text-muted))", fontStyle: "italic" as const } },
    { types: ["punctuation", "operator"], style: { color: "rgb(var(--text-muted))" } },
    { types: ["tag", "keyword", "selector"], style: { color: "rgb(var(--accent))" } },
    { types: ["attr-name", "property"], style: { color: "rgb(var(--warning))" } },
    { types: ["string", "attr-value"], style: { color: "rgb(var(--success))" } },
    { types: ["number", "boolean", "constant"], style: { color: "rgb(var(--danger))" } },
    { types: ["function", "class-name"], style: { color: "rgb(var(--text-primary))" } },
  ],
};

export interface LiveProps {
  code: string;
  noInline?: boolean;
}

export function Live({ code, noInline }: LiveProps) {
  const [source, setSource] = useState(code.trim());
  const [open, setOpen] = useState(true);
  const dirty = source !== code.trim();

  return (
    <LiveProvider code={source} scope={scope} noInline={noInline}>
      <div className="not-prose my-6 overflow-hidden rounded-lg border border-border">
        {/* Block, not flex: a flex item shrinks to min-content, which collapses
            any `w-full` example whose children have no intrinsic width. */}
        <div className="min-h-[92px] bg-bg p-6">
          <LivePreview />
        </div>

        <div className="flex items-center justify-between border-t border-border bg-bg-secondary px-3 py-1.5">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted hover:text-primary"
          >
            {open ? "▾" : "▸"} code {dirty && <span className="text-accent">• edited</span>}
          </button>
          {dirty && (
            <button
              type="button"
              onClick={() => setSource(code.trim())}
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted hover:text-primary"
            >
              reset
            </button>
          )}
        </div>

        {open && (
          <div className="live-editor border-t border-border bg-bg-secondary">
            <LiveEditor onChange={setSource} theme={prismTheme} style={{ padding: "12px 14px" }} />
          </div>
        )}

        <LiveError className="m-0 whitespace-pre-wrap border-t border-danger bg-danger/10 p-3 font-mono text-xs text-danger" />
      </div>
    </LiveProvider>
  );
}
