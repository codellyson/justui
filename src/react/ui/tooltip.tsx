"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  /** Tooltip body. Supplementary only — never the sole source of the information. */
  label: ReactNode;
  children: ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  opened?: boolean;
  defaultOpened?: boolean;
  onChange?: (opened: boolean) => void;
  disabled?: boolean;
  withArrow?: boolean;
  offset?: number;
  className?: string;
  /** Delay before opening, when there's no TooltipProvider above. */
  openDelay?: number;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      label,
      children,
      position = "top",
      opened,
      defaultOpened,
      onChange,
      disabled = false,
      withArrow = false,
      offset = 4,
      className,
      openDelay,
    },
    ref,
  ) => {
    if (disabled) return <>{children}</>;

    return (
      <TooltipPrimitive.Root
        open={opened}
        defaultOpen={defaultOpened}
        onOpenChange={onChange}
        delayDuration={openDelay}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={ref}
            data-justui="tooltip"
            side={position}
            sideOffset={offset}
            className={cn(
              "z-50 overflow-hidden rounded-md border border-border bg-bg px-3 py-1.5 text-xs text-primary shadow-md",
              className,
            )}
          >
            {label}
            {withArrow && <TooltipPrimitive.Arrow className="fill-border" />}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    );
  },
);
Tooltip.displayName = "Tooltip";

export type TooltipProviderProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;
