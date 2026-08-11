import { AppShell, NavLink } from "@codellyson/justui/react";

function Demo() {
  return (
    <div
      className="relative h-[300px] overflow-hidden rounded-lg border border-border"
      style={{ transform: 'translate(0)' }}
    >
      <AppShell navbar={{ width: 200, breakpoint: 'sm' }} padding="sm" className="min-h-full">
        <AppShell.Navbar className="p-2">
          <AppShell.Section className="pb-2 text-xs font-medium uppercase tracking-wider text-muted">
            Pinned top
          </AppShell.Section>
          <AppShell.Section grow className="flex flex-col gap-1">
            {Array.from({ length: 14 }, (_, i) => (
              <NavLink key={i} label={`Project ${i + 1}`} active={i === 1} />
            ))}
          </AppShell.Section>
          <AppShell.Section className="-mx-2 mt-2 border-t border-border px-2 pt-2 text-xs text-muted">
            Pinned bottom
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>
          <p className="text-sm text-secondary">Scroll the navbar — the ends stay put.</p>
        </AppShell.Main>
      </AppShell>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
