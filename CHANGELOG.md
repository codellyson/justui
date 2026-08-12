# Changelog

## 1.0.0

First stable release. The component kit grew from a handful of Astro pieces to
around fifty React components, and the Tailwind story moved to v4.

### Breaking

- **Tailwind v4 is required.** `peerDependencies` is now `tailwindcss@^4.0.0`.
- **The v3 preset is gone.** `@codellyson/justui/tailwind-preset` no longer exists.
  Replace it with the stylesheet the package now ships, which carries the same
  tokens, px type scale, radii, keyframes and container variants:

  ```css
  @import "@codellyson/justui/tailwind.css";
  ```

  That single line pulls in the tokens, Tailwind and the design config, and declares
  its own `@source`, so the package's classes are scanned for you and the old
  `content` glob is unnecessary. `tokens.css` stays exported for apps that use the
  tokens without Tailwind.
- **`outline-none` is now `outline-hidden`** and **`shadow-sm` is now `shadow-xs`**
  across the components, following v4's renames. Only relevant if you were
  overriding those classes.
- **`Menu` defaults to `modal={false}`.** Radix defaults it to modal, which locks
  page scroll and shifts anything sized against the viewport. Pass `modal` to opt
  back in.
- **`Card` was removed** as too opinionated; compose a bordered surface instead.

### Added

- **~50 React components** aligned with `@khaime-dev/ui` conventions: `variant`
  and `color` as separate props, `xs|sm|md|lg` sizes, `label`/`description`/`error`
  on form controls, `onChange` receiving the value, overlays taking
  `opened`/`onClose`, and compound parts only where children repeat.
- **`AppShell`** — header, footer, navbar, aside and an offset main, with sizes as
  config on the root reaching the parts through CSS variables. Breakpoints are
  container queries against the shell, so a shell in a narrow column collapses even
  on a wide screen. `mode="dock"` makes an opened region take its space rather than
  float over the content, capped so it can never starve `Main` below 160px.
- **`NavLink`** with `nested="panel"`, a drill-down that slides children in over the
  navbar behind a back header instead of indenting them.
- **`Table`** on TanStack Table v8 — sorting, row selection, `bordered` as a bare
  boolean or `{ column }`, plus parts for writing the markup yourself. Pagination
  is a separate component.
- **`AssetUploader`** on react-dropzone, as a compound component.
- `MultiSelect`, `TagInput`, `ColorInput`, `ColorPicker`, `TimeInput`, `DateInput`,
  `RadioGroup`, `Avatar`, `Breadcrumb`, `Pagination`, and a searchable `Select`.
- **`@codellyson/justui/tailwind.css`** — the v4 entry point.
- **One focus treatment per kind of focusable**, exported as `focusRing`,
  `focusRingInset` and `focusLink`, so a new component doesn't invent its own.
- **`data-justui`** attributes on components, for targeting in tests and overrides.
- A documentation site on Astro Starlight, and a component gallery.

### Fixed

- Subpath types resolve on legacy `moduleResolution`. `node` and `node10` ignore the
  `exports` field, so `@codellyson/justui/react` failed with TS2307; a
  `typesVersions` fallback covers them.

- Every value dropdown is a real listbox. `PhoneInput` and `PriceInput` announced
  their options as `menuitem` — a command role for choosing a country or currency —
  and none of the dropdowns had any keyboard handling, so the ones declaring
  `role="listbox"` could not be arrow-navigated. All of them now share one
  implementation with `aria-selected`, `aria-activedescendant`, arrow keys,
  Home/End, Enter and typeahead.
- `LoadingOverlay` follows its container's corners instead of squaring them off.
- Navbar section dividers span the navbar rather than stopping short of both edges.
- `Checkbox` shows an indeterminate state instead of a tick.
- `Select` accepts numeric option values.
- `AssetUploader` tiles are sized with real dimension props, not class names, and
  `accept` normalisation no longer rejects the files it was given.
- Publishing works from either package manager; `prepack` no longer depends on a
  POSIX shell.

## 0.4.0

Theme tokens, twelve themes, a no-flash boot script, Astro adapters and the first
token-themed React kit.
