import { ColorInput } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <ColorInput label="Valid" value="#22c55e" onChange={() => {}} />
      <ColorInput label="Invalid" value="not-a-colour" onChange={() => {}} />
      <ColorInput label="Your own message" value="zzz" onChange={() => {}} error="Pick from the brand palette." />
    </div>
  );
}
