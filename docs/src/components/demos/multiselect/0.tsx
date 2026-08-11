import { useState } from "react";
import { MultiSelect } from "@codellyson/justui/react";

function Demo() {
  const [value, setValue] = useState(['live']);
  return (
    <div className="w-full max-w-sm space-y-3">
      <MultiSelect
        label="Status"
        value={value}
        onChange={setValue}
        options={[
          { label: 'Live', value: 'live' },
          { label: 'Draft', value: 'draft' },
          { label: 'Scheduled', value: 'scheduled' },
          { label: 'Archived', value: 'archived' },
          { label: 'Deleted', value: 'deleted', disabled: true },
        ]}
      />
      <p className="text-xs text-muted">value: <code>{JSON.stringify(value)}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
