import { useState } from "react";
import { Slider } from "@codellyson/justui/react";

function Demo() {
  const [v, setV] = useState(35);
  return (
    <div className="w-full max-w-sm space-y-4">
      <Slider value={v} onChange={setV} label={(n) => `${n}%`} />
      <p className="text-xs text-muted">value: <code>{v}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
