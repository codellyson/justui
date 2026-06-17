import { useCallback, useEffect, useState } from "react";
import type { ThemePlugin, ThemeVariant } from "../theme-plugins.js";
import { BUILT_IN_THEMES, DEFAULT_THEME_ID, VAR_MAP } from "../theme-plugins.js";

export type ThemeMode = "light" | "dark";

export interface ThemeState {
  themeId: string;
  mode: ThemeMode;
  themes: readonly ThemePlugin[];
  setThemeId: (id: string) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

function applyVariant(variant: ThemeVariant, mode: ThemeMode): void {
  const root = document.documentElement;
  (Object.keys(VAR_MAP) as (keyof ThemeVariant)[]).forEach((key) => {
    const value = variant[key];
    if (value) root.style.setProperty(VAR_MAP[key], value);
  });
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  root.dataset.themeMode = mode;
}

function ctxKeys(): { idKey: string; modeKey: string } {
  const ctx = typeof window !== "undefined" ? window.__JUSTUI__ : undefined;
  return {
    idKey: ctx?.idKey ?? "justui.theme.id",
    modeKey: ctx?.modeKey ?? "justui.theme.mode",
  };
}

function readInitialState(): { themeId: string; mode: ThemeMode } {
  if (typeof document === "undefined") {
    return { themeId: DEFAULT_THEME_ID, mode: "dark" };
  }
  const root = document.documentElement;
  const themeId = root.dataset.themeId ?? DEFAULT_THEME_ID;
  const mode = (root.dataset.themeMode === "light" ? "light" : "dark") as ThemeMode;
  return { themeId, mode };
}

/**
 * React hook around the bootTheme() store. Returns the current themeId
 * + mode and setters that write through to localStorage + reapply the
 * CSS custom properties on `<html>`. Subscribes to the `storage` event
 * so cross-tab updates land here too.
 *
 * bootTheme() must have run before the component mounts (typically from
 * main.tsx before createRoot, or from an inline boot script in
 * index.html). Without it the hook still works but falls back to the
 * default theme on first render.
 */
export function useTheme(): ThemeState {
  const [state, setState] = useState(readInitialState);

  // Cross-tab sync — when another tab writes a new theme, mirror it.
  useEffect(() => {
    const { idKey, modeKey } = ctxKeys();
    const onStorage = (e: StorageEvent) => {
      if (e.key !== idKey && e.key !== modeKey) return;
      setState(readInitialState());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setThemeId = useCallback((id: string) => {
    const theme = BUILT_IN_THEMES.find((t) => t.id === id);
    if (!theme) return;
    setState((s) => {
      applyVariant(s.mode === "dark" ? theme.dark : theme.light, s.mode);
      document.documentElement.dataset.themeId = id;
      const { idKey } = ctxKeys();
      try {
        localStorage.setItem(idKey, id);
      } catch {
        /* localStorage blocked */
      }
      return { ...s, themeId: id };
    });
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    setState((s) => {
      const theme = BUILT_IN_THEMES.find((t) => t.id === s.themeId) ?? BUILT_IN_THEMES[0];
      applyVariant(mode === "dark" ? theme.dark : theme.light, mode);
      const { modeKey } = ctxKeys();
      try {
        localStorage.setItem(modeKey, mode);
      } catch {
        /* localStorage blocked */
      }
      return { ...s, mode };
    });
  }, []);

  const toggleMode = useCallback(() => {
    setMode(state.mode === "dark" ? "light" : "dark");
  }, [state.mode, setMode]);

  return {
    themeId: state.themeId,
    mode: state.mode,
    themes: BUILT_IN_THEMES,
    setThemeId,
    setMode,
    toggleMode,
  };
}
