# justui

## Icons
Never pass a character where an icon belongs — no `<span>ℹ</span>`, no arrows, no
emoji, in `icon` / `leftIcon` / `rightIcon` / `leftSection` / `rightSection` /
`bullet`. Import from `@heroicons/react/16/solid`; docs import from
`playground/src/icons.tsx`, which is already in the live-preview scope.

Characters are fine as *text*: `rightSection="⌘R"`, currency symbols.

Run `pnpm check:icons` before reporting work done.

## The gallery is product
`playground/src/docs/*.mdx` is the documentation consumers read and copy. Hold it
to the same standard as `src/` — no filler examples.

## API
Mirror `@khaime-dev/ui` (`C:\Users\isiak\workfolder\khaime\khaime-ui`): `variant`
and `color` separate, sizes `xs|sm|md|lg`, `label`/`description`/`error` on form
controls, `onChange` receives the value, overlays take `opened`/`onClose`,
compound parts only where children repeat.

## Verifying
Check exit codes, never `pnpm run build | tail` — the pipe hides the failure.
