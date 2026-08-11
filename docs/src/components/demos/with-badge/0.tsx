import { Button, WithBadge } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <WithBadge badge="9">
        <Button variant="outline">Inbox</Button>
      </WithBadge>
      <WithBadge badge="!" color="orange" position="top-left">
        <Button variant="outline">Alerts</Button>
      </WithBadge>
      <WithBadge badge="12" color="green" variant="light" position="bottom-right">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-sm">A</div>
      </WithBadge>
    </div>
  );
}
