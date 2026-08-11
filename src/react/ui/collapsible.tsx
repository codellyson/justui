"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { ChevronDownIcon } from "../lib/icons.js";

const variants = {
  default: "rounded-lg bg-bg-secondary",
  bordered: "rounded-lg border border-border",
  minimal: "",
} as const;

const headerSizes = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
} as const;

const bodySizes = {
  sm: "px-3 pb-2",
  md: "px-4 pb-3",
  lg: "px-5 pb-4",
} as const;

export interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  opened?: boolean;
  defaultOpened?: boolean;
  onChange?: (opened: boolean) => void;
  variant?: keyof typeof variants;
  size?: keyof typeof headerSizes;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      title,
      children,
      opened,
      defaultOpened = false,
      onChange,
      variant = "default",
      size = "md",
      disabled = false,
      icon,
      badge,
      className,
      headerClassName,
      contentClassName,
    },
    ref,
  ) => (
    <CollapsiblePrimitive.Root
      ref={ref}
      data-justui="collapsible"
      open={opened}
      defaultOpen={defaultOpened}
      onOpenChange={onChange}
      disabled={disabled}
      className={cn(variants[variant], className)}
    >
      <CollapsiblePrimitive.Trigger
        data-justui="collapsible-control"
        className={cn(
          "group flex w-full items-center gap-3 text-left font-medium text-primary transition-colors hover:text-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
          headerSizes[size],
          headerClassName,
        )}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="min-w-0 flex-1">{title}</span>
        {badge && <span className="shrink-0">{badge}</span>}
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsiblePrimitive.Trigger>

      <CollapsiblePrimitive.Content
        data-justui="collapsible-panel"
        className="overflow-hidden data-[state=closed]:animate-justui-collapse-collapsible data-[state=open]:animate-justui-expand-collapsible"
      >
        <div className={cn("text-sm text-secondary", bodySizes[size], contentClassName)}>
          {children}
        </div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  ),
);
Collapsible.displayName = "Collapsible";
