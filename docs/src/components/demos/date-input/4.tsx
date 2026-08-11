import { DateInput } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <DateInput size="xs" value="2026-08-14" onChange={() => {}} />
      <DateInput size="sm" value="2026-08-14" onChange={() => {}} />
      <DateInput size="lg" value="2026-08-14" onChange={() => {}} calendarSize="md" />
      <DateInput label="Invalid" value="2026-08-14" onChange={() => {}} error="Pick a date after launch." />
      <DateInput label="Disabled" value="2026-08-14" onChange={() => {}} disabled />
    </div>
  );
}
