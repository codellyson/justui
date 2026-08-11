import { useState } from "react";
import { Input } from "@codellyson/justui/react";

function Demo() {
  const [qty, setQty] = useState(3);
  return (
    <div className="w-full max-w-sm space-y-4">
      <Input label="Quantity" type="number" value={qty} onChange={setQty} min={0} max={10} />
      <Input label="Step of 5" type="number" value={qty} onChange={setQty} step={5} />
      <Input label="No steppers" type="number" value={qty} onChange={setQty} showNumberControls={false} />
      <p className="text-xs text-muted">value: <code>{String(qty)}</code> ({typeof qty})</p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
