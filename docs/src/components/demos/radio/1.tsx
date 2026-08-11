import { useState } from "react";
import { RadioGroup } from "@codellyson/justui/react";

function Demo() {
  const [size, setSize] = useState('md');
  const [visibility, setVisibility] = useState('public');
  return (
    <div className="space-y-6">
      <RadioGroup
        label="Size"
        value={size}
        onChange={setSize}
        options={[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
        ]}
      />
      <RadioGroup
        label="Visibility"
        value={visibility}
        onChange={setVisibility}
        className="flex-row gap-6"
        options={[
          { value: 'public', label: 'Public' },
          { value: 'private', label: 'Private' },
        ]}
      />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
