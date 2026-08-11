import { useState } from "react";
import { Button, Modal } from "@codellyson/justui/react";

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button onClick={() => setOpened(true)}>Open sheet (narrow window first)</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Drag me down">
        <p className="text-sm text-secondary">
          Grab the pill at the top and pull down.
        </p>
      </Modal>
    </>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
