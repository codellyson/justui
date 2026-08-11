import { useState } from "react";
import { TagInput } from "@codellyson/justui/react";

function Demo() {
  const [a, setA] = useState([]);
  const [b, setB] = useState(['sm']);
  return (
    <div className="w-full max-w-sm space-y-4">
      <TagInput label="Split on , ; or space" value={a} onChange={setA} separator={/[,;\s]/} />
      <TagInput size="sm" value={b} onChange={setB} placeholder="Small" />
      <TagInput size="lg" value={[]} onChange={() => {}} placeholder="Large" />
      <TagInput label="Invalid" value={['x']} onChange={() => {}} error="At least two tags required." />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
