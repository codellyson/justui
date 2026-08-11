import { Switch } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-4 rounded-md border border-border px-3 py-2">
      <span className="flex-1 text-sm text-primary">acme-production</span>
      <Switch defaultChecked aria-label="Enable acme-production" />
    </div>
  );
}
