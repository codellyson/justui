"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";

export type PopoverPosition = "top" | "right" | "bottom" | "left";

interface PopoverConfigValue {
  position: PopoverPosition;
  offset: number;
  withinPortal: boolean;
}

const PopoverConfig = createContext<PopoverConfigValue>({
  position: "bottom",
  offset: 8,
  withinPortal: true,
});

export interface PopoverProps {
  children: ReactNode;
  opened?: boolean;
  defaultOpened?: boolean;
  onChange?: (opened: boolean) => void;
  position?: PopoverPosition;
  offset?: number;
  withinPortal?: boolean;
  modal?: boolean;
}

const PopoverRoot = ({
  children,
  opened,
  defaultOpened,
  onChange,
  position = "bottom",
  offset = 8,
  withinPortal = true,
  modal = false,
}: PopoverProps) => (
  <PopoverConfig.Provider value={{ position, offset, withinPortal }}>
    <PopoverPrimitive.Root
      open={opened}
      defaultOpen={defaultOpened}
      onOpenChange={onChange}
      modal={modal}
    >
      {children}
    </PopoverPrimitive.Root>
  </PopoverConfig.Provider>
);
PopoverRoot.displayName = "Popover";

export const PopoverTarget = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverDropdownProps
  extends Omit<ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, "side" | "sideOffset"> {
  width?: number | string;
}

export const PopoverDropdown = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  PopoverDropdownProps
>(({ className, width, style, ...props }, ref) => {
  const { position, offset, withinPortal } = useContext(PopoverConfig);

  const content = (
    <PopoverPrimitive.Content
      ref={ref}
      data-justui="popover-dropdown"
      side={position}
      sideOffset={offset}
      style={width == null ? style : { width, ...style }}
      className={cn(
        "z-50 rounded-lg border border-border bg-bg p-4 text-sm text-primary shadow-md focus-visible:outline-hidden",
        className,
      )}
      {...props}
    />
  );

  return withinPortal ? <PopoverPrimitive.Portal>{content}</PopoverPrimitive.Portal> : content;
});
PopoverDropdown.displayName = "Popover.Dropdown";

export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Target: PopoverTarget,
  Dropdown: PopoverDropdown,
  Anchor: PopoverAnchor,
  Close: PopoverClose,
});
