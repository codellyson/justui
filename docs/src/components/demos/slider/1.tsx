import { Slider } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-10">
      <Slider
        defaultValue={50}
        step={25}
        marks={[
          { value: 0, label: '0%' },
          { value: 25, label: '25%' },
          { value: 50, label: '50%' },
          { value: 75, label: '75%' },
          { value: 100, label: '100%' },
        ]}
      />
      <Slider defaultValue={2} min={1} max={5} step={1} label={(n) => `${n}×`}
        marks={[{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]} />
    </div>
  );
}
