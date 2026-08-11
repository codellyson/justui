import { useState } from "react";
import { Card, SegmentedControl, Table } from "@codellyson/justui/react";

function Demo() {
  const [view, setView] = useState('card');
  return (
    <div className="space-y-3">
      <SegmentedControl
        value={view}
        onChange={setView}
        label="View mode"
        data={[
          { value: 'card', label: 'Card' },
          { value: 'compact', label: 'Compact' },
          { value: 'table', label: 'Table' },
        ]}
      />
      <p className="text-xs text-muted">view: <code>{view}</code></p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
