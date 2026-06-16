# justui

Shared design system for the `just*` app family — theme tokens, six built-in themes (GitHub, Espresso, Catppuccin Mocha, Gruvbox, Nord, Solarized), a no-flash boot script, ready-made Astro components, and a Tailwind preset.

See [STYLE_GUIDE.md](https://github.com/codellyson/justrunjs/blob/master/STYLE_GUIDE.md) for the full design spec.

## Install

```sh
pnpm add justui
```

Peers your app needs separately:

```sh
pnpm add @fontsource-variable/geist @fontsource-variable/geist-mono tailwindcss
```

## Quick start (Astro + Tailwind)

### 1. Tailwind preset

```js
// tailwind.config.mjs
import justuiPreset from 'justui/tailwind-preset';

export default {
  presets: [justuiPreset],
  content: [
    './src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}',
    // Include the package's components so Tailwind generates classes
    // used inside Button.astro / ThemeToggle.astro.
    './node_modules/justui/src/**/*.{astro,js,ts}',
  ],
};
```

### 2. Token fallback + Tailwind directives

```css
/* src/styles/global.css */
@import "justui/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Boot the theme before first paint

```astro
---
// src/layouts/Layout.astro
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '../styles/global.css';
---
<!doctype html>
<html lang="en">
  <head>
    <!-- Runs before <body> renders so the right palette paints first. -->
    <script>
      import { bootTheme } from 'justui/boot';
      bootTheme({ keyPrefix: 'myapp' });
    </script>
  </head>
  <body><slot /></body>
</html>
```

### 4. Drop in the picker

```astro
---
import ThemeToggle from 'justui/astro/ThemeToggle.astro';
---
<ThemeToggle />
```

The floating button at bottom-right opens a panel with a mode toggle (light/dark) + all six themes. State persists to `myapp.theme.id` / `myapp.theme.mode`.

## What's in the package

| Export | Purpose |
|---|---|
| `justui` | `BUILT_IN_THEMES`, `DEFAULT_THEME_ID`, `VAR_MAP`, `bootTheme` |
| `justui/boot` | Just `bootTheme` — small import if you only want this |
| `justui/themes` | Just the theme catalog |
| `justui/tokens.css` | `:root` fallback (Espresso dark) |
| `justui/tailwind-preset` | Tailwind config preset |
| `justui/astro/Button.astro` | Primary / secondary button |
| `justui/astro/ThemeToggle.astro` | Floating theme picker |

## Per-app prefix

Each `just*` app should call `bootTheme({ keyPrefix: '<appname>' })` so theme state doesn't collide on shared origins. The `ThemeToggle` reads the prefix from the global `window.__JUSTUI__` that `bootTheme()` stamps, so the same component works in every app without per-app config.

If you want themes to be **shared** across apps on the same origin (so picking Gruvbox in one carries to the other), use the default `keyPrefix: 'justui'` everywhere.

## License

MIT
