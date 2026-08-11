import { Label } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="custom">Custom control</Label>
      <input
        id="custom"
        className="h-9 w-full rounded-md border border-border bg-bg-secondary px-3 text-sm text-primary"
      />
    </div>
  );
}
