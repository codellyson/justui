import { Input } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Input label="Password" type="password" defaultValue="hunter2" />
      <Input label="Without the toggle" type="password" defaultValue="hunter2" withPasswordToggle={false} />
    </div>
  );
}
