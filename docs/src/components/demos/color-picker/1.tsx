import { useState } from "react";
import { ColorPicker } from "@codellyson/justui/react";

function Demo() {
  const [a, setA] = useState('#22c55e');
  const [b, setB] = useState('');
  return (
    <div className="w-full max-w-sm space-y-4">
      <ColorPicker
        label="Brand palette"
        value={a}
        onChange={setA}
        columns={4}
        presetColors={['#0f172a', '#3b82f6', '#22c55e', '#f97316']}
        presetsLabel="Brand"
      />
      <ColorPicker
        label="No presets — field only"
        value={b}
        onChange={setB}
        presetColors={[]}
      />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
