import { useState } from "react";
import { Button, Modal } from "@codellyson/justui/react";

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpened(true)}>Delete project</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="Delete project"
        description="This cannot be undone."
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
      >
        <div className="flex justify-end gap-2">
          <Button variant="ghost" color="gray" onClick={() => setOpened(false)}>Keep it</Button>
          <Button variant="danger" onClick={() => setOpened(false)}>Delete</Button>
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
