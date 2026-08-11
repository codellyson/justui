import { Badge, Tab, Tabs } from "@codellyson/justui/react";
import { ArrowUpRightIcon, EnvelopeIcon } from "../../icons";

export default function JustuiDemo() {
  return (
    <Tabs defaultValue="inbox" className="w-full max-w-lg">
      <Tabs.List>
        <Tabs.Tab value="inbox" leftSection={<EnvelopeIcon />} rightSection={<Badge color="red" variant="solid">12</Badge>}>
          Inbox
        </Tabs.Tab>
        <Tabs.Tab value="sent" leftSection={<ArrowUpRightIcon />}>Sent</Tabs.Tab>
        <Tabs.Tab value="archive" disabled>Archive</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="inbox">
        <p className="text-sm text-secondary">12 unread.</p>
      </Tabs.Panel>
      <Tabs.Panel value="sent">
        <p className="text-sm text-secondary">Nothing pending.</p>
      </Tabs.Panel>
    </Tabs>
  );
}
