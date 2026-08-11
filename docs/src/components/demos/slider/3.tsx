import { useState } from "react";
import { Slider } from "@codellyson/justui/react";

function Demo() {
  const [live, setLive] = useState(50);
  const [committed, setCommitted] = useState(50);
  return (
    <div className="w-full max-w-sm space-y-3">
      <Slider defaultValue={50} onChange={setLive} onChangeEnd={setCommitted} />
      <p className="text-xs text-muted">
        onChange: <code>{live}</code> · onChangeEnd: <code>{committed}</code>
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
