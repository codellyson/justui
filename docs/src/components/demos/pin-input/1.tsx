import { useState } from "react";
import { PinInput } from "@codellyson/justui/react";

function Demo() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  return (
    <div className="space-y-5">
      <PinInput length={4} value={a} onChange={setA} mask size="lg" label="Masked, 4 digits" />
      <PinInput length={5} value={b} onChange={setB} alphanumeric size="sm"
        label="Alphanumeric" description="Letters are upper-cased." />
      <PinInput length={4} value="12" onChange={() => {}} error="That code has expired." />
      <PinInput length={4} value="99" onChange={() => {}} label="Disabled" disabled />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
