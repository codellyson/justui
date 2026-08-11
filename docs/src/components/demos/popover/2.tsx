import { useState } from "react";
import { Button, Popover } from "@codellyson/justui/react";

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Popover opened={opened} onChange={setOpened} position="right">
        <Popover.Target asChild>
          <Button variant="outline">Toggle</Button>
        </Popover.Target>
        <Popover.Dropdown>
          <p className="text-sm text-secondary">opened is {String(opened)}.</p>
        </Popover.Dropdown>
      </Popover>
      <Button size="xs" variant="ghost" color="gray" onClick={() => setOpened((v) => !v)}>
        From outside
      </Button>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
