import { useState } from "react";
import { Button, Modal } from "@codellyson/justui/react";

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <div
      className="w-full rounded-md border border-dashed border-border p-3"
      style={{ overflow: 'hidden', height: 110, transform: 'translateZ(0)' }}
    >
      <p className="mb-2 text-xs text-muted">overflow: hidden · transform: translateZ(0)</p>
      <Button size="xs" onClick={() => setOpened(true)}>Open from inside</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Not clipped">
        <p className="text-sm text-secondary">Rendered at the end of body.</p>
      </Modal>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
