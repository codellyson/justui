import { useState } from "react";
import { DateInput } from "@codellyson/justui/react";

function Demo() {
  const today = new Date();
  const inTwoWeeks = new Date();
  inTwoWeeks.setDate(inTwoWeeks.getDate() + 14);
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  return (
    <div className="w-full max-w-xs space-y-4">
      <DateInput
        label="Next two weeks only"
        value={a}
        onChange={setA}
        minDate={today}
        maxDate={inTwoWeeks}
        description="Anything outside the window is unclickable."
      />
      <DateInput
        label="Weekdays only"
        value={b}
        onChange={setB}
        isDateBlocked={(d) => d.getDay() === 0 || d.getDay() === 6}
      />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
