import { useState } from "react";
import { Button, Dialog } from "@codellyson/justui/react";

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => setOpened(true)}>Open</Button>
      <span className="text-xs text-muted">opened: {String(opened)}</span>
      <Dialog open={opened} onOpenChange={setOpened}>
        <Dialog.Content className="max-w-sm">
          <Dialog.Header>
            <Dialog.Title>Delete project</Dialog.Title>
            <Dialog.Description>This cannot be undone.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Button variant="ghost" color="gray" onClick={() => setOpened(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpened(false)}>Delete</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
