"use client";

import {
  Children,
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";

interface TimelineConfig {
  active: number;
  bulletSize: number;
  lineWidth: number;
  index: number;
  last: boolean;
}

const TimelineContext = createContext<TimelineConfig | null>(null);

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  active?: number;
  bulletSize?: number;
  lineWidth?: number;
  children: ReactNode;
}

const TimelineRoot = forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, active = -1, bulletSize = 20, lineWidth = 2, children, ...props }, ref) => {
    const items = Children.toArray(children);

    return (
      <div ref={ref} data-justui="timeline" className={cn("flex flex-col", className)} {...props}>
        {items.map((child, index) => (
          <TimelineContext.Provider
            key={index}
            value={{ active, bulletSize, lineWidth, index, last: index === items.length - 1 }}
          >
            {child}
          </TimelineContext.Provider>
        ))}
      </div>
    );
  },
);
TimelineRoot.displayName = "Timeline";

export interface TimelineItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  bullet?: ReactNode;
  title?: ReactNode;
}

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, bullet, title, children, ...props }, ref) => {
    const ctx = useContext(TimelineContext);
    if (!ctx) throw new Error("<Timeline.Item> must be rendered inside <Timeline>.");
    const { active, bulletSize, lineWidth, index, last } = ctx;
    const done = index <= active;

    return (
      <div
        ref={ref}
        data-justui="timeline-item"
        data-active={done || undefined}
        className={cn("relative flex gap-3", !last && "pb-6", className)}
        {...props}
      >
        {!last && (
          // Absolute against the row so h-full spans its pb-6 and reaches the next bullet.
          <span
            aria-hidden="true"
            className={cn("absolute top-0 block h-full", done ? "bg-accent" : "bg-border")}
            style={{ left: bulletSize / 2 - lineWidth / 2, width: lineWidth }}
          />
        )}

        <span
          className={cn(
            "relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 text-[10px]",
            done ? "border-accent bg-accent text-bg" : "border-border bg-bg text-muted",
          )}
          style={{ width: bulletSize, height: bulletSize }}
        >
          {bullet}
        </span>

        <div className="min-w-0 flex-1 pb-2">
          {title && <div className="text-sm font-medium text-primary">{title}</div>}
          {children && <div className="text-sm text-secondary">{children}</div>}
        </div>
      </div>
    );
  },
);
TimelineItem.displayName = "Timeline.Item";

export const Timeline = Object.assign(TimelineRoot, {
  Root: TimelineRoot,
  Item: TimelineItem,
});
