import { useState } from "react";
import { Button, Tab, Tabs } from "@codellyson/justui/react";

function Demo() {
  const [tab, setTab] = useState('build');
  return (
    <div className="w-full max-w-lg space-y-3">
      <Tabs value={tab} onChange={setTab}>
        <Tabs.List>
          <Tabs.Tab value="build">Build</Tabs.Tab>
          <Tabs.Tab value="test">Test</Tabs.Tab>
          <Tabs.Tab value="deploy" disabled>Deploy</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="build">
          <p className="text-sm text-secondary">tsc --noEmit · 2.1s</p>
        </Tabs.Panel>
        <Tabs.Panel value="test">
          <p className="text-sm text-secondary">128 passed, 0 failed</p>
        </Tabs.Panel>
      </Tabs>
      <Button size="xs" variant="outline" onClick={() => setTab(tab === 'build' ? 'test' : 'build')}>
        Toggle from outside
      </Button>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
