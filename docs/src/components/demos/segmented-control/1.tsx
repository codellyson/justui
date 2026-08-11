import { useState } from "react";
import { SegmentedControl } from "@codellyson/justui/react";
import { Bars3Icon, Squares2X2Icon } from "../../icons";

function Demo() {
  const [a, setA] = useState('grid');
  const [b, setB] = useState('all');
  return (
    <div className="w-full max-w-md space-y-4">
      <SegmentedControl
        value={a}
        onChange={setA}
        size="md"
        label="Layout"
        data={[
          { value: 'grid', label: 'Grid', leftSection: <Squares2X2Icon /> },
          { value: 'list', label: 'List', leftSection: <Bars3Icon /> },
        ]}
      />
      <SegmentedControl
        value={b}
        onChange={setB}
        fullWidth
        label="Filter"
        data={[
          { value: 'all', label: 'All' },
          { value: 'live', label: 'Live' },
          { value: 'draft', label: 'Draft' },
          { value: 'archived', label: 'Archived', disabled: true },
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
