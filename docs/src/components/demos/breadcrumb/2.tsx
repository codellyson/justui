import { Breadcrumb } from "@codellyson/justui/react";
import { ChevronDoubleRightIcon } from "../../icons";

export default function JustuiDemo() {
  return (
    <div className="space-y-4">
      <Breadcrumb separator="/">
        <Breadcrumb.Item href="/breadcrumb">src</Breadcrumb.Item>
        <Breadcrumb.Item href="/breadcrumb">react</Breadcrumb.Item>
        <Breadcrumb.Item current>ui</Breadcrumb.Item>
      </Breadcrumb>

      <Breadcrumb separator={<ChevronDoubleRightIcon className="h-3 w-3" />}>
        <Breadcrumb.Item href="/breadcrumb">Docs</Breadcrumb.Item>
        <Breadcrumb.Item href="/breadcrumb">Components</Breadcrumb.Item>
        <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
