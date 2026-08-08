"use client";

import { useEffect, useState } from "react";

// False on the server and first paint, then syncs — don't gate SSR markup on it.
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
