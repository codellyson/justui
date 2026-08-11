import { useState } from "react";
import { Select } from "@codellyson/justui/react";

function Demo() {
  const [level, setLevel] = useState('warn');
  const levels = ['debug', 'info', 'warn', 'error'].map((l) => ({ label: l, value: l }));
  return (
    <div className="w-full max-w-sm space-y-4">
      <Select label="Log level" value={level} onChange={setLevel} options={levels} />
      <p className="text-xs text-muted">Selected: <code>{level}</code></p>
      <Select size="xs" placeholder="xs" options={levels} />
      <Select size="lg" placeholder="lg" options={levels} />
      <Select label="Required" placeholder="Nothing picked" error="Pick a level." options={levels} />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
