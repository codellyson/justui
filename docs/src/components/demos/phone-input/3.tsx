import { PhoneInput } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <PhoneInput label="With flags" />
      <PhoneInput label="Without" withFlags={false} />
    </div>
  );
}
