import { Badge, Button } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline">
        Inbox <Badge color="red" variant="solid">12</Badge>
      </Button>
      <p className="text-sm text-secondary">
        Status: <Badge color="green">healthy</Badge> as of just now.
      </p>
    </div>
  );
}
