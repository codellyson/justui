import { Breadcrumb } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/breadcrumb">Projects</Breadcrumb.Item>
      <Breadcrumb.Item href="/breadcrumb">justui</Breadcrumb.Item>
      <Breadcrumb.Item href="/breadcrumb">Settings</Breadcrumb.Item>
      <Breadcrumb.Item current>Deploy keys</Breadcrumb.Item>
    </Breadcrumb>
  );
}
