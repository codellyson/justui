import { Button } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="transparent">Transparent</Button>
    </div>
  );
}
