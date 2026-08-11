import { Select } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm">
      <Select
        label="Runtime"
        defaultValue="node20"
        options={[
          { group: 'Node', items: [
            { label: 'Node 20 LTS', value: 'node20' },
            { label: 'Node 22 LTS', value: 'node22' },
          ]},
          { group: 'Bun', items: [{ label: 'Bun 1.x', value: 'bun1' }] },
          { group: 'Deno', items: [{ label: 'Deno 2', value: 'deno2', disabled: true }] },
        ]}
      />
    </div>
  );
}
