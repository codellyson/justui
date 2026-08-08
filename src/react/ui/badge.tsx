"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export type BadgeColor = "primary" | "gray" | "red" | "blue" | "green" | "orange" | "yellow";

const colorClasses: Record<BadgeColor, { light: string; solid: string; outline: string }> = {
  primary: {
    light: "bg-accent/10 text-accent",
    solid: "bg-accent text-bg",
    outline: "border border-accent text-accent",
  },
  gray: {
    light: "bg-bg-secondary text-secondary",
    solid: "bg-muted text-bg",
    outline: "border border-border text-secondary",
  },
  red: {
    light: "bg-danger/10 text-danger",
    solid: "bg-danger text-bg",
    outline: "border border-danger text-danger",
  },
  blue: {
    light: "bg-accent/10 text-accent",
    solid: "bg-accent text-bg",
    outline: "border border-accent text-accent",
  },
  green: {
    light: "bg-success/10 text-success",
    solid: "bg-success text-bg",
    outline: "border border-success text-success",
  },
  orange: {
    light: "bg-warning/10 text-warning",
    solid: "bg-warning text-bg",
    outline: "border border-warning text-warning",
  },
  yellow: {
    light: "bg-warning/10 text-warning",
    solid: "bg-warning text-bg",
    outline: "border border-warning text-warning",
  },
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-sm",
} as const;

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  variant?: "light" | "solid" | "outline";
  color?: BadgeColor;
  size?: "sm" | "md" | "lg";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "light", color = "primary", size = "sm", ...props }, ref) => (
    <span
      ref={ref}
      data-justui="badge"
      className={cn(
        "inline-flex items-center rounded-full font-semibold transition-colors",
        sizeClasses[size],
        colorClasses[color][variant],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";
