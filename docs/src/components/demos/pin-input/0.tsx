import { useState } from "react";
import { PinInput } from "@codellyson/justui/react";

function Demo() {
  const [code, setCode] = useState('');
  const [done, setDone] = useState(null);
  return (
    <div className="space-y-3">
      <PinInput length={6} value={code} onChange={setCode} onComplete={setDone} />
      <p className="text-xs text-muted">
        {code || '(empty)'}{done && ` · completed: ${done}`}
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
