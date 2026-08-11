import { Select } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Select
        searchable
        label="Custom strings"
        searchPlaceholder="Filter regions…"
        emptyMessage="No region matches"
        placeholder="Pick one"
        options={[
          { label: 'us-east-1', value: 'a' },
          { label: 'eu-west-2', value: 'b' },
        ]}
      />
      <Select searchable size="sm" placeholder="Small" options={[{ label: 'One', value: '1' }]} />
      <Select
        searchable
        label="Invalid"
        error="Pick a region."
        placeholder="Pick one"
        options={[{ label: 'One', value: '1' }]}
      />
    </div>
  );
}
