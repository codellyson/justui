import { useState } from "react";
import { Button, Modal } from "@codellyson/justui/react";

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpened(true)}>Full height</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} height="100vh" title="Everything">
        <div className="space-y-3">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="rounded-md border border-border px-3 py-2 text-sm text-secondary">
              Row {i + 1}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
