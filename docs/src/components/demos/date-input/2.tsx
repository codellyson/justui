import { useState } from "react";
import { DatePickerPanel } from "@codellyson/justui/react";

function Demo() {
  const [date, setDate] = useState(new Date());
  return (
    <div className="space-y-3">
      <div className="inline-block rounded-lg border border-border">
        <DatePickerPanel value={date} onChange={setDate} size="md" />
      </div>
      <p className="text-xs text-muted">Selected: <code>{date.toDateString()}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
