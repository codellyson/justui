import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";
import { remarkLive } from "./remark-live.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, "../dist");

export default defineConfig({
  root: here,
  plugins: [
    {
      enforce: "pre",
      // MDX v3 is CommonMark only — tables need GFM turned on explicitly.
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm, remarkLive],
      }),
    },
    react({ include: /\.(jsx|tsx|mdx)$/ }),
  ],
  resolve: {
    alias: {
      // Resolve the way a consumer does, against the built output — so the
      // gallery exercises the real package entry, not the TS sources.
      "@codellyson/justui/react": resolve(dist, "react/index.js"),
      "@codellyson/justui": resolve(dist, "index.js"),
    },
  },
  server: { port: 5199 },
});
