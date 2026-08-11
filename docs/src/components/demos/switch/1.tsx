import { Switch } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-6">
      <Switch size="sm" label="sm" defaultChecked />
      <Switch size="md" label="md" defaultChecked />
      <Switch size="lg" label="lg" defaultChecked />
    </div>
  );
}
