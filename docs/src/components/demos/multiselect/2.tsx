import { useState } from "react";
import { MultiSelect } from "@codellyson/justui/react";

function Demo() {
  const [value, setValue] = useState(['a', 'b']);
  return (
    <div className="w-full max-w-sm">
      <MultiSelect
        label="Members"
        value={value}
        onChange={setValue}
        searchable={false}
        options={[
          { label: 'Ada', value: 'a' }, { label: 'Bo', value: 'b' },
          { label: 'Cy', value: 'c' }, { label: 'Di', value: 'd' },
        ]}
        renderValue={(selected) =>
          selected.length === 0
            ? <span className="px-1 text-muted">Nobody</span>
            : <span className="px-1">{selected.length} of 4 selected</span>
        }
      />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
