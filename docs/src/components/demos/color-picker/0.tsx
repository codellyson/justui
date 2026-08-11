import { useState } from "react";
import { ColorPicker } from "@codellyson/justui/react";

function Demo() {
  const [color, setColor] = useState('#3b82f6');
  return (
    <div className="w-full max-w-sm space-y-3">
      <ColorPicker label="Brand" value={color} onChange={setColor} />
      <div className="flex items-center gap-2 text-xs text-muted">
        value: <code>{color || '(empty)'}</code>
        <span className="h-4 w-4 rounded border border-border" style={{ background: color }} />
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
