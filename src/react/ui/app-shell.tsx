"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "../lib/cn.js";

const padding = {
  none: "p-0",
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
} as const;

export type AppShellPadding = keyof typeof padding;
export type AppShellBreakpoint = "sm" | "md" | "lg" | "xl";
export type AppShellLayout = "default" | "alt";
export type AppShellRegionMode = "overlay" | "dock";

// Tailwind can't build class names from a variable, so each responsive piece is
// spelled out per breakpoint.
const showAt: Record<AppShellBreakpoint, string> = {
  sm: "hidden shell-sm:flex",
  md: "hidden shell-md:flex",
  lg: "hidden shell-lg:flex",
  xl: "hidden shell-xl:flex",
};

const hideAt: Record<AppShellBreakpoint, string> = {
  sm: "shell-sm:hidden",
  md: "shell-md:hidden",
  lg: "shell-lg:hidden",
  xl: "shell-xl:hidden",
};

const padLeftAt: Record<AppShellBreakpoint, string> = {
  sm: "shell-sm:pl-[var(--justui-navbar-wc)]",
  md: "shell-md:pl-[var(--justui-navbar-wc)]",
  lg: "shell-lg:pl-[var(--justui-navbar-wc)]",
  xl: "shell-xl:pl-[var(--justui-navbar-wc)]",
};

const padRightAt: Record<AppShellBreakpoint, string> = {
  sm: "shell-sm:pr-[var(--justui-aside-wc)]",
  md: "shell-md:pr-[var(--justui-aside-wc)]",
  lg: "shell-lg:pr-[var(--justui-aside-wc)]",
  xl: "shell-xl:pr-[var(--justui-aside-wc)]",
};

const leftAt: Record<AppShellBreakpoint, string> = {
  sm: "shell-sm:left-[var(--justui-navbar-wc)]",
  md: "shell-md:left-[var(--justui-navbar-wc)]",
  lg: "shell-lg:left-[var(--justui-navbar-wc)]",
  xl: "shell-xl:left-[var(--justui-navbar-wc)]",
};

const padLeft = "pl-[var(--justui-navbar-wc)]";
const padRight = "pr-[var(--justui-aside-wc)]";
const left = "left-[var(--justui-navbar-wc)]";

const widthRawNavbar = "w-[var(--justui-navbar-w)]";
const widthRawAside = "w-[var(--justui-aside-w)]";
const widthClampedNavbar = "w-[var(--justui-navbar-wc)]";
const widthClampedAside = "w-[var(--justui-aside-wc)]";

const widthNavbarAt: Record<AppShellBreakpoint, string> = {
  sm: "shell-sm:w-[var(--justui-navbar-wc)]",
  md: "shell-md:w-[var(--justui-navbar-wc)]",
  lg: "shell-lg:w-[var(--justui-navbar-wc)]",
  xl: "shell-xl:w-[var(--justui-navbar-wc)]",
};

const widthAsideAt: Record<AppShellBreakpoint, string> = {
  sm: "shell-sm:w-[var(--justui-aside-wc)]",
  md: "shell-md:w-[var(--justui-aside-wc)]",
  lg: "shell-lg:w-[var(--justui-aside-wc)]",
  xl: "shell-xl:w-[var(--justui-aside-wc)]",
};

const clamped = (raw: string) => `min(var(${raw}), max(0px, calc(50cqw - 80px)))`;

const reserveVars = {
  ["--justui-navbar-wc" as string]: clamped("--justui-navbar-w"),
  ["--justui-aside-wc" as string]: clamped("--justui-aside-w"),
};

export interface AppShellHeaderConfig {
  height: number | string;
}

export interface AppShellFooterConfig {
  height: number | string;
}

export interface AppShellNavbarConfig {
  width: number | string;
  /** Width in the collapsed rail. Omit to make `collapsed` a no-op. */
  collapsedWidth?: number | string;
  collapsed?: boolean;
  breakpoint?: AppShellBreakpoint;
  /** Opens the navbar below the breakpoint, where it is otherwise hidden. */
  opened?: boolean;
  onClose?: () => void;
  mode?: AppShellRegionMode;
}

export interface AppShellAsideConfig {
  width: number | string;
  breakpoint?: AppShellBreakpoint;
  opened?: boolean;
  onClose?: () => void;
  mode?: AppShellRegionMode;
}

interface AppShellContextValue {
  header?: AppShellHeaderConfig;
  footer?: AppShellFooterConfig;
  navbar?: AppShellNavbarConfig;
  aside?: AppShellAsideConfig;
  navbarBreakpoint: AppShellBreakpoint;
  asideBreakpoint: AppShellBreakpoint;
  navbarCollapsed: boolean;
  layout: AppShellLayout;
  padding: AppShellPadding;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

const useAppShell = (part: string) => {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error(`AppShell.${part} must be used inside AppShell`);
  return ctx;
};

/** Reads the collapsed rail state, so navbar content can go icon-only. */
export const useAppShellNavbar = () => {
  const ctx = useContext(AppShellContext);
  return { collapsed: ctx?.navbarCollapsed ?? false, opened: ctx?.navbar?.opened ?? false };
};

const size = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

export interface AppShellProps extends ComponentPropsWithoutRef<"div"> {
  header?: AppShellHeaderConfig;
  footer?: AppShellFooterConfig;
  navbar?: AppShellNavbarConfig;
  aside?: AppShellAsideConfig;
  layout?: AppShellLayout;
  padding?: AppShellPadding;
}

function AppShellRoot({
  children,
  header,
  footer,
  navbar,
  aside,
  layout = "default",
  padding: pad = "md",
  className,
  style,
  ...props
}: AppShellProps) {
  const navbarBreakpoint = navbar?.breakpoint ?? "md";
  const asideBreakpoint = aside?.breakpoint ?? "lg";
  const navbarCollapsed = !!navbar?.collapsed && navbar.collapsedWidth != null;
  const navbarWidth = navbarCollapsed ? navbar?.collapsedWidth : navbar?.width;

  return (
    <AppShellContext.Provider
      value={{
        header,
        footer,
        navbar,
        aside,
        navbarBreakpoint,
        asideBreakpoint,
        navbarCollapsed,
        layout,
        padding: pad,
      }}
    >
      <div
        data-justui="app-shell"
        data-layout={layout}
        className={cn("relative min-h-screen bg-bg", className)}
        style={{
          containerType: "inline-size",
          ["--justui-header-h" as string]: size(header?.height) ?? "0px",
          ["--justui-footer-h" as string]: size(footer?.height) ?? "0px",
          ["--justui-navbar-w" as string]: size(navbarWidth) ?? "0px",
          ["--justui-aside-w" as string]: size(aside?.width) ?? "0px",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </AppShellContext.Provider>
  );
}

function AppShellHeader({
  className,
  children,
  style,
  ...props
}: ComponentPropsWithoutRef<"header">) {
  const { layout, navbarBreakpoint, navbar } = useAppShell("Header");
  const navbarDocked = navbar?.mode === "dock" && !!navbar.opened;

  return (
    <header
      data-justui="app-shell-header"
      className={cn(
        "fixed right-0 top-0 z-30 flex items-center border-b border-border bg-bg",
        // In the alt layout the navbar runs full height, so the header starts
        // beside it instead of above it.
        layout === "alt" && navbar
          ? cn("left-0", leftAt[navbarBreakpoint], navbarDocked && left)
          : "left-0",
        className,
      )}
      style={{ ...reserveVars, height: "var(--justui-header-h)", ...style }}
      {...props}
    >
      {children}
    </header>
  );
}

function AppShellFooter({
  className,
  children,
  style,
  ...props
}: ComponentPropsWithoutRef<"footer">) {
  const { layout, navbarBreakpoint, navbar } = useAppShell("Footer");
  const navbarDocked = navbar?.mode === "dock" && !!navbar.opened;

  return (
    <footer
      data-justui="app-shell-footer"
      className={cn(
        "fixed bottom-0 right-0 z-30 flex items-center border-t border-border bg-bg",
        layout === "alt" && navbar
          ? cn("left-0", leftAt[navbarBreakpoint], navbarDocked && left)
          : "left-0",
        className,
      )}
      style={{ ...reserveVars, height: "var(--justui-footer-h)", ...style }}
      {...props}
    >
      {children}
    </footer>
  );
}

function AppShellNavbar({ className, children, style, ...props }: ComponentPropsWithoutRef<"nav">) {
  const { navbar, navbarBreakpoint, layout } = useAppShell("Navbar");
  const opened = navbar?.opened ?? false;
  const onClose = navbar?.onClose;
  const docked = navbar?.mode === "dock";

  useEffect(() => {
    if (!opened || !onClose || docked) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [opened, onClose, docked]);

  return (
    <>
      {opened && !docked && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className={cn("fixed inset-0 z-30 bg-black/50", hideAt[navbarBreakpoint])}
        />
      )}
      <nav
        data-justui="app-shell-navbar"
        data-opened={opened || undefined}
        data-mode={docked ? "dock" : undefined}
        className={cn(
          "fixed bottom-0 left-0 z-40 flex-col overflow-hidden border-r border-border bg-bg",
          opened ? "flex" : showAt[navbarBreakpoint],
          docked ? widthClampedNavbar : cn(widthRawNavbar, widthNavbarAt[navbarBreakpoint]),
          className,
        )}
        style={{
          ...reserveVars,
          top: layout === "alt" ? 0 : "var(--justui-header-h)",
          bottom: layout === "alt" ? 0 : "var(--justui-footer-h)",
          ...style,
        }}
        {...props}
      >
        {children}
      </nav>
    </>
  );
}

function AppShellAside({ className, children, style, ...props }: ComponentPropsWithoutRef<"aside">) {
  const { aside, asideBreakpoint } = useAppShell("Aside");
  const opened = aside?.opened ?? false;
  const onClose = aside?.onClose;
  const docked = aside?.mode === "dock";

  useEffect(() => {
    if (!opened || !onClose || docked) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [opened, onClose, docked]);

  return (
    <>
      {opened && !docked && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className={cn("fixed inset-0 z-30 bg-black/50", hideAt[asideBreakpoint])}
        />
      )}
      <aside
        data-justui="app-shell-aside"
        data-opened={opened || undefined}
        data-mode={docked ? "dock" : undefined}
        className={cn(
          "fixed right-0 z-40 flex-col overflow-hidden border-l border-border bg-bg",
          opened ? "flex" : showAt[asideBreakpoint],
          docked ? widthClampedAside : cn(widthRawAside, widthAsideAt[asideBreakpoint]),
          className,
        )}
        style={{
          ...reserveVars,
          top: "var(--justui-header-h)",
          bottom: "var(--justui-footer-h)",
          ...style,
        }}
        {...props}
      >
        {children}
      </aside>
    </>
  );
}

export interface AppShellSectionProps extends ComponentPropsWithoutRef<"div"> {
  /** Takes the leftover height and scrolls, pinning the sections around it. */
  grow?: boolean;
}

function AppShellSection({ className, grow = false, ...props }: AppShellSectionProps) {
  return (
    <div
      data-justui="app-shell-section"
      className={cn(grow ? "min-h-0 flex-1 overflow-y-auto" : "shrink-0", className)}
      {...props}
    />
  );
}

function AppShellMain({ className, children, style, ...props }: ComponentPropsWithoutRef<"main">) {
  const { navbar, aside, navbarBreakpoint, asideBreakpoint, padding: pad } = useAppShell("Main");
  const navbarDocked = navbar?.mode === "dock" && !!navbar.opened;
  const asideDocked = aside?.mode === "dock" && !!aside.opened;

  return (
    <main
      data-justui="app-shell-main"
      // Header and footer are cleared with margin, not padding, so the padding
      // scale below still applies on all four sides.
      className={cn(
        navbar && padLeftAt[navbarBreakpoint],
        navbarDocked && padLeft,
        aside && padRightAt[asideBreakpoint],
        asideDocked && padRight,
        className,
      )}
      style={{
        ...reserveVars,
        marginTop: "var(--justui-header-h)",
        marginBottom: "var(--justui-footer-h)",
        ...style,
      }}
      {...props}
    >
      <div className={padding[pad]}>{children}</div>
    </main>
  );
}

AppShellRoot.displayName = "AppShell";
AppShellHeader.displayName = "AppShell.Header";
AppShellFooter.displayName = "AppShell.Footer";
AppShellNavbar.displayName = "AppShell.Navbar";
AppShellAside.displayName = "AppShell.Aside";
AppShellSection.displayName = "AppShell.Section";
AppShellMain.displayName = "AppShell.Main";

export {
  AppShellAside,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
};

export const AppShell = Object.assign(AppShellRoot, {
  Root: AppShellRoot,
  Header: AppShellHeader,
  Footer: AppShellFooter,
  Navbar: AppShellNavbar,
  Aside: AppShellAside,
  Section: AppShellSection,
  Main: AppShellMain,
});
