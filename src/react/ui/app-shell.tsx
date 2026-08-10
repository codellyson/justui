"use client";

import { createContext, useContext, type ComponentPropsWithoutRef } from "react";
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

// Tailwind can't build class names from a variable, so the responsive pieces are
// spelled out per breakpoint.
const navbarVisible: Record<AppShellBreakpoint, string> = {
  sm: "hidden sm:flex",
  md: "hidden md:flex",
  lg: "hidden lg:flex",
  xl: "hidden xl:flex",
};

const mainOffset: Record<AppShellBreakpoint, string> = {
  sm: "sm:pl-[var(--justui-navbar-w)]",
  md: "md:pl-[var(--justui-navbar-w)]",
  lg: "lg:pl-[var(--justui-navbar-w)]",
  xl: "xl:pl-[var(--justui-navbar-w)]",
};

const overlayHidden: Record<AppShellBreakpoint, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
};

export interface AppShellHeaderConfig {
  height: number | string;
}

export interface AppShellNavbarConfig {
  width: number | string;
  breakpoint?: AppShellBreakpoint;
  /** Opens the navbar below the breakpoint, where it is otherwise hidden. */
  opened?: boolean;
  onClose?: () => void;
}

interface AppShellContextValue {
  header?: AppShellHeaderConfig;
  navbar?: AppShellNavbarConfig;
  breakpoint: AppShellBreakpoint;
  padding: AppShellPadding;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

const useAppShell = (part: string) => {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error(`AppShell.${part} must be used inside AppShell`);
  return ctx;
};

const size = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

export interface AppShellProps extends ComponentPropsWithoutRef<"div"> {
  header?: AppShellHeaderConfig;
  navbar?: AppShellNavbarConfig;
  padding?: AppShellPadding;
}

function AppShellRoot({
  children,
  header,
  navbar,
  padding: pad = "md",
  className,
  style,
  ...props
}: AppShellProps) {
  const breakpoint = navbar?.breakpoint ?? "md";

  return (
    <AppShellContext.Provider value={{ header, navbar, breakpoint, padding: pad }}>
      <div
        data-justui="app-shell"
        className={cn("relative min-h-screen bg-bg", className)}
        style={{
          ["--justui-header-h" as string]: size(header?.height) ?? "0px",
          ["--justui-navbar-w" as string]: size(navbar?.width) ?? "0px",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </AppShellContext.Provider>
  );
}

function AppShellHeader({ className, children, style, ...props }: ComponentPropsWithoutRef<"header">) {
  useAppShell("Header");
  return (
    <header
      data-justui="app-shell-header"
      className={cn(
        "fixed inset-x-0 top-0 z-30 flex items-center border-b border-border bg-bg",
        className,
      )}
      style={{ height: "var(--justui-header-h)", ...style }}
      {...props}
    >
      {children}
    </header>
  );
}

function AppShellNavbar({ className, children, style, ...props }: ComponentPropsWithoutRef<"nav">) {
  const { navbar, breakpoint } = useAppShell("Navbar");
  const opened = navbar?.opened ?? false;

  return (
    <>
      {opened && (
        <div
          aria-hidden="true"
          onClick={navbar?.onClose}
          className={cn("fixed inset-0 z-30 bg-black/50", overlayHidden[breakpoint])}
        />
      )}
      <nav
        data-justui="app-shell-navbar"
        data-opened={opened || undefined}
        className={cn(
          "fixed bottom-0 left-0 z-40 flex-col overflow-y-auto border-r border-border bg-bg",
          opened ? "flex" : navbarVisible[breakpoint],
          className,
        )}
        style={{ top: "var(--justui-header-h)", width: "var(--justui-navbar-w)", ...style }}
        {...props}
      >
        {children}
      </nav>
    </>
  );
}

function AppShellMain({ className, children, style, ...props }: ComponentPropsWithoutRef<"main">) {
  const { breakpoint, navbar, padding: pad } = useAppShell("Main");

  return (
    <main
      data-justui="app-shell-main"
      // The header offset is margin, not padding, so the padding scale below
      // still applies on all four sides — the reference overrode paddingTop and
      // left content flush against the header.
      className={cn(navbar && mainOffset[breakpoint], className)}
      style={{ marginTop: "var(--justui-header-h)", ...style }}
      {...props}
    >
      <div className={padding[pad]}>{children}</div>
    </main>
  );
}

AppShellRoot.displayName = "AppShell";
AppShellHeader.displayName = "AppShell.Header";
AppShellNavbar.displayName = "AppShell.Navbar";
AppShellMain.displayName = "AppShell.Main";

export { AppShellHeader, AppShellMain, AppShellNavbar };

export const AppShell = Object.assign(AppShellRoot, {
  Root: AppShellRoot,
  Header: AppShellHeader,
  Navbar: AppShellNavbar,
  Main: AppShellMain,
});
