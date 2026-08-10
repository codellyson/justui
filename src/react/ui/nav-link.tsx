"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { focusRingInset } from "../lib/focus.js";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "../lib/icons.js";
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
  /**
   * How children are revealed. `panel` slides them in over the whole navbar with
   * a back header, replacing the list rather than indenting under it.
   */
  nested?: "expand" | "panel";
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
      nested = "expand",
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
    const asPanel = nested === "panel";
    const panelOpen = asPanel && isOpen && !rail;

    const setOpen = useCallback(
      (next: boolean) => {
        if (opened == null) setUncontrolled(next);
        onToggle?.(next);
      },
      [opened, onToggle],
    );

    useEffect(() => {
      if (!panelOpen) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [panelOpen, setOpen]);

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
            {hasChildren &&
              (asPanel ? (
                <ChevronRightIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              ) : (
                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              ))}
          </>
        )}
      </>
    );

    const shared = cn(
      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
      focusRingInset,
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
            if (hasChildren) setOpen(!isOpen);
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
        {panelOpen && (
          // inset-0 resolves against the navbar, which is positioned and clips its
          // overflow — so the panel covers the whole rail and escapes the scrolling
          // section it was declared in. The rows underneath stay tabbable.
          <div
            data-justui="nav-link-panel"
            className="absolute inset-0 z-10 flex flex-col bg-bg animate-justui-slide-in-right"
          >
            <div className="flex shrink-0 items-center gap-1 p-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted hover:bg-bg-secondary hover:text-primary",
                  focusRingInset,
                )}
              >
                <ChevronLeftIcon aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </button>
              <span className="min-w-0 flex-1 truncate text-center text-sm font-medium text-primary">
                {label}
              </span>
              {/* Balances the back button so the title centres on the panel, not on
                  the space left over beside it. */}
              <span aria-hidden="true" className="h-6 w-6 shrink-0" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2 pb-2">
              {children}
            </div>
          </div>
        )}
        {!asPanel && isOpen && !rail && (
          <div className="mt-1 flex flex-col gap-1 border-l border-border pl-3 ml-3">{children}</div>
        )}
      </div>
    );
  },
);
NavLink.displayName = "NavLink";
