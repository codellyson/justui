import { Divider } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <Divider label="or" />
      <Divider label="Danger zone" labelPosition="left" />
      <Divider label="2024" labelPosition="right" />
    </div>
  );
}
