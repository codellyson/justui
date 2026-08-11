import { AppShell } from "@codellyson/justui/react";

const shell = (layout) => (
  <div
    className="relative h-52 overflow-hidden rounded-lg border border-border"
    style={{ transform: 'translate(0)' }}
  >
    <AppShell
      layout={layout}
      header={{ height: 40 }}
      navbar={{ width: 96, breakpoint: 'sm' }}
      padding="sm"
      className="min-h-full"
    >
      <AppShell.Header className="px-3 text-xs font-semibold">header</AppShell.Header>
      <AppShell.Navbar className="p-2 text-xs text-muted">navbar</AppShell.Navbar>
      <AppShell.Main>
        <p className="font-mono text-xs text-secondary">layout="{layout}"</p>
      </AppShell.Main>
    </AppShell>
  </div>
);

export default function JustuiDemo() {
  return (
    <div className="grid gap-6">
    {shell('default')}
    {shell('alt')}
  </div>
  );
}
