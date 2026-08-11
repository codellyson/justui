import { Card } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      {['sm', 'md', 'lg', 'xl'].map((r) => (
        <Card key={r} withBorder radius={r} shadow="md">
          <code className="font-mono text-xs text-muted">radius {r}</code>
        </Card>
      ))}
    </div>
  );
}
