"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "current" | "danger";
  label?: string | null;
}

const sizes: Record<NonNullable<LoaderProps["size"]>, string> = {
  xs: "h-4 w-4 border-2",
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-14 w-14 border-4",
  xl: "h-20 w-20 border-[5px]",
};

const colors: Record<NonNullable<LoaderProps["color"]>, string> = {
  primary: "border-border border-t-primary",
  accent: "border-border border-t-accent",
  current: "border-current/25 border-t-current",
  danger: "border-border border-t-danger",
};

export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(
  ({ className, size = "md", color = "accent", label = "Loading", ...props }, ref) => (
    <span
      ref={ref}
      data-justui="loader"
      role={label ? "status" : undefined}
      aria-hidden={label ? undefined : true}
      className={cn("inline-block shrink-0 animate-spin rounded-full", sizes[size], colors[color], className)}
      {...props}
    >
      {label && <span className="sr-only">{label}</span>}
    </span>
  ),
);
Loader.displayName = "Loader";
