import { useState } from "react";
import { Button, Drawer } from "@codellyson/justui/react";

function Demo() {
  const [position, setPosition] = useState(null);
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {['left', 'right', 'top', 'bottom'].map((p) => (
          <Button key={p} size="xs" variant="outline" onClick={() => setPosition(p)}>{p}</Button>
        ))}
      </div>
      <Drawer
        opened={position !== null}
        onClose={() => setPosition(null)}
        position={position ?? 'right'}
        size={position === 'top' || position === 'bottom' ? 220 : 380}
        title={`position="${position ?? ''}"`}
      >
        <p className="text-sm text-secondary">Escape or a click outside closes this.</p>
      </Drawer>
    </>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
