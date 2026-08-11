import { useState } from "react";
import { Button, Drawer } from "@codellyson/justui/react";

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpened(true)}>Bare drawer</Button>
      <Drawer opened={opened} onClose={() => setOpened(false)} withCloseButton={false} padding={false} size={320}>
        <div className="divide-y divide-border">
          {['Overview', 'Logs', 'Settings', 'Members'].map((row) => (
            <button key={row} type="button" className="block w-full px-4 py-3 text-left text-sm text-primary hover:bg-bg-secondary" onClick={() => setOpened(false)}>
              {row}
            </button>
          ))}
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
