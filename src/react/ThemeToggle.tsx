"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./useTheme.js";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { themeId, mode, themes, setThemeId, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={
        "fixed z-50 flex flex-col items-end gap-2 " + (className ?? "bottom-4 right-4")
      }
    >
      {open && (
        <div
          className="relative z-50 w-72 space-y-3 rounded-lg border border-border bg-bg p-4 shadow-lg"
          role="dialog"
          aria-label="Appearance"
        >
          <div className="border-b border-border pb-2 text-xs font-medium text-muted">
            Appearance
          </div>
          <button
            type="button"
            onClick={toggleMode}
            className="w-full rounded-md border border-border px-3 py-2 text-left text-sm font-medium text-primary transition-colors hover:bg-bg-secondary"
          >
            Switch to {mode === "dark" ? "light" : "dark"}
          </button>
          <div className="border-b border-border pb-2 pt-1 text-xs font-medium text-muted">
            Theme
          </div>
          <div className="max-h-72 space-y-1.5 overflow-y-auto">
            {themes.map((t) => {
              const active = t.id === themeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setThemeId(t.id);
                    setOpen(false);
                  }}
                  className={
                    "flex w-full items-center gap-2.5 rounded-md border px-2 py-1.5 text-left text-sm transition-colors " +
                    (active
                      ? "border-accent bg-accent/10 text-primary"
                      : "border-border text-secondary hover:bg-bg-secondary")
                  }
                >
                  <span
                    aria-hidden
                    className="flex h-5 w-7 flex-shrink-0 overflow-hidden rounded border border-border"
                  >
                    <span style={{ backgroundColor: t.swatch.dark, flex: 1 }} />
                    <span style={{ backgroundColor: t.swatch.light, flex: 1 }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{t.label}</span>
                    {t.description && (
                      <span className="block truncate text-[11px] text-muted">
                        {t.description}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span aria-label="Active" className="flex-shrink-0 text-xs text-accent">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <button
        type="button"
        aria-label="Open theme settings"
        title="Theme settings"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg text-primary shadow-md transition-colors hover:bg-bg-secondary"
      >
        <span>{mode === "dark" ? "◐" : "◑"}</span>
      </button>
    </div>
  );
}
