import { Button, Divider, Menu } from "@codellyson/justui/react";
import { ArrowUpRightIcon, CodeBracketIcon, DocumentTextIcon, HashtagIcon } from "../../icons";

export default function JustuiDemo() {
  return (
    <Menu>
      <Menu.Target asChild>
        <Button variant="outline">Insert</Button>
      </Menu.Target>
      <Menu.Dropdown align="start" width={240}>
        <Menu.Item leftSection={<DocumentTextIcon />} rightSection="⌘1">Paragraph</Menu.Item>
        <Menu.Item leftSection={<HashtagIcon />} rightSection="⌘2">Heading</Menu.Item>
        <Menu.Item leftSection={<CodeBracketIcon />} rightSection="⌘3">Code block</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<ArrowUpRightIcon />} color="red">Embed (beta)</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
