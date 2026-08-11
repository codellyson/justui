import { useState } from "react";
import { MultiDatePickerPanel } from "@codellyson/justui/react";

function Demo() {
  const [dates, setDates] = useState([]);
  return (
    <div className="space-y-3">
      <div className="inline-block rounded-lg border border-border">
        <MultiDatePickerPanel value={dates} onChange={setDates} maxSelections={5} />
      </div>
      <p className="text-xs text-muted">
        {dates.length === 0
          ? 'Nothing selected'
          : dates.map((d) => d.toLocaleDateString()).join(', ')}
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
