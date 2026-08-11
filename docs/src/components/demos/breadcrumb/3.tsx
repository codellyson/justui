import { Avatar, Breadcrumb } from "@codellyson/justui/react";
import { HomeIcon } from "../../icons";

export default function JustuiDemo() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/breadcrumb" className="inline-flex items-center gap-1.5">
        <HomeIcon className="h-3.5 w-3.5" />
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/breadcrumb" className="inline-flex items-center gap-1.5">
        <Avatar size="xs" name="Khaime" radius="md" />
        Khaime
      </Breadcrumb.Item>
      <Breadcrumb.Item current>Billing</Breadcrumb.Item>
    </Breadcrumb>
  );
}
