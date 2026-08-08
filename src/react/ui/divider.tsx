"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  labelPosition?: "left" | "center" | "right";
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", label, labelPosition = "center", ...props }, ref) => {
    const shared = { ref, "data-justui": "divider", role: "separator" as const };

    if (orientation === "vertical") {
      return (
        <div
          {...shared}
          aria-orientation="vertical"
          className={cn("w-px self-stretch bg-border", className)}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          {...shared}
          aria-orientation="horizontal"
          className={cn(
            "flex items-center gap-3 text-xs text-muted",
            labelPosition === "left" && "flex-row-reverse",
            className,
          )}
          {...props}
        >
          <span className="h-px flex-1 bg-border" />
          <span className="shrink-0">{label}</span>
          {labelPosition === "center" && <span className="h-px flex-1 bg-border" />}
        </div>
      );
    }

    return (
      <div
        {...shared}
        aria-orientation="horizontal"
        className={cn("h-px w-full bg-border", className)}
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";
