import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { sidebar } from "./sidebar.mjs";

const here = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [
    starlight({
      title: "JustUI",
      description: "Design system for the just* app family.",
      customCss: ["./src/styles/tokens.css", "./src/styles/theme.css"],
      sidebar,
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
