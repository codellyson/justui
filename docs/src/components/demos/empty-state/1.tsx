import { Card, EmptyState } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <Card withBorder className="w-full">
      <EmptyState title="No results" description="Try a different search term." />
    </Card>
  );
}
