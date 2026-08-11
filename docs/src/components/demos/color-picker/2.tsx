import { ColorPicker } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <ColorPicker size="xs" value="#eab308" onChange={() => {}} />
      <ColorPicker size="sm" value="#14b8a6" onChange={() => {}} />
      <ColorPicker size="lg" value="#8b5cf6" onChange={() => {}} />
      <ColorPicker label="Invalid" value="not-a-colour" onChange={() => {}} />
      <ColorPicker label="Your own message" value="zzz" onChange={() => {}} error="Pick from the brand palette." />
      <ColorPicker label="Disabled" value="#64748b" onChange={() => {}} disabled />
    </div>
  );
}
