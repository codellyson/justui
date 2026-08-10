"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { ChevronDownIcon } from "../lib/icons.js";
import { useAppShellNavbar } from "./app-shell.js";
import { Tooltip, TooltipProvider } from "./tooltip.js";

export interface NavLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "children" | "onToggle"> {
  label: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
  rightSection?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  /** Nested links, revealed by a chevron. */
  children?: ReactNode;
  defaultOpened?: boolean;
  opened?: boolean;
  onToggle?: (opened: boolean) => void;
  /** Icon-only, with the label in a tooltip. Inferred from a collapsed AppShell navbar. */
  iconOnly?: boolean;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      className,
      label,
      icon,
      description,
      rightSection,
      active = false,
      disabled = false,
      children,
      defaultOpened = false,
      opened,
      onToggle,
      iconOnly,
      href,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { collapsed } = useAppShellNavbar();
    const rail = iconOnly ?? collapsed;
    const [uncontrolled, setUncontrolled] = useState(defaultOpened);
    const isOpen = opened ?? uncontrolled;
    const hasChildren = children != null && children !== false;

    const body = (
      <>
        {icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center">{icon}</span>}
        {!rail && (
          <>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate">{label}</span>
              {description && <span className="truncate text-xs text-muted">{description}</span>}
            </span>
            {rightSection && <span className="shrink-0">{rightSection}</span>}
            {hasChildren && (
              <ChevronDownIcon
                aria-hidden="true"
                className={cn("h-3.5 w-3.5 shrink-0 transition-transform", isOpen && "rotate-180")}
              />
            )}
          </>
        )}
      </>
    );

    const shared = cn(
      // Rows take a background tint on focus, like Menu.Item and Select options —
      // a ring draws a hard box around the row.
      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none focus:bg-bg-secondary focus:text-primary",
      rail && "justify-center px-0",
      active
        ? "bg-bg-secondary font-medium text-primary"
        : "text-secondary hover:bg-bg-secondary hover:text-primary",
      disabled && "pointer-events-none opacity-50",
      className,
    );

    const control =
      hasChildren || !href ? (
        <button
          type="button"
          data-justui="nav-link"
          data-active={active || undefined}
          aria-current={active ? "page" : undefined}
          aria-expanded={hasChildren ? isOpen : undefined}
          disabled={disabled}
          onClick={(event) => {
            if (hasChildren) {
              const next = !isOpen;
              if (opened == null) setUncontrolled(next);
              onToggle?.(next);
            }
            onClick?.(event as never);
          }}
          className={shared}
        >
          {body}
        </button>
      ) : (
        <a
          ref={ref}
          href={href}
          data-justui="nav-link"
          data-active={active || undefined}
          aria-current={active ? "page" : undefined}
          aria-disabled={disabled || undefined}
          onClick={onClick}
          className={shared}
          {...props}
        >
          {body}
        </a>
      );

    // Rail mode puts the label in a tooltip, and a nested provider is harmless —
    // without one Radix throws, and a navbar shouldn't require the consumer to
    // have mounted a TooltipProvider.
    const wrapped = rail ? (
      <TooltipProvider>
        <Tooltip label={label} position="right">
          {control}
        </Tooltip>
      </TooltipProvider>
    ) : (
      control
    );

    if (!hasChildren) return wrapped;

    return (
      <div data-justui="nav-link-group">
        {wrapped}
        {isOpen && !rail && (
          <div className="mt-1 flex flex-col gap-1 border-l border-border pl-3 ml-3">{children}</div>
        )}
      </div>
    );
  },
);
NavLink.displayName = "NavLink";
