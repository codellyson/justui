# justui docs

The documentation site, on [Astro Starlight](https://starlight.astro.build/).

```sh
pnpm --filter justui-docs dev
pnpm --filter justui-docs build
```

Both build the library first. `dist` is a build artifact and is gitignored, so a
clean checkout has none, and the docs import the package through the workspace
link — without that step the build fails to resolve `@codellyson/justui/react`.

## Deploying

Set `DOCS_SITE` to the absolute origin the site will be served from. Without it
Astro emits no canonical URLs, no `og:url` and no sitemap — deliberately, because a
canonical pointing at the wrong host is worse than none.

```sh
DOCS_SITE=https://docs.example.com pnpm --filter justui-docs build
```

Add `DOCS_BASE` when serving from a subpath, e.g. GitHub Pages at
`https://user.github.io/justui`:

```sh
DOCS_SITE=https://user.github.io DOCS_BASE=/justui pnpm --filter justui-docs build
```

## llms.txt

Two generated endpoints, following [llmstxt.org](https://llmstxt.org):

- `/llms.txt` — the index: setup, then every page grouped as it is in the sidebar,
  each with its description.
- `/llms-full.txt` — every page in one file, MDX machinery stripped but prose, prop
  tables and example code kept.

Both are Astro endpoints reading the content collection, so they cannot drift from
the pages. Links are absolute when `DOCS_SITE` is set and relative otherwise.

## Where the content comes from

`playground/src/docs/*.mdx` is the source. `scripts/port-pages.mjs` converts it:
frontmatter replaces the `export const title/group` pair, each ```jsx live fence
becomes a real component under `src/components/demos/<page>/<n>.tsx`, and the
sidebar is generated from the groups the pages declare.

```sh
node scripts/port-pages.mjs
```

Demos are extracted rather than evaluated from code strings so they server-render:
the markup is in the HTML, there is no layout shift as islands hydrate, and the
examples are type-checked. `client:visible` still hydrates them for interactivity.
