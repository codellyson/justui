import { Label } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <input id="off" disabled className="peer h-9 w-full rounded-md border border-border bg-bg-secondary px-3 text-sm" />
      <Label htmlFor="off">Dims when the peer is disabled</Label>
    </div>
  );
}
