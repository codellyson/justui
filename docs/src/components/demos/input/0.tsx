import { Input } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Input label="Workspace" placeholder="acme" description="Lowercase letters and dashes." />
      <Input label="Slug" defaultValue="Acme Corp" error="Must not contain spaces." />
      <Input label="Disabled" placeholder="Unavailable" disabled />
    </div>
  );
}
