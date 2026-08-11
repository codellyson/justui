"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { ChevronDownIcon } from "../lib/icons.js";

export type AccordionValue = string | string[] | null;

export interface AccordionProps {
  multiple?: boolean;
  value?: AccordionValue;
  defaultValue?: AccordionValue;
  onChange?: (value: AccordionValue) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  ({ multiple = false, value, defaultValue, onChange, className, children, disabled }, ref) => {
    const shared = {
      ref,
      "data-justui": "accordion",
      className: cn("divide-y divide-border", className),
      disabled,
      children,
    };

    return multiple ? (
      <AccordionPrimitive.Root
        type="multiple"
        value={(value as string[] | undefined) ?? undefined}
        defaultValue={(defaultValue as string[] | undefined) ?? undefined}
        onValueChange={onChange as (v: string[]) => void}
        {...shared}
      />
    ) : (
      <AccordionPrimitive.Root
        type="single"
        collapsible
        value={(value as string | undefined) ?? undefined}
        defaultValue={(defaultValue as string | undefined) ?? undefined}
        onValueChange={onChange as (v: string) => void}
        {...shared}
      />
    );
  },
);
AccordionRoot.displayName = "Accordion";

export const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} data-justui="accordion-item" className={className} {...props} />
));
AccordionItem.displayName = "Accordion.Item";

export interface AccordionControlProps
  extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  leftSection?: ReactNode;
  chevron?: ReactNode;
}

export const AccordionControl = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionControlProps
>(({ className, leftSection, chevron, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-justui="accordion-control"
      className={cn(
        "group flex flex-1 items-center gap-3 py-3 text-left text-sm font-medium text-primary transition-colors hover:text-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {leftSection && <span className="shrink-0">{leftSection}</span>}
      <span className="min-w-0 flex-1">{children}</span>
      <span className="shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180">
        {chevron ?? <ChevronDownIcon className="h-4 w-4" />}
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionControl.displayName = "Accordion.Control";

export const AccordionPanel = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-justui="accordion-panel"
    // Height animates via the CSS var Radix measures; `auto` can't be keyframed.
    className={cn(
      "overflow-hidden text-sm text-secondary data-[state=closed]:animate-justui-collapse data-[state=open]:animate-justui-expand",
      className,
    )}
    {...props}
  >
    <div className={cn("pb-3")}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionPanel.displayName = "Accordion.Panel";

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Control: AccordionControl,
  Panel: AccordionPanel,
});
