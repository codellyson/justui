import { useState } from "react";
import { Button, Input, Modal } from "@codellyson/justui/react";

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button onClick={() => setOpened(true)}>Rename note</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Rename"
        description="Pick something you'll recognise later."
      >
        <div className="space-y-3">
          <Input defaultValue="untitled" autoFocus />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" color="gray" onClick={() => setOpened(false)}>Cancel</Button>
            <Button onClick={() => setOpened(false)}>Save</Button>
          </div>
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
