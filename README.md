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

On Tailwind v4 the JS config isn't read. Import the stylesheet the package ships
instead — it carries the same tokens, the px type scale, the radii, the keyframes
and the `shell-*` container variants as `@theme` and `@custom-variant`, and it
declares its own `@source`, so the package's classes are scanned for you:

```css
@import "tailwindcss";
@import "@codellyson/justui/tailwind.css";
```

Both entry points describe the same design. `tailwind-preset` is for v3,
`tailwind.css` for v4 — pick the one matching your Tailwind major.

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

**Focus has one treatment per kind of focusable**, exported from the package so a
new component doesn't invent its own: `focusRing` for fields and standalone
buttons, `focusRingInset` for rows in a list or sidebar, `focusLink` for inline
text. The row variant is inset deliberately — an outer ring boxes the row, and it
has to stay visible on a row that already carries a selected background.

**Sizes are `xs` `sm` `md` `lg`.** Where a component needs a real dimension
instead of a scale step, it takes `number | string` — `Modal`'s `width`,
`AssetUploader`'s `tileWidth` / `tileHeight` / `tileRatio`. Class-name props are
escape hatches for looks, never the way to set a size.

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

**`AppShell` frames the page.** `header={{ height }}` and `navbar={{ width, breakpoint, opened }}`
on the root reach `AppShell.Header` / `.Navbar` / `.Main` through CSS variables:

```tsx
<AppShell header={{ height: 56 }} navbar={{ width: 240, opened, onClose: close }}>
  <AppShell.Header>…</AppShell.Header>
  <AppShell.Navbar>…</AppShell.Navbar>
  <AppShell.Main>…</AppShell.Main>
</AppShell>
```

The navbar hides below `breakpoint` (default `md`) and `opened` brings it in over
the content with a dismissable overlay.

**Compound only where children repeat.** `Menu`, `Tabs`, `Dialog`, `Table`,
`AssetUploader`, `Breadcrumb` and `AppShell` expose parts; everything else is prop-driven. Parts are also exported flat (`MenuItem`,
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

**`AssetUploader` is compound where tiles are.** Files arrive by click, drop or
paste via [react-dropzone](https://react-dropzone.js.org); reading and uploading
them stays yours. Pass `items` for the plain case, or tiles as children when each
needs its own overlay — progress, a retry, a cover badge:

```tsx
<AssetUploader onAddFiles={upload} onReject={warn} maxItems={5} count={assets.length}>
  {assets.map((a) => (
    <AssetUploader.Item key={a.id} url={a.url} onRemove={() => remove(a.id)}>
      {a.progress != null && <UploadRing value={a.progress} />}
    </AssetUploader.Item>
  ))}
  <AssetUploader.Add withRemaining />
</AssetUploader>
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

`bordered` frames the table — bare for the frame alone, `bordered={{ column: true }}`
to add vertical rules.

`sortable` makes eligible headers clickable and wires `aria-sort`; a column opts
out with `enableSorting: false`. Own the state with `sorting` / `onSortingChange`
(plus `manualSorting`) when the server does the ordering.

For a hand-written table — a totals row, a `colSpan` group heading, an expandable
detail row — `Table.Root` / `.Header` / `.Body` / `.Footer` / `.Row` / `.Head` /
`.Cell` / `.Caption` are the same styled elements `Table` is built from, so both
forms render identically. `bordered` sits on `Root` and reaches rows via context.

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
