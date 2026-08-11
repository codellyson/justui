import { useState } from "react";
import { MultiSelect } from "@codellyson/justui/react";

function Demo() {
  const [a, setA] = useState([]);
  const [b, setB] = useState(['r', 'v', 'a', 's']);
  const frameworks = [
    { label: 'React', value: 'r' }, { label: 'Vue', value: 'v' },
    { label: 'Angular', value: 'a' }, { label: 'Svelte', value: 's' },
    { label: 'Solid', value: 'so' },
  ];
  return (
    <div className="w-full max-w-sm space-y-4">
      <MultiSelect label="With select all" value={a} onChange={setA} options={frameworks} withSelectAll />
      <MultiSelect label="Collapses past 2" value={b} onChange={setB} options={frameworks} maxDisplayed={2} />
      <MultiSelect label="No matches" value={[]} onChange={() => {}} options={[]} emptyMessage="No frameworks yet" />
      <MultiSelect label="Required" value={[]} onChange={() => {}} options={frameworks} error="Pick at least one." />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
