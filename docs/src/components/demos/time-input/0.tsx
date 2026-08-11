import { useState } from "react";
import { TimeInput } from "@codellyson/justui/react";

function Demo() {
  const [time, setTime] = useState(() => {
    const d = new Date();
    d.setHours(14, 30, 0, 0);
    return d;
  });
  return (
    <div className="w-full max-w-xs space-y-3">
      <TimeInput label="Starts at" value={time} onChange={setTime} />
      <p className="text-xs text-muted">
        Date: <code>{time.toISOString()}</code>
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
