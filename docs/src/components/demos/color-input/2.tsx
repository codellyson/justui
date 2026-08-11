import { useState } from "react";
import { ColorInput } from "@codellyson/justui/react";

function Demo() {
  const [a, setA] = useState('#ec4899');
  const [b, setB] = useState('');
  return (
    <div className="w-full max-w-sm space-y-4">
      <ColorInput
        label="Brand palette only"
        value={a}
        onChange={setA}
        swatches={['#0f172a', '#3b82f6', '#ec4899']}
      />
      <ColorInput label="No presets" value={b} onChange={setB} swatches={[]} />
      <ColorInput size="sm" value="#eab308" onChange={() => {}} swatches={[]} />
      <ColorInput size="lg" value="#14b8a6" onChange={() => {}} swatches={[]} />
      <ColorInput label="Disabled" value="#64748b" onChange={() => {}} disabled swatches={[]} />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
