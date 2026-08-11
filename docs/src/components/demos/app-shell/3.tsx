import { useState } from "react";
import { AppShell, Button, NavLink } from "@codellyson/justui/react";

function Demo() {
  const [nav, setNav] = useState(false);
  const [aside, setAside] = useState(false);
  return (
    <div
      className="relative h-[300px] overflow-hidden rounded-lg border border-border"
      style={{ transform: 'translate(0)' }}
    >
      <AppShell
        header={{ height: 48 }}
        navbar={{ width: 180, breakpoint: 'xl', opened: nav, onClose: () => setNav(false) }}
        aside={{ width: 180, breakpoint: 'xl', opened: aside, onClose: () => setAside(false) }}
        className="min-h-full"
      >
        <AppShell.Header className="gap-2 px-2">
          <Button size="xs" variant="ghost" onClick={() => setNav((o) => !o)}>Nav</Button>
          <Button size="xs" variant="ghost" className="ml-auto" onClick={() => setAside((o) => !o)}>
            Aside
          </Button>
        </AppShell.Header>
        <AppShell.Navbar className="p-2">
          <NavLink label="Overview" onClick={() => setNav(false)} />
          <NavLink label="Logs" onClick={() => setNav(false)} />
        </AppShell.Navbar>
        <AppShell.Aside className="p-3 text-sm text-secondary">Aside panel</AppShell.Aside>
        <AppShell.Main>
          <p className="text-sm text-secondary">
            nav: <code>{String(nav)}</code> · aside: <code>{String(aside)}</code>
          </p>
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
