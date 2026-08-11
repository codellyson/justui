import { useState } from "react";
import { Checkbox, Select } from "@codellyson/justui/react";

function Demo() {
  const [items, setItems] = useState([true, false, false]);
  const all = items.every(Boolean);
  const some = items.some(Boolean) && !all;
  return (
    <div className="space-y-3">
      <Checkbox
        label="Select all"
        checked={all ? true : some ? 'indeterminate' : false}
        onChange={() => setItems(items.map(() => !all))}
      />
      <div className="ml-6 space-y-2">
        {items.map((checked, i) => (
          <Checkbox
            key={i}
            label={`Item ${i + 1}`}
            checked={checked}
            onChange={(next) => setItems(items.map((v, j) => (j === i ? next === true : v)))}
          />
        ))}
      </div>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
