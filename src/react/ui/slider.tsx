"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef, useState, type ElementRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface SliderMark {
  value: number;
  label?: ReactNode;
}

const trackSizes = { sm: "h-1", md: "h-1.5", lg: "h-2" } as const;
const thumbSizes = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" } as const;

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: SliderMark[];
  disabled?: boolean;
  size?: keyof typeof trackSizes;
  label?: ReactNode | ((value: number) => ReactNode);
  className?: string;
  name?: string;
}

export const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      onChange,
      onChangeEnd,
      min = 0,
      max = 100,
      step = 1,
      marks,
      disabled = false,
      size = "md",
      label,
      className,
      name,
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const current = value ?? uncontrolled;
    const labelNode = typeof label === "function" ? label(current) : label;

    return (
      <div data-justui="slider-wrapper" className={cn("w-full", className)}>
        <SliderPrimitive.Root
          ref={ref}
          data-justui="slider"
          value={[current]}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          name={name}
          onValueChange={([next]) => {
            if (next == null) return;
            if (value == null) setUncontrolled(next);
            onChange?.(next);
          }}
          onValueCommit={([next]) => next != null && onChangeEnd?.(next)}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            disabled && "opacity-50",
          )}
        >
          <SliderPrimitive.Track
            className={cn("relative w-full grow overflow-hidden rounded-full bg-bg-secondary", trackSizes[size])}
          >
            <SliderPrimitive.Range className="absolute h-full rounded-full bg-accent" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(
              "group block rounded-full border-2 border-accent bg-bg shadow transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none",
              thumbSizes[size],
            )}
            aria-label={typeof labelNode === "string" ? labelNode : undefined}
          >
            {labelNode != null && (
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-accent px-1.5 py-0.5 text-[11px] font-medium text-bg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=active]:opacity-100">
                {labelNode}
              </span>
            )}
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>

        {marks && marks.length > 0 && (
          <div className="relative mt-2 h-4">
            {marks.map((mark) => {
              const left = max === min ? 0 : ((mark.value - min) / (max - min)) * 100;
              return (
                <span
                  key={mark.value}
                  className={cn(
                    "absolute -translate-x-1/2 text-xs",
                    mark.value <= current ? "text-secondary" : "text-muted",
                  )}
                  style={{ left: `${left}%` }}
                >
                  {mark.label ?? mark.value}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);
Slider.displayName = "Slider";
