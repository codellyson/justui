import { Select, Tab, Tabs } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="logs">Logs</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <p className="text-sm text-secondary">Three deploys today, all green.</p>
      </Tabs.Panel>
      <Tabs.Panel value="logs">
        <p className="text-sm text-secondary">No errors in the last hour.</p>
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <Select label="Region" defaultValue="lag" options={[{ label: 'af-west-1', value: 'lag' }]} />
      </Tabs.Panel>
    </Tabs>
  );
}
