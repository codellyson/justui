import { Breadcrumb } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="space-y-4">
      <Breadcrumb maxItems={3}>
        <Breadcrumb.Item href="/breadcrumb">Org</Breadcrumb.Item>
        <Breadcrumb.Item href="/breadcrumb">Team</Breadcrumb.Item>
        <Breadcrumb.Item href="/breadcrumb">Project</Breadcrumb.Item>
        <Breadcrumb.Item href="/breadcrumb">Environment</Breadcrumb.Item>
        <Breadcrumb.Item current>Variables</Breadcrumb.Item>
      </Breadcrumb>

      <Breadcrumb maxItems={3}>
        <Breadcrumb.Item href="/breadcrumb">Org</Breadcrumb.Item>
        <Breadcrumb.Item current>Team</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
