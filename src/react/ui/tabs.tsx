"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";

export interface TabsProps
  extends Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, "onValueChange" | "onChange"> {
  onChange?: (value: string) => void;
}

const TabsRoot = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ onChange, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} data-justui="tabs" onValueChange={onChange} {...props} />
  ),
);
TabsRoot.displayName = "Tabs";

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-justui="tabs-list"
    className={cn("flex items-center gap-1 border-b border-border", className)}
    {...props}
  />
));
TabsList.displayName = "Tabs.List";

export interface TabProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

export const Tab = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabProps>(
  ({ className, leftSection, rightSection, children, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      data-justui="tab"
      className={cn(
        "-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-accent data-[state=active]:text-accent",
        className,
      )}
      {...props}
    >
      {leftSection && <span className="shrink-0">{leftSection}</span>}
      {children}
      {rightSection && <span className="shrink-0">{rightSection}</span>}
    </TabsPrimitive.Trigger>
  ),
);
Tab.displayName = "Tabs.Tab";

export const TabsPanel = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-justui="tabs-panel"
    className={cn(
      "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
      className,
    )}
    {...props}
  />
));
TabsPanel.displayName = "Tabs.Panel";

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Tab,
  Panel: TabsPanel,
});
