import { Checkbox, Select } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox defaultChecked aria-label="Select row" />
      <span className="text-sm text-secondary">Row with its own label elsewhere</span>
    </div>
  );
}
