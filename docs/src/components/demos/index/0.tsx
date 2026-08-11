import { Badge, Button } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-3">
      <Button>Primary</Button>
      <Button variant="outline" color="red">Danger-ish</Button>
      <Badge color="green">New</Badge>
    </div>
  );
}
