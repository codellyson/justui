import { useState } from "react";
import { TagInput } from "@codellyson/justui/react";

function Demo() {
  const [a, setA] = useState(['one', 'two']);
  const [b, setB] = useState([]);
  const [c, setC] = useState([]);
  return (
    <div className="w-full max-w-sm space-y-4">
      <TagInput label="Max 3" value={a} onChange={setA} maxTags={3} description="Field disables at the limit." />
      <TagInput label="Duplicates allowed" value={b} onChange={setB} allowDuplicates />
      <TagInput
        label="Lowercase only"
        value={c}
        onChange={setC}
        validateTag={(tag) => /^[a-z-]+$/.test(tag)}
        description="Rejects anything but a-z and dashes."
      />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
