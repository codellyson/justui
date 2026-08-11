import { useState } from "react";
import { Progress, Slider } from "@codellyson/justui/react";

function Demo() {
  const [pct, setPct] = useState(35);
  return (
    <div className="w-full max-w-sm space-y-3">
      <Progress value={pct} label="Upload progress" color="green" />
      <Slider value={pct} onChange={setPct} label={(v) => `${v}%`} />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
