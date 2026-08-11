import { Card } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm">
      <Card withBorder>
        <Card.Section withBorder className="px-4 pt-4">
          <div className="text-sm font-medium text-primary">acme-production</div>
        </Card.Section>
        <Card.Section inheritPadding className="pt-3">
          <p className="text-sm text-secondary">Three deploys today, all green.</p>
        </Card.Section>
      </Card>
    </div>
  );
}
