import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { sidebar } from "./sidebar.mjs";

const here = dirname(fileURLToPath(import.meta.url));

// Canonical URLs, og:url and the sitemap all need an absolute origin. Left unset
// none of them are emitted, which is the honest default — a canonical pointing at
// the wrong host is worse than none. Set DOCS_SITE (and DOCS_BASE for a subpath)
// when deploying: DOCS_SITE=https://example.com pnpm --filter justui-docs build
const site = process.env.DOCS_SITE;
const base = process.env.DOCS_BASE;

export default defineConfig({
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  ...(site ? { site } : {}),
  ...(base ? { base } : {}),
  integrations: [
    starlight({
      title: "JustUI",
      description: "Design system for the just* app family.",
      customCss: ["./src/styles/theme.css"],
      sidebar,
      components: { Head: "./src/components/Head.astro" },
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
    // Everything that calls a hook has to sit inside the SSR bundle with the one
    // inlined React. Left external, Radix loads its own React through Node and
    // renders against a null dispatcher.
    ssr: {
      noExternal: [
        "@codellyson/justui",
        /^@radix-ui\//,
        /^@tanstack\//,
        "react-dropzone",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
    },
  },
});
