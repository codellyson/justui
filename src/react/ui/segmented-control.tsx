"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { forwardRef, type ElementRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface SegmentedControlItem {
  value: string;
  label: ReactNode;
  leftSection?: ReactNode;
  disabled?: boolean;
}

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
} as const;

export interface SegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  data: SegmentedControlItem[];
  fullWidth?: boolean;
  size?: keyof typeof sizes;
  disabled?: boolean;
  className?: string;
  itemClassName?: string;
  /** Names the group for screen readers, e.g. "View mode". */
  label?: string;
}

export const SegmentedControl = forwardRef<
  ElementRef<typeof ToggleGroupPrimitive.Root>,
  SegmentedControlProps
>(
  (
    { value, onChange, data, fullWidth = false, size = "sm", disabled, className, itemClassName, label },
    ref,
  ) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      data-justui="segmented-control"
      type="single"
      value={value}
      // Radix clears on re-press; a segmented control always keeps one selection.
      onValueChange={(next) => next && onChange(next)}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-bg-secondary p-1",
        fullWidth && "flex w-full",
        className,
      )}
    >
      {data.map((item) => (
        <ToggleGroupPrimitive.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          data-justui="segmented-control-item"
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-bg data-[state=on]:text-primary data-[state=on]:shadow",
            sizes[size],
            fullWidth && "flex-1",
            itemClassName,
          )}
        >
          {item.leftSection && <span className="shrink-0">{item.leftSection}</span>}
          {item.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  ),
);
SegmentedControl.displayName = "SegmentedControl";
