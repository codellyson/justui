import { Textarea } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Textarea label="Release notes" placeholder="What changed?" description="Markdown is supported." />
      <Textarea label="Summary" error="Required." />
      <Textarea label="Disabled" placeholder="Read-only" disabled />
    </div>
  );
}
