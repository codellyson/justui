import { Slider } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <Slider defaultValue={30} size="sm" />
      <Slider defaultValue={50} size="md" />
      <Slider defaultValue={70} size="lg" />
      <Slider defaultValue={40} disabled />
    </div>
  );
}
