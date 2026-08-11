import { Checkbox } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="space-y-3">
      <Checkbox label="Email me about releases" defaultChecked />
      <Checkbox label="Email me about incidents" description="At most one message per incident." />
      <Checkbox label="Unavailable on this plan" disabled />
      <Checkbox label="Required" error="You must accept to continue." />
    </div>
  );
}
