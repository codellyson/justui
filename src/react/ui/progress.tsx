"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

export type ProgressColor = "primary" | "gray" | "red" | "blue" | "green" | "orange" | "yellow";

const fills: Record<ProgressColor, string> = {
  primary: "bg-accent",
  gray: "bg-muted",
  red: "bg-danger",
  blue: "bg-accent",
  green: "bg-success",
  orange: "bg-warning",
  yellow: "bg-warning",
};

const heights = { xs: "h-1", sm: "h-1.5", md: "h-2", lg: "h-3", xl: "h-4" } as const;

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** 0–100. Clamped. */
  value: number;
  color?: ProgressColor;
  size?: keyof typeof heights | number;
  striped?: boolean;
  animated?: boolean;
  /** Announced to screen readers in place of the raw percentage. */
  label?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, color = "primary", size = "md", striped = false, animated = false, label, style, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        data-justui="progress"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn(
          "w-full overflow-hidden rounded-full bg-bg-secondary",
          typeof size === "number" ? undefined : heights[size],
          className,
        )}
        style={typeof size === "number" ? { height: size, ...style } : style}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-300 ease-out",
            fills[color],
            striped &&
              "bg-[length:0.6rem_0.6rem] bg-[image:repeating-linear-gradient(45deg,rgb(255_255_255/0.2)_0,rgb(255_255_255/0.2)_25%,transparent_0,transparent_50%)]",
            striped && animated && "animate-justui-stripe",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  },
);
Progress.displayName = "Progress";

export interface RingProgressSection {
  value: number;
  color: ProgressColor;
  tooltip?: string;
}

export interface RingProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  sections: RingProgressSection[];
  size?: number;
  thickness?: number;
  roundCaps?: boolean;
  label?: ReactNode;
}

const strokes: Record<ProgressColor, string> = {
  primary: "stroke-accent",
  gray: "stroke-muted",
  red: "stroke-danger",
  blue: "stroke-accent",
  green: "stroke-success",
  orange: "stroke-warning",
  yellow: "stroke-warning",
};

export const RingProgress = forwardRef<HTMLDivElement, RingProgressProps>(
  ({ className, sections, size = 120, thickness = 12, roundCaps = false, label, ...props }, ref) => {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;

    let offset = 0;
    const arcs = sections.map((section, i) => {
      const pct = Math.min(100, Math.max(0, section.value));
      const length = (pct / 100) * circumference;
      const arc = { ...section, length, offset, key: i };
      offset += length;
      return arc;
    });

    return (
      <div
        ref={ref}
        data-justui="ring-progress"
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            className="stroke-bg-secondary"
          />
          {arcs.map((arc) => (
            <circle
              key={arc.key}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth={thickness}
              strokeLinecap={roundCaps ? "round" : "butt"}
              strokeDasharray={`${arc.length} ${circumference - arc.length}`}
              strokeDashoffset={-arc.offset}
              className={cn(strokes[arc.color], "transition-[stroke-dasharray] duration-300")}
            />
          ))}
        </svg>
        {label && (
          <div className="absolute inset-0 flex items-center justify-center text-center text-sm text-primary">
            {label}
          </div>
        )}
      </div>
    );
  },
);
RingProgress.displayName = "RingProgress";
