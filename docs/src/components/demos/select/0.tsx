import { Select } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm">
      <Select
        label="Region"
        placeholder="Pick a region"
        options={[
          { label: 'us-east-1', subLabel: 'Virginia', value: 'iad' },
          { label: 'us-west-1', subLabel: 'California', value: 'sfo' },
          { label: 'eu-central-1', subLabel: 'Frankfurt', value: 'fra' },
          { label: 'af-west-1', subLabel: 'Lagos', value: 'lag' },
        ]}
      />
    </div>
  );
}
