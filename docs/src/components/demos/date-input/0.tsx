import { useState } from "react";
import { DateInput } from "@codellyson/justui/react";

function Demo() {
  const [date, setDate] = useState(new Date(2026, 7, 14));
  return (
    <div className="w-full max-w-xs space-y-3">
      <DateInput label="Publish on" value={date} onChange={setDate} />
      <p className="text-xs text-muted">
        Date: <code>{date ? date.toDateString() : '(none)'}</code>
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
