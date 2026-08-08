"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";

const trackSizes = {
  sm: "h-4 w-7",
  md: "h-5 w-9",
  lg: "h-6 w-11",
} as const;

const thumbSizes = {
  sm: "h-3 w-3 data-[state=checked]:translate-x-3",
  md: "h-4 w-4 data-[state=checked]:translate-x-4",
  lg: "h-5 w-5 data-[state=checked]:translate-x-5",
} as const;

export interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "onCheckedChange" | "onChange"> {
  label?: ReactNode;
  description?: ReactNode;
  labelPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  onChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  (
    { className, label, description, labelPosition = "right", size = "md", id, onChange, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;
    const descriptionId = `${switchId}-description`;

    const control = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        data-justui="switch"
        onCheckedChange={onChange}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=unchecked]:bg-border",
          trackSizes[size],
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-bg shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
            thumbSizes[size],
          )}
        />
      </SwitchPrimitive.Root>
    );

    if (!label && !description) return control;

    return (
      <div data-justui="switch-wrapper" className="flex flex-col gap-1">
        <div className={cn("flex items-center gap-3", labelPosition === "left" && "flex-row-reverse justify-end")}>
          {control}
          {label && (
            <label
              htmlFor={switchId}
              className="text-sm font-medium leading-none text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>
        {description && (
          <p id={descriptionId} className="text-xs text-muted">
            {description}
          </p>
        )}
      </div>
    );
  },
);
Switch.displayName = "Switch";
