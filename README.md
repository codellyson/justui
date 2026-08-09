# @codellyson/justui

Shared design system for the `just*` app family — theme tokens, six built-in themes (GitHub, Espresso, Catppuccin Mocha, Gruvbox, Nord, Solarized), a no-flash boot script, ready-made Astro components, and a Tailwind preset.

See [STYLE_GUIDE.md](https://github.com/codellyson/justrunjs/blob/master/STYLE_GUIDE.md) for the full design spec.

## Gallery

```sh
pnpm playground
```

Every component documented in MDX with live, editable previews, a switcher across
all twelve themes, and a control that changes the host's root font size. See
[playground/README.md](./playground/README.md) to add a page.

## Install

```sh
pnpm add @codellyson/justui
```

Peers your app needs separately:

```sh
pnpm add @fontsource-variable/geist @fontsource-variable/geist-mono tailwindcss
pnpm add @heroicons/react
```

`@heroicons/react` is a required peer — the React components import from it, and
the `leftIcon` / `icon` props expect icon components rather than characters.

## Quick start (Astro + Tailwind)

### 1. Tailwind preset

```js
// tailwind.config.cjs
const { withJustUI } = require('@codellyson/justui/tailwind-preset');

module.exports = withJustUI({
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
});
```

`withJustUI` applies the preset **and** prepends the globs for the package's own
shipped components, so their classes are generated. Don't write that glob by
hand: Tailwind v3 replaces `content` across presets rather than merging it, and
`./node_modules/@codellyson/justui/**` matches nothing under pnpm — the package
is a symlink into the store and Tailwind's globber won't traverse it. Either
mistake gives you an unstyled UI with no error.

If you'd rather keep your own config shape, spread the globs instead:

```js
const preset = require('@codellyson/justui/tailwind-preset');

module.exports = {
  presets: [preset],
  content: [...preset.content, './src/**/*.{astro,ts,tsx}'],
};
```

On Tailwind v4 the JS config isn't read; point at the package from CSS instead:

```css
@import "tailwindcss";
@source "../node_modules/@codellyson/justui/dist";
```

### 2. Token fallback + Tailwind directives

```css
/* src/styles/global.css */
@import "@codellyson/justui/tokens.css";

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
      import { bootTheme } from '@codellyson/justui/boot';
      bootTheme({ keyPrefix: 'myapp' });
    </script>
  </head>
  <body><slot /></body>
</html>
```

### 4. Drop in the picker

```astro
---
import ThemeToggle from '@codellyson/justui/astro/ThemeToggle.astro';
---
<ThemeToggle />
```

The floating button at bottom-right opens a panel with a mode toggle (light/dark) + all six themes. State persists to `myapp.theme.id` / `myapp.theme.mode`.

## What's in the package

| Export | Purpose |
|---|---|
| `@codellyson/justui` | `BUILT_IN_THEMES`, `DEFAULT_THEME_ID`, `VAR_MAP`, `bootTheme` |
| `@codellyson/justui/boot` | Just `bootTheme` — small import if you only want this |
| `@codellyson/justui/themes` | Just the theme catalog |
| `@codellyson/justui/tokens.css` | `:root` fallback (Espresso dark) |
| `@codellyson/justui/tailwind-preset` | Tailwind config preset |
| `@codellyson/justui/astro/Button.astro` | Primary / secondary button |
| `@codellyson/justui/astro/ThemeToggle.astro` | Floating theme picker |
| `@codellyson/justui/react` | React component kit (Radix under the hood), `useTheme`, `cn` |

## React

```tsx
import { Button, Input, Menu, Modal } from '@codellyson/justui/react';
```

Every component ships with a `"use client"` directive, so importing them from a
Next.js App Router **server** component works — no wrapper file needed. `cn` is
the exception and stays server-safe.

### Conventions

The API follows the house style of `@khaime-dev/ui`, so names and code transfer
between the two.

**`variant` and `color` are separate props.** `variant` picks the shape, `color`
picks the palette — there is no `destructive` variant:

```tsx
<Button variant="outline" color="red">Delete</Button>
<Badge variant="solid" color="green">Live</Badge>
```

**Sizes are `xs` `sm` `md` `lg`.**

**Form controls own their label.** `label`, `description` and `error` are props on
`Input`, `Textarea`, `Select`, `Checkbox` and `Switch` — there is no separate
wrapper component. The id, `htmlFor`, `aria-describedby` and `aria-invalid` are
wired for you during render, so the SSR markup carries them too:

```tsx
<Input label="Slug" description="Lowercase only." error={errors.slug} />
```

An `error` supersedes a `description`, and sets `aria-invalid` plus the danger
border.

**`onChange` gives you the value**, not the event. `onChangeEvent` is there when
you need the event itself:

```tsx
<Input value={slug} onChange={setSlug} />
<Select value={region} onChange={setRegion} options={regions} />
<Switch checked={on} onChange={setOn} />
```

**Overlays use `opened` + `onClose`**, with `withCloseButton`,
`closeOnClickOutside` and `closeOnEscape`:

```tsx
<Modal opened={opened} onClose={close} title="Rename" withCloseButton>…</Modal>
```

`Modal` is **adaptive**: a centred dialog on wide screens, a bottom sheet below
`mobileBreakpoint` (768px), and the sheet can be dragged down to dismiss. Pass
`centered` to keep it centred at every width.

**Compound only where children repeat.** `Menu`, `Tabs` and `Dialog` expose parts;
everything else is prop-driven. Parts are also exported flat (`MenuItem`,
`TabsList`, …) if you need per-part tree-shaking.

```tsx
<Menu>
  <Menu.Target asChild><Button>Actions</Button></Menu.Target>
  <Menu.Dropdown>
    <Menu.Label>Project</Menu.Label>
    <Menu.Item rightSection="⌘R">Rename</Menu.Item>
    <Menu.Divider />
    <Menu.Item color="red">Delete</Menu.Item>
  </Menu.Dropdown>
</Menu>

<Tabs defaultValue="logs" onChange={setTab}>
  <Tabs.List>
    <Tabs.Tab value="logs" rightSection={<Badge>3</Badge>}>Logs</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="logs">…</Tabs.Panel>
</Tabs>
```

**`Table` renders rows, nothing else.** Columns are
[TanStack Table](https://tanstack.com/table) v8 `ColumnDef`s — pinned to v8
because that's what `@khaime-dev/ui` uses, and v9 renamed the row-model API, so
column definitions would stop transferring. `ColumnDef` is re-exported for the
common case.

Paging isn't a table concern: the page is a slice of your own data, and
`Pagination` is a separate component that works for any paged list.

```tsx
const rows = all.slice((page - 1) * perPage, page * perPage);

<Table columns={columns} data={rows} />
<Pagination page={page} total={Math.ceil(all.length / perPage)} onChange={setPage} />
```

Server-side paging is the same code with a request in place of `slice`.

`Dialog` is the one exception that keeps Radix's `open` / `onOpenChange` — it *is*
the Radix layer. `Modal` is where the `opened` / `onClose` house style lives, as a
preset over it.

```tsx
<Dialog>
  <Dialog.Target asChild><Button>Invite</Button></Dialog.Target>
  <Dialog.Content withCloseButton={false}>
    <Dialog.Header>
      <Dialog.Title>Invite a teammate</Dialog.Title>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close asChild><Button>Done</Button></Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>
```

## Per-app prefix

Each `just*` app should call `bootTheme({ keyPrefix: '<appname>' })` so theme state doesn't collide on shared origins. The `ThemeToggle` reads the prefix from the global `window.__JUSTUI__` that `bootTheme()` stamps, so the same component works in every app without per-app config.

If you want themes to be **shared** across apps on the same origin (so picking Gruvbox in one carries to the other), use the default `keyPrefix: 'justui'` everywhere.

## License

MIT
