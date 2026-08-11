import { Card } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      {['xs', 'sm', 'md', 'lg', 'xl'].map((p) => (
        <Card key={p} withBorder padding={p} shadow="xs">
          <code className="font-mono text-xs text-muted">padding {p}</code>
        </Card>
      ))}
    </div>
  );
}
