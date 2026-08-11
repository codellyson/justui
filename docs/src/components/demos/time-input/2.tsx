import { TimeInput } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <TimeInput label="From a string" value="9:00 AM" onChange={() => {}} />
      <TimeInput label="Typed only" value="17:45" format="24h" onChange={() => {}} withDropdown={false} />
      <TimeInput size="xs" value="8:00 AM" onChange={() => {}} />
      <TimeInput size="sm" value="8:00 AM" onChange={() => {}} />
      <TimeInput size="lg" value="8:00 AM" onChange={() => {}} />
      <TimeInput label="Invalid" value="8:00 AM" onChange={() => {}} error="Outside opening hours." />
      <TimeInput label="Disabled" value="8:00 AM" onChange={() => {}} disabled />
    </div>
  );
}
