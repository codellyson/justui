import { useState } from "react";
import { Badge, Card, RadioGroup } from "@codellyson/justui/react";

function Demo() {
  const [value, setValue] = useState('card');
  return (
    <RadioGroup label="Payment" value={value} onChange={setValue} className="gap-3">
      <div className="flex items-center justify-between rounded-md border border-border p-3">
        <RadioGroup.Item value="card" label="Card" description="Visa ending 4242" />
        <Badge variant="light" color="green">Default</Badge>
      </div>
      <div className="flex items-center justify-between rounded-md border border-border p-3">
        <RadioGroup.Item value="invoice" label="Invoice" description="Net 30, on approval" />
        <Badge variant="light" color="gray">Business</Badge>
      </div>
    </RadioGroup>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
