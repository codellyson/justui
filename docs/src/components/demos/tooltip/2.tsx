import { useState } from "react";
import { Button, Switch, Tooltip, TooltipProvider } from "@codellyson/justui/react";

function Demo() {
  const [on, setOn] = useState(true);
  return (
    <TooltipProvider>
      <div className="flex items-center gap-4">
        <Switch label="Tooltip enabled" checked={on} onChange={setOn} />
        <Tooltip label="Only when enabled" disabled={!on}>
          <Button size="xs" variant="outline">Hover me</Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
