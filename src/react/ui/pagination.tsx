"use client";

import { cn } from "../lib/cn.js";
import { controlHeight, controlText, type ControlSize } from "../lib/control-sizes.js";
import { ChevronLeftIcon, ChevronRightIcon } from "../lib/icons.js";

export interface BuildPageListOptions {
  siblings?: number;
  boundaries?: number;
}

export function buildPageList(
  current: number,
  total: number,
  { siblings = 1, boundaries = 2 }: BuildPageListOptions = {},
): (number | "ellipsis")[] {
  const anchors = new Set<number>();
  const add = (page: number) => {
    if (page >= 1 && page <= total) anchors.add(page);
  };

  for (let i = 0; i < boundaries; i++) {
    add(1 + i);
    add(total - i);
  }
  for (let offset = -siblings; offset <= siblings; offset++) add(current + offset);

  const sorted = [...anchors].sort((a, b) => a - b);
  const out: (number | "ellipsis")[] = [];
  sorted.forEach((page, i) => {
    const gap = i > 0 ? page - sorted[i - 1] : 0;
    if (gap === 2) out.push(page - 1);
    else if (gap > 2) out.push("ellipsis");
    out.push(page);
  });
  return out;
}

const sizes: Record<ControlSize, string> = {
  xs: cn(controlHeight.xs, "min-w-7", controlText.xs),
  sm: cn(controlHeight.sm, "min-w-8", controlText.sm),
  md: cn(controlHeight.md, "min-w-9", controlText.md),
  lg: cn(controlHeight.lg, "min-w-11", controlText.lg),
};

export interface PaginationProps extends BuildPageListOptions {
  page: number;
  total: number;
  onChange: (page: number) => void;
  withControls?: boolean;
  size?: ControlSize;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function Pagination({
  page,
  total,
  onChange,
  siblings = 1,
  boundaries = 2,
  withControls = true,
  size = "md",
  disabled = false,
  className,
  "aria-label": ariaLabel = "Pagination",
}: PaginationProps) {
  if (total <= 1) return null;

  const goTo = (next: number) => {
    const clamped = Math.min(total, Math.max(1, next));
    if (clamped !== page) onChange(clamped);
  };

  const control =
    "inline-flex items-center gap-1.5 rounded-md px-2 text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:text-muted disabled:hover:text-muted";

  return (
    <nav
      data-justui="pagination"
      aria-label={ariaLabel}
      className={cn("flex items-center gap-2", className)}
    >
      {withControls && (
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={disabled || page <= 1}
          className={cn(control, sizes[size])}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Previous
        </button>
      )}

      <div className="flex items-center gap-1">
        {buildPageList(page, total, { siblings, boundaries }).map((entry, i) =>
          entry === "ellipsis" ? (
            <span key={`ellipsis-${i}`} aria-hidden="true" className="px-1 text-muted">
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              aria-label={`Page ${entry}`}
              aria-current={entry === page ? "page" : undefined}
              disabled={disabled}
              onClick={() => goTo(entry)}
              className={cn(
                "rounded-md px-2 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50",
                sizes[size],
                entry === page
                  ? "bg-accent text-bg"
                  : "text-secondary hover:bg-bg-secondary hover:text-primary",
              )}
            >
              {entry}
            </button>
          ),
        )}
      </div>

      {withControls && (
        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={disabled || page >= total}
          className={cn(control, sizes[size])}
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      )}
    </nav>
  );
}
