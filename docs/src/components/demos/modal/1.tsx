import { useState } from "react";
import { Button, Modal } from "@codellyson/justui/react";

function Demo() {
  const [mode, setMode] = useState(null);
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => setMode('adaptive')}>Adaptive (default)</Button>
        <Button variant="outline" onClick={() => setMode('centered')}>Always centered</Button>
        <Button variant="outline" onClick={() => setMode('wide')}>Wide</Button>
      </div>
      <Modal
        opened={mode !== null}
        onClose={() => setMode(null)}
        centered={mode === 'centered'}
        width={mode === 'wide' ? 'min(720px, 92vw)' : undefined}
        title={mode ?? ''}
        description="Resize the window to see the layout switch."
      >
        <p className="text-sm text-secondary">
          Below 768px this is a sheet unless <code>centered</code> is set.
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
