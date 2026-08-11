import { Checkbox } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-6">
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </div>
  );
}
