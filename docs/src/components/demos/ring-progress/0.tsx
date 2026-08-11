import { RingProgress } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <RingProgress sections={[{ value: 62, color: 'green' }]} label="62%" />
      <RingProgress
        size={140}
        thickness={16}
        roundCaps
        sections={[
          { value: 40, color: 'green' },
          { value: 25, color: 'orange' },
          { value: 15, color: 'red' },
        ]}
        label={<span className="text-xs text-muted">80%<br />used</span>}
      />
    </div>
  );
}
