"use client";

import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  forwardRef,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { CheckIcon, DotIcon } from "../lib/icons.js";

// Radix defaults this to modal, which locks page scroll and takes the scrollbar
// with it — opening a menu shifts everything sized against the viewport. Popover
// already defaults to non-modal here; a menu should match.
const MenuRoot = ({ modal = false, ...props }: ComponentProps<typeof MenuPrimitive.Root>) => (
  <MenuPrimitive.Root modal={modal} {...props} />
);
MenuRoot.displayName = "Menu";

export const MenuTarget = MenuPrimitive.Trigger;
export const MenuGroup = MenuPrimitive.Group;
export const MenuPortal = MenuPrimitive.Portal;
export const MenuRadioGroup = MenuPrimitive.RadioGroup;

export const MenuDropdown = forwardRef<
  ElementRef<typeof MenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Content> & { width?: number | string }
>(({ className, sideOffset = 4, width, style, ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Content
      ref={ref}
      data-justui="menu-dropdown"
      sideOffset={sideOffset}
      style={width == null ? style : { width, ...style }}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-bg p-1 text-primary shadow-md",
        className,
      )}
      {...props}
    />
  </MenuPrimitive.Portal>
));
MenuDropdown.displayName = "Menu.Dropdown";

const itemBase =
  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-bg-secondary data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const itemColors = {
  default: "focus:text-primary",
  red: "text-danger focus:text-danger",
} as const;

export interface MenuItemProps
  extends Omit<ComponentPropsWithoutRef<typeof MenuPrimitive.Item>, "color"> {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  color?: keyof typeof itemColors;
}

export const MenuItem = forwardRef<ElementRef<typeof MenuPrimitive.Item>, MenuItemProps>(
  ({ className, leftSection, rightSection, color = "default", children, ...props }, ref) => (
    <MenuPrimitive.Item
      ref={ref}
      data-justui="menu-item"
      className={cn(itemBase, itemColors[color], className)}
      {...props}
    >
      {leftSection && <span className="shrink-0">{leftSection}</span>}
      {children}
      {rightSection && <span className="ml-auto shrink-0 text-xs text-muted">{rightSection}</span>}
    </MenuPrimitive.Item>
  ),
);
MenuItem.displayName = "Menu.Item";

export const MenuCheckboxItem = forwardRef<
  ElementRef<typeof MenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    data-justui="menu-checkbox-item"
    className={cn(itemBase, "pl-8 focus:text-primary", className)}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
));
MenuCheckboxItem.displayName = "Menu.CheckboxItem";

export const MenuRadioItem = forwardRef<
  ElementRef<typeof MenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.RadioItem
    ref={ref}
    data-justui="menu-radio-item"
    className={cn(itemBase, "pl-8 focus:text-primary", className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <DotIcon className="h-2 w-2" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
));
MenuRadioItem.displayName = "Menu.RadioItem";

export const MenuLabel = forwardRef<
  ElementRef<typeof MenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Label
    ref={ref}
    data-justui="menu-label"
    className={cn("px-2 py-1.5 text-xs font-semibold text-muted", className)}
    {...props}
  />
));
MenuLabel.displayName = "Menu.Label";

export const MenuDivider = forwardRef<
  ElementRef<typeof MenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Separator
    ref={ref}
    data-justui="menu-divider"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
MenuDivider.displayName = "Menu.Divider";

export const Menu = Object.assign(MenuRoot, {
  Root: MenuRoot,
  Target: MenuTarget,
  Dropdown: MenuDropdown,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioItem: MenuRadioItem,
  RadioGroup: MenuRadioGroup,
  Group: MenuGroup,
  Label: MenuLabel,
  Divider: MenuDivider,
  Portal: MenuPortal,
});
