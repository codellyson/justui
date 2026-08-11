import { useState } from "react";
import { AppShell, Button, SegmentedControl } from "@codellyson/justui/react";

function Demo() {
  const [mode, setMode] = useState('overlay');
  const [nav, setNav] = useState(false);
  const [aside, setAside] = useState(false);

  return (
    <div className="space-y-3">
      <SegmentedControl
        label="Mode"
        value={mode}
        onChange={setMode}
        data={[{ value: 'overlay', label: 'overlay' }, { value: 'dock', label: 'dock' }]}
      />
      <div
        className="relative h-[320px] overflow-hidden rounded-lg border border-border"
        style={{ transform: 'translate(0)' }}
      >
        <AppShell
          header={{ height: 48 }}
          navbar={{ width: 160, breakpoint: 'xl', mode, opened: nav, onClose: () => setNav(false) }}
          aside={{ width: 160, breakpoint: 'xl', mode, opened: aside, onClose: () => setAside(false) }}
          padding="sm"
          className="min-h-full"
        >
          <AppShell.Header className="gap-2 px-2">
            <Button size="xs" variant="ghost" onClick={() => setNav((o) => !o)}>Nav</Button>
            <Button size="xs" variant="ghost" className="ml-auto" onClick={() => setAside((o) => !o)}>
              Aside
            </Button>
          </AppShell.Header>
          <AppShell.Navbar className="p-2 text-sm text-secondary">Navbar</AppShell.Navbar>
          <AppShell.Aside className="p-2 text-sm text-secondary">Aside</AppShell.Aside>
          <AppShell.Main>
            <p className="text-sm text-secondary">
              Main content. In <code>dock</code> it gets narrower; in <code>overlay</code> it stays
              put and the panel covers it.
            </p>
          </AppShell.Main>
        </AppShell>
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
