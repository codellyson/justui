import { useState } from "react";
import { TimeInput } from "@codellyson/justui/react";

function Demo() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [c, setC] = useState(null);
  return (
    <div className="w-full max-w-xs space-y-4">
      <TimeInput label="24-hour" format="24h" value={a} onChange={setA} />
      <TimeInput label="Every 15 minutes" minuteStep={15} value={b} onChange={setB} />
      <TimeInput label="Every 5 minutes" minuteStep={5} value={c} onChange={setC} />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
