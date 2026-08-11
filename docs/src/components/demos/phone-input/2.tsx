import { PhoneInput } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <PhoneInput size="sm" />
      <PhoneInput size="md" />
      <PhoneInput size="lg" />
    </div>
  );
}
