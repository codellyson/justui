import { useEffect, useState } from "react";

const trim = (path: string) => path.replace(/^\/+|\/+$/g, "");

export const slugFromLocation = () => trim(window.location.pathname);

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  const samePage = trim(url.pathname) === slugFromLocation();

  if (samePage && url.hash) {
    window.location.hash = url.hash;
    return;
  }

  window.history.pushState(null, "", url);
  // pushState does not fire popstate, so tell our own listeners.
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function useRoute(fallback: string): string {
  const [slug, setSlug] = useState(() => slugFromLocation() || fallback);

  useEffect(() => {
    const onPop = () => setSlug(slugFromLocation() || fallback);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [fallback]);

  return slug;
}

/**
 * One delegated handler for every internal link, including the ones inside live
 * demos, which are rendered by library components this app never wraps.
 */
export function useLinkInterceptor() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.hasAttribute("download") || anchor.target === "_blank") return;
      if (href.startsWith("#")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      navigate(url.pathname + url.hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
