import { useState } from "react";
import { Button, WithBadge } from "@codellyson/justui/react";

function Demo() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex items-center gap-4">
      <WithBadge badge={count} hidden={count === 0}>
        <Button variant="outline">Notifications</Button>
      </WithBadge>
      <Button size="xs" onClick={() => setCount((c) => c + 1)}>Add</Button>
      <Button size="xs" variant="ghost" color="gray" onClick={() => setCount(0)}>Clear</Button>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
