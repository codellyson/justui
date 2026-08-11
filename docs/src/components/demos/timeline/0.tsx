import { Timeline } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-md">
      <Timeline active={1}>
        <Timeline.Item title="Pushed to main" bullet="1">
          <span className="text-xs text-muted">2 minutes ago</span>
        </Timeline.Item>
        <Timeline.Item title="Build passed" bullet="2">
          <span className="text-xs text-muted">tsc --noEmit · 2.1s</span>
        </Timeline.Item>
        <Timeline.Item title="Deploying" bullet="3">
          <span className="text-xs text-muted">In progress</span>
        </Timeline.Item>
        <Timeline.Item title="Live" bullet="4" />
      </Timeline>
    </div>
  );
}
