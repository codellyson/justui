import { useState } from "react";
import { PhoneInput } from "@codellyson/justui/react";

function Demo() {
  const [phone, setPhone] = useState('+2348012345678');
  return (
    <div className="w-full max-w-sm space-y-3">
      <PhoneInput label="Phone" value={phone} onChange={setPhone} />
      <p className="text-xs text-muted">stored: <code>{phone || '(empty)'}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
