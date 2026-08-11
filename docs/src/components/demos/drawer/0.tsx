import { useState } from "react";
import { Button, Checkbox, Drawer, Select, Slider } from "@codellyson/justui/react";

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button onClick={() => setOpened(true)}>Open filters</Button>
      <Drawer opened={opened} onClose={() => setOpened(false)} title="Filters">
        <div className="space-y-4">
          <Select label="Status" placeholder="Any" options={[
            { label: 'Live', value: 'live' },
            { label: 'Draft', value: 'draft' },
          ]} />
          <Checkbox label="Only mine" />
          <Slider label={(v) => `${v} days`} defaultValue={30} max={90} />
          <Button fullWidth onClick={() => setOpened(false)}>Apply</Button>
        </div>
      </Drawer>
    </>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
