import { useState } from "react";
import { SegmentedControl, Timeline } from "@codellyson/justui/react";

function Demo() {
  const [active, setActive] = useState(1);
  return (
    <div className="w-full max-w-md space-y-4">
      <SegmentedControl
        value={String(active)}
        onChange={(v) => setActive(Number(v))}
        label="Active step"
        data={[
          { value: '-1', label: 'None' },
          { value: '0', label: '1' },
          { value: '1', label: '2' },
          { value: '2', label: '3' },
        ]}
      />
      <Timeline active={active} bulletSize={28} lineWidth={3}>
        <Timeline.Item title="Created" bullet="✓">Order placed</Timeline.Item>
        <Timeline.Item title="Packed" bullet="✓">Left the warehouse</Timeline.Item>
        <Timeline.Item title="Delivered" bullet="✓">Signed for</Timeline.Item>
      </Timeline>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
